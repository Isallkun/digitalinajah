// integration.js

const { HttpAgent, Actor } = require("@dfinity/agent");
const { idlFactory } = require("./src/declarations/example"); // Ganti dengan deklarasi canister Anda
const canisterId = process.env.CANISTER_ID; // Pastikan untuk mengatur CANISTER_ID di .env

// Membuat agen HTTP untuk berinteraksi dengan IC
const agent = new HttpAgent({ host: "https://ic0.app" });

// Membuat aktor untuk berinteraksi dengan canister
const exampleActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Contoh fungsi untuk memanggil metode canister
async function callCanisterMethod() {
  try {
    const result = await exampleActor.exampleMethod(); // Ganti dengan metode canister Anda
    console.log("Result from canister:", result);
  } catch (error) {
    console.error("Error calling canister method:", error);
  }
}

// Panggil fungsi contoh
callCanisterMethod();

module.exports = { agent, exampleActor };
