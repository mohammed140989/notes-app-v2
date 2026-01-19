import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from
  "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAETATGkPZ-Lvjc5aEUoYZPILdB3gH6ogI",
  authDomain: "notes-app-v2-25fbb.firebaseapp.com",
  databaseURL: "https://notes-app-v2-25fbb-default-rtdb.firebaseio.com",
  projectId: "notes-app-v2-25fbb",
  storageBucket: "notes-app-v2-25fbb.firebasestorage.app",
  messagingSenderId: "962985256830",
  appId: "1:962985256830:web:f4f766295c70096f92f52f"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const notesRef = ref(db, "notes");
const notesEl = document.getElementById("notes");
const input = document.getElementById("noteInput");

document.getElementById("addBtn").onclick = () => {
  if (!input.value.trim()) return;
  push(notesRef, { text: input.value, createdAt: Date.now() });
  input.value = "";
};

onValue(notesRef, (snap) => {
  notesEl.innerHTML = "";
  snap.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c.val().text;
    li.onclick = () => remove(ref(db, "notes/" + c.key));
    notesEl.appendChild(li);
  });
});
