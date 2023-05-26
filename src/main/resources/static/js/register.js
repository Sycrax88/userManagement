$(document).ready(function() {
});

async function registerUser() {
    const name = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    const password = document.getElementById('inputPassword').value;
    const passwordRepeat = document.getElementById('inputRepeatPassword').value;

    if (passwordRepeat !== password) {
        alert('The passwords are not the same!');
        return;
    }

    const userData = {
        name,
        lastName,
        email,
        phone,
        password
    };

    if (!validateData(userData)) {
        return;
    }

    try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const response = await fetch('api/users/email/' + email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        const user = await response.json();

        // Si se encontró un usuario con el mismo correo electrónico, mostrar un mensaje de error
        if (user) {
            alert('A user with this email already exists.');
            return;
        }
    }
        // Si no se encontró un usuario, proceder con el registro
        const registerResponse = await fetch('api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Continuar con el código después de registrar el usuario...
        alert("The user has been successfully registered!")
        window.location.href = 'login.html';
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing the request.');
        }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateData(data) {
    const { name, lastName, email, phone, password } = data;

    if (!name || !lastName || !email || !phone || !password) {
        alert('Please fill in all fields!');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Invalid email format!');
        return false;
    }

    if (password.length <= 6) {
        alert('Password should be longer than 6 characters!');
        return false;
    }

    return true;
}
