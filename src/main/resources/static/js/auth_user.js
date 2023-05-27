$(document).ready(function() {
    updateUserName();
});

function updateUserName(){
    document.getElementById('txtUserName').outerHTML = localStorage.firstName;
}