// Use compat version (NO imports)
const firebaseConfig = {
  apiKey: "AIzaSyArwCYv-nzFeD_IaHprR-JatKdd5gvd1Po",
  authDomain: "expensetrackerapp-6b738.firebaseapp.com",
  projectId: "expensetrackerapp-6b738",
  storageBucket: "expensetrackerapp-6b738.appspot.com", // fixed here
  messagingSenderId: "610375205323",
  appId: "1:610375205323:web:66f407e7e1fb2fca96764e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get form and list elements
const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;

  try {
    await db.collection('expenses').add({
      amount: parseFloat(amount),
      category,
      date,
      description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    form.reset();
    loadExpenses();
  } catch (err) {
    console.error("Error adding expense:", err);
  }
});

// Load expenses from Firestore
async function loadExpenses() {
  list.innerHTML = '';
  const snapshot = await db.collection('expenses').orderBy('date', 'desc').get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement('li');
    item.textContent = `${data.date} - $${data.amount} - ${data.category}: ${data.description}`;
    list.appendChild(item);
  });
}

// Load on page startup
loadExpenses();
