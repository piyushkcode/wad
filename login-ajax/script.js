const apiUrl = "http://localhost:3002/users";

// Toggle between login and register forms
function toggleForm(form) {
  document.getElementById("loginForm").style.display = form === "login" ? "block" : "none";
  document.getElementById("registerForm").style.display = form === "register" ? "block" : "none";
  document.getElementById("formTitle").innerText = form === "login" ? "Login" : "Register";
  document.getElementById("message").innerText = "";
}

function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const dob = document.getElementById("dob").value;
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!name || !nameRegex.test(name)) return alert("Enter a valid name.");
  if (!email || !emailRegex.test(email)) return alert("Enter a valid email.");
  if (!/^\d{10}$/.test(mobile)) return alert("Mobile must be 10 digits.");
  if (!dob) return alert("DOB is required.");
  if (!city) return alert("City is required.");
  if (address.length < 10) return alert("Address should be at least 10 characters.");
  if (password.length < 6) return alert("Password must be at least 6 characters.");

  const user = { name, email, mobile, dob, city, address, password };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(() => {
      alert("Registered successfully!");
      toggleForm("login");
      displayRegisteredUsers();
    });
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  fetch(apiUrl)
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        document.getElementById("message").innerText = `Welcome, ${user.name}! Login Successful.`;
      } else {
        alert("Invalid email or password.");
      }
    });
}

function displayRegisteredUsers() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("users");
      ul.innerHTML = "";
      data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.name;
        ul.appendChild(li);
      });
    });
}

// Load registered users when page loads
window.onload = () => {
  displayRegisteredUsers();
};
