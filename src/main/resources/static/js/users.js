// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#userTable').DataTable();
});


async function loadUsers(){

    const request = await fetch('users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const users = await request.json();
    console.log(users);

    let listHtml = '';
for (let user of users){
    let userHtml = '<tr><td>'+user.id+'</td><td>'+user.name+'</td><td>'
                    +user.lastName+'</td><td>'+user.email+'</td><td>'+user.phone+
                    '</td><td><a href="#" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a></td></tr>'
    listHtml += userHtml;
}

    document.querySelector('#userTable tbody').outerHTML = listHtml;
}