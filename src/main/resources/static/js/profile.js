let userIdFromList;

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    userIdFromList = urlParams.get('userId');
    console.log("userIdFromList1: ", userIdFromList);

    const isActualUser = true;
    if (userIdFromList == null)
        loadLoggedUser();
    else
        loadSelectedUser(userIdFromList);
});

function getHeaders(){
    return {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': localStorage.token
       };
}

async function loadLoggedUser(){
    const request = await fetch('api/users/'+localStorage.id, {
        method: 'GET',
        headers: getHeaders()
        //body: JSON.stringify({a: 1, b: 'Textual content'})
        });
    const loggedUser = await request.json();
    console.log(loggedUser);

    $("#nameInput").val(loggedUser.name);
    $("#lastNameInput").val(loggedUser.lastName);
    $("#phoneInput").val(loggedUser.phone);
    $("#emailInput").val(loggedUser.email);

    isActualUser = true;
}

async function loadSelectedUser(userId){
    const request = await fetch('api/users/'+userId, {
        method: 'GET',
        headers: getHeaders()
        //body: JSON.stringify({a: 1, b: 'Textual content'})
        });
    const selectedUser = await request.json();
    console.log(selectedUser);

    $("#nameInput").val(selectedUser.name);
    $("#lastNameInput").val(selectedUser.lastName);
    $("#phoneInput").val(selectedUser.phone);
    $("#emailInput").val(selectedUser.email);

    isActualUser = false;
}

async function saveChanges(event) {
    if (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del evento submit
    }

    const name = document.getElementById('nameInput').value;
    const lastName = document.getElementById('lastNameInput').value;
    const phone = document.getElementById('phoneInput').value;

    const userData = {
        name,
        lastName,
        phone
    };
    console.log("SOG userData: ", userData);

    if (!validateData(userData)) {
        return;
    }

    try {
        let userIdToBeSaved = 0;
        console.log("isActualUser: ", isActualUser);
        console.log("localStorage: ", localStorage.id);
        console.log("userIdFromList: ", userIdFromList);

        if (isActualUser)
            userIdToBeSaved = localStorage.id;
        else
            userIdToBeSaved = userIdFromList;

        alert("The changes have been saved successfully.");
        window.location.href = 'users.html';

        console.log("userIdToBeSaved: ",userIdToBeSaved);
        const registerResponse = await fetch('api/users/' + userIdToBeSaved, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
    } catch (error) {
        console.error("An error occurred:", error);
        alert('An error occurred while processing the request.');
        window.location.href = 'users.html';
    }
}


function validateData(data) {
    const { name, lastName, phone } = data;

    if (!name || !lastName || !phone) {
        alert('Please fill in all fields!');
        return false;
    }

    return true;
}

// Asigna el evento submit al formulario
const userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', function(event) {
        saveChanges(event);
    });
}