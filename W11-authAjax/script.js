// Function to simulate a real AJAX POST request
function ajaxPostSimulation(userData) {
    const xhr = new XMLHttpRequest();
    
    // Simulate a server endpoint using a Data URI to avoid CORS errors
    const mockUrl = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify({success: true}));

    xhr.open("POST", mockUrl, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // STEP: Save to LocalStorage on successful "AJAX Response"
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert("Registration Data Sent via AJAX and Saved!");
            window.location.href = "data.html"; // Navigate to display page
        }
    };

    xhr.send(JSON.stringify(userData));
}

// Handler for the Registration Button
function handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const rawDob = document.getElementById('regDob').value; // Returns yyyy-mm-dd
    const city = document.getElementById('regCity').value.trim();
    const address = document.getElementById('regAddress').value.trim();

    // 1. Simple Presence Validation
    if (!name || !email || !pass || !mobile || !rawDob || !city || !address) {
        alert("Please fill in all registration fields.");
        return;
    }

    // 2. Simple Mobile Length Validation
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // 3. Date Formatting Logic (yyyy-mm-dd to dd-mm-yyyy)
    const parts = rawDob.split("-"); // [yyyy, mm, dd]
    const formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;

    // 4. Create User Object
    const newUser = {
        name: name,
        email: email,
        password: pass,
        mobile: mobile,
        dob: formattedDob,
        city: city,
        address: address
    };

    // 5. Trigger the AJAX Process
    ajaxPostSimulation(newUser);
}

// Handler for the Login Button
function handleLogin() {
    const emailInput = document.getElementById('loginUser').value.trim();
    const passInput = document.getElementById('loginPass').value.trim();

    if (!emailInput || !passInput) {
        alert("Please enter both email and password to login.");
        return;
    }

    // Get current users from LocalStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for matching credentials
    const validUser = users.find(u => u.email === emailInput && u.password === passInput);

    if (validUser) {
        alert(`Welcome back, ${validUser.name}!`);
        window.location.href = "data.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
}