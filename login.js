document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://yourserver.com/login', {  // Replace with your server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usernameOrEmail: usernameOrEmail,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user details
            const userDetails = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                username: data.user.username,
            };
            // Redirect or show success message
            document.getElementById('message').textContent = 'Login successful!';
            console.log(userDetails); // Store userDetails in a variable as needed
        } else {
            document.getElementById('message').textContent = 'Invalid credentials. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again later.';
    });
});
