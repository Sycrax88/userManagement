// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#userTable').DataTable();
    updateUserName();
});

function updateUserName(){
    document.getElementById('txtUserName').outerHTML = localStorage.email;
}

function getHeaders(){
    return {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
         'Authorization': localStorage.token
       };
}

async function loadUsers(){

    const request = await fetch('api/users', {
    method: 'GET',
    headers: getHeaders()
    //body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const users = await request.json();
    console.log(users);


    let listHtml = '';
    for (let user of users){
        let deleteButton = '<a href="#" onclick = "deleteUser('+user.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let userHtml = '<tr><td>'+user.id+'</td><td>'+user.name+'</td><td>'
                        +user.lastName+'</td><td>'+user.email+'</td><td>'+user.phone+
                        '</td><td>'+deleteButton+'</td></tr>';
        listHtml += userHtml;
    }

        document.querySelector('#userTable tbody').outerHTML = listHtml;
}

async function deleteUser(id){
    if(confirm("Do you want to delete this user?")){
        const request = await fetch('api/users/' + id, {
                method: 'DELETE',
                headers: getHeaders();
            });
    }
    location.reload();
}