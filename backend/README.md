# ECHOVOLUNTEER

EchoVolunteer helps people connect with and become part of different organizations and NGOs in need of volunteers. This project enables organization administrators to manage a large number of volunteers and assign tasks with just one click, along with some additional privileges.

Using EchoVolunteer, volunteers can register themselves and work in various departments within the organization. They can also view their tasks according to their department with a single click, making it easy to stay organized and efficient.

This project leverages REST APIs, which use standard HTTP methods, along with TypeScript, Azle, Express, and the Internet Computer Protocol system to bring greater efficiency, speed, and decentralization to computation and data.   

# Features

**User Management**

 - user Registration
 * user Login
 + user Logout

**Volunteer Management**

 * volunteer Registration
 + volunteer Retrieval
 - volunteer specific Task Retrieval

**Admin Previliges**

 - Admin can retrive all users ever created. 
 - Admin can accesss all loggedin users session. 
 - Admin can assign tasks to the volunteers based on department. 
 - Admin can view all Volunteer that has been added to the organisation.  

# Installation

### To install the project, follow these steps:

1. Clone the repository.

2. Install dependencies using npm install.

3. Execute the project using dfx start --host 127.0.0.1:8000 --clean --background.

4. dfx deploy 

# Usage

### To get the url to make request Follow the steps below :
* Get deployed Canister's id  
```
 - dfx canister id ENTER_CANISTER_NAME_HERE
```
* Now place the canister id 

```
 http://INSERT_CANISTER_ID_HERE.localhost:8000
```
Now you can make request to the api endpoints to perform operations Using  utility tools like Postman, insomnia ,ThunderClient etc. 

## API Endpoints

* `POST/signup/user` : creates a new user

* `POST/login/user` : log in a user

* `POST/logout/:userid` : logs out user using specific user id

* `POST/assign/role/:loginid` : Assigns the role to as admin to the administrator of the organisation

* `POST/form/volunteer/:loginid` : Register a new volunteer

* `GET/show/allusers/:adminid` : shows all the registered users to admin only with limited information

* `GET/show/allvolunteers/:adminid` : shows all the registered or added volunteers to admin only

* `GET/show/allLoggedusers/:adminid` : show all the logged users to admin only

* `GET/volunteer/mytask/:vounteerid` : show the task to the volunteer that has been assigned by admin 

* `PUT/volunteer/task/:adminId/addtask/:volunteerid` : allow admin to make and addtask for the volunteer

## Contributions

Contributions are welcome to this project. If you want to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your modifications.
4. Submit a pull request.





