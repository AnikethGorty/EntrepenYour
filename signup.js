document.addEventListener('DOMContentLoaded', () => {
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.dot');
    const submitBtn = document.getElementById('submit-btn');
    let currentStep = 0;

    // Function to handle form steps and navigation
    function updateStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index === step);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === step);
        });
    }

    // Add event listeners for the next buttons
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep === 0) {
                // Username and password validation for the first step
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;



                if (!username || !password) {
                    alert("Please enter both your username and password.");
                    return; // Prevent moving to the next step
                }
                 // Validate passwords
                else if (password !== confirmPassword) {
                     alert("Passwords do not match!");
                    return; // Stop execution if passwords don't match
                }
            }


            // Move to the next slide
            currentStep++;
            updateStep(currentStep);
        });
    });

    // Add event listeners for the previous buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Move to the previous slide
            if (currentStep > 0) {
                currentStep--;
                updateStep(currentStep);
            }
        });
    });

    // Form submission logic
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Collect all form data
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const country = document.getElementById('country').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;

        // Prepare data to send to the server
        const userData = {
            email,
            name,
            username,
            password,
            country,
            userType,
        };

        // Send the data to the backend via POST request
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = 'home.html'; // Redirect to homepage after successful registration
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Initialize the first step
    updateStep(currentStep);
});
