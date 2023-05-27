$(document).ready(function() {
    loadLoggedUser();
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
}

async function saveChanges() {
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
        console.log("localStorage.id: ",localStorage.id);
        const registerResponse = await fetch('api/users/' + localStorage.id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });

        alert("The changes have been saved successfully.");

    } catch (error) {
        console.error("An error occurred:", error);
        alert('An error occurred while processing the request.');
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