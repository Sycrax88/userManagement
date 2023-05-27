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

        if (responseBody  != 'FAIL'){
            loggedUser = await getUserByEmail(userData.email);

            localStorage.token = responseBody;
            localStorage.email = userData.email;
            localStorage.firstName = loggedUser.name;
            localStorage.id = loggedUser.id;
            window.location.href = 'users.html';
        } else{
            alert("Wrong Password!")
        }
    } catch (error) {
        console.error("An error occurred:", error);
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

async function getUserByEmail(email){
    const response = await fetch('api/users/email/' + email, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const foundUser = await response.json();
        return foundUser;
}