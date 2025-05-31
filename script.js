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
});

// Get DOM elements
const form = document.getElementById("expense-form");
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

    // Reset default date after form reset
    document.getElementById("date").value = new Date().toISOString().split("T")[0];

    // Show success message
    message.textContent = "Expense added successfully!";
    message.style.color = "green";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);

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
