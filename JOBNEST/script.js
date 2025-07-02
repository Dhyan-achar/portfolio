document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;

    // Simple validation
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in both fields');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    // In a real application, you would send this data to a server
    console.log('Login attempted with:', {
        username,
        password,
        rememberMe
    });

    if (username === "userlogin" && password === "0123456") {
      // Open a new page in a new tab
      alert('Login successful! .');
      localStorage.setItem("loggedIn", "true"); // ✅ Only set on success
        window.location.href = "index.html";
    } else {
      alert("Invalid username or password");
       localStorage.removeItem("loggedIn");
    }


    


    
    // Redirect to dashboard (example)
    //window.location.href = '/dashboard.html';
});