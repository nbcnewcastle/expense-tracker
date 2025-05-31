// Firebase config (your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyArwCYv-nzFeD_IaHprR-JatKdd5gvd1Po",
  authDomain: "expensetrackerapp-6b738.firebaseapp.com",
  projectId: "expensetrackerapp-6b738",
  storageBucket: "expensetrackerapp-6b738.firebasestorage.app",
  messagingSenderId: "610375205323",
  appId: "1:610375205323:web:66f407e7e1fb2fca96764e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Set default date on page load
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
  loadExpenses();
});

// Get DOM elements
const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const message = document.getElementById("message");

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  try {
    await db.collection("expenses").add({
      amount,
      category,
      date,
      description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    form.reset();

    // Reset default date after clearing form
    document.getElementById("date").value = new Date().toISOString().split("T")[0];

    // Show success message
    message.textContent = "Expense added successfully!";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);

    loadExpenses();
  } catch (err) {
    console.error("Error adding expense:", err);
    message.textContent = "❌ Failed to save expense.";
    message.style.color = "red";
    setTimeout(() => {
      message.textContent = "";
      message.style.color = "green";
    }, 3000);
  }
});

// Load and render expenses from Firestore
async function loadExpenses() {
  list.innerHTML = "";
  try {
    const snapshot = await db.collection("expenses").orderBy("date", "desc").get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("li");
      item.textContent = `${data.date} - ₹${data.amount.toFixed(2)} - ${data.category}: ${data.description}`;
      list.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading expenses:", err);
  }
}
