// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
});

var userTable; // Variable para almacenar la referencia de la tabla DataTable

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function loadUsers() {
    // Destruir la tabla DataTable existente
    if (userTable && $.fn.DataTable.isDataTable('#userTable')) {
        userTable.destroy();
    }

    const userRoleId = getUserRole();

    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });
    const users = await request.json();

    // Crear una matriz para almacenar los datos de los usuarios
    const data = users.map(user => [
        user.id,
        user.name,
        user.lastName,
        user.email,
        user.phone,
        parseInt(userRoleId) === 1 ? '<a href="#" onclick="deleteUser(' + user.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>' : 'Actions Only Available for Admins'
    ]);

    // Configurar las columnas de la tabla
    const columns = [
        { title: 'ID' },
        { title: 'Name' },
        { title: 'Last Name' },
        { title: 'Email' },
        { title: 'Phone' },
        { title: 'Actions', orderable: false } // Columna sin ordenamiento
    ];

    // Inicializar la tabla DataTables
    userTable = $('#userTable').DataTable({
        data: data,
        columns: columns
    });

}

async function deleteUser(id){
    if(confirm("Do you want to delete this user?")){
        const request = await fetch('api/users/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
    }
    location.reload();
}

async function getUserRole(){
    const response = await fetch('api/roles/'+ localStorage.id, {
        method: 'GET',
        headers: getHeaders()
    });
    const userRoleId  = await response.text();
    return userRoleId;
}