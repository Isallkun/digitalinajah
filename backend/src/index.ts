import { Canister, update, query } from 'azle';
import { v4 as uuidv4 } from 'uuid';

class User {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public mail: string,
        public role: string,
        public createdAt: string
    ) {}
}

class Volunteer {
    constructor(
        public volunteer_id: string,
        public name: string,
        public address: string,
        public phone_number: string,
        public centre: string,
        public department: string,
        public role: string,
        public createdAt: string,
        public tasks: Task[] = []
    ) {}
}

class Task {
    constructor(
        public taskid: string,
        public department: string,
        public title: string,
        public description: string
    ) {}
}

const UserStorage = new Map<string, User>();
const VolunteerStorage = new Map<string, Volunteer>();
const loggedinUsers = new Map<string, User>();

function getCurrentDate(): string {
    return new Date().toISOString();
}

export default Canister({

    signupUser: update((username: string, password: string, mail: string): string => {
        const newUser = new User(uuidv4(), username, password, mail, "not assigned", getCurrentDate());
        UserStorage.set(newUser.id, newUser);
        return "User signed up successfully!";
    }),

    loginUser: update((mail: string, password: string) => {
        const user = Array.from(UserStorage.values()).find(user => user.mail === mail);
        if (!user) {
            return { status: 401, msg: "User not exist. SIGN UP PLEASE" };
        }
        const isValidPassword = password === user.password;
        if (!isValidPassword) {
            return { status: 400, msg: "Invalid username or password" };
        }
        loggedinUsers.set(user.id, user);
        return { status: 200, msg: "User login successful", userDetails: user };
    }),

    logoutUser: update((userId: string): string => {
        const loggedOutUser = loggedinUsers.delete(userId);
        return loggedOutUser ? "User logged out successfully" : "User not logged in";
    }),

    assignRole: update((loginId: string, role: string) => {
        const loggedUser = loggedinUsers.get(loginId);
        if (!loggedUser) {
            return { status: 403, msg: "User not logged in!" };
        }
        loggedUser.role = role;
        loggedinUsers.set(loggedUser.id, loggedUser);
        return { status: 201, msg: "Role assigned", info: loggedUser };
    }),

    addVolunteer: update((loginId: string, name: string, address: string, phone_number: string, centre: string, department: string) => {
        const loggedUser = loggedinUsers.get(loginId);
        if (!loggedUser) {
            return { status: 403, msg: "User not logged in!" };
        }

        let role = loggedUser.role === "admin" ? "admin and volunteer" : "volunteer";
        const newVolunteer = new Volunteer(loggedUser.id, name, address, phone_number, centre, department, role, getCurrentDate());
        VolunteerStorage.set(newVolunteer.volunteer_id, newVolunteer);
        loggedinUsers.set(loggedUser.id, loggedUser);

        return { status: 201, msg: "Volunteer added successfully", volunteer: newVolunteer };
    }),

    showAllUsers: query((adminId: string) => {
        const adminUser = loggedinUsers.get(adminId);
        if (!adminUser || adminUser.role !== "admin") {
            return { status: 401, msg: "You're not the admin. Only admin is allowed." };
        }
        return Array.from(UserStorage.values()).map(user => ({
            id: user.id,
            username: user.username,
            mail: user.mail
        }));
    }),

    showAllVolunteers: query((adminId: string) => {
        const adminUser = loggedinUsers.get(adminId);
        if (!adminUser || adminUser.role !== "admin") {
            return { status: 401, msg: "You're not the admin. Only admin is allowed." };
        }
        return Array.from(VolunteerStorage.values());
    }),

    showAllLoggedUsers: query((adminId: string) => {
        const adminUser = loggedinUsers.get(adminId);
        if (!adminUser || adminUser.role !== "admin") {
            return { status: 401, msg: "You're not the admin. Only admin is allowed." };
        }
        return Array.from(loggedinUsers.values());
    }),

    addTaskToVolunteer: update((adminId: string, volunteerId: string, title: string, description: string) => {
        const adminUser = loggedinUsers.get(adminId);
        if (!adminUser || adminUser.role !== "admin") {
            return { status: 401, msg: "You are not the admin." };
        }
        const volunteer = VolunteerStorage.get(volunteerId);
        if (!volunteer) {
            return { status: 404, msg: `Volunteer with id=${volunteerId} not found` };
        }

        const newTask = new Task(uuidv4(), volunteer.department, title, description);
        volunteer.tasks.push(newTask);
        VolunteerStorage.set(volunteer.volunteer_id, volunteer);

        return { status: 201, msg: "Task added successfully by admin!", task: newTask };
    }),

    showVolunteerTasks: query((volunteerId: string) => {
        const volunteer = VolunteerStorage.get(volunteerId);
        if (!volunteer) {
            return { status: 404, msg: `Volunteer with id=${volunteerId} not found or Volunteer not exists` };
        }
        return {
            volunteer_id: volunteer.volunteer_id,
            name: volunteer.name,
            department: volunteer.department,
            tasks: volunteer.tasks.map(task => ({
                task_id: task.taskid,
                title: task.title,
                description: task.description
            }))
        };
    })
});
