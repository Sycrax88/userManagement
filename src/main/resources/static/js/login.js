$(document).ready(function() {
});

async function loginUser() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const userData = {
        email,
        password
    };

    if (!validateData(userData)) {
        return;
    }

    try {
        const response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const responseBody  = await response.text();
        console.log(responseBody);

        if (responseBody  === 'OK'){
            alert("Correct Password!")
            window.location.href = 'users.html';
        } else{
            alert("Wrong Password!")
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while processing the request.");
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateData(data) {
    const { email, password } = data;

    if (!email || !password) {
        alert('Please fill in all fields!');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Invalid email format!');
        return false;
    }

    return true;
}