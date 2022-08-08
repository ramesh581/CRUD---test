let url = 'https://62eca25155d2bd170e83c376.mockapi.io/users';

async function getData(){
    let users;
    try{
    let data= await fetch(url,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    users = await data.json();
    console.log(users);
}catch(err){
    console.log(err);
}
    return users;
}
getData();

async function displayData(){

    let users = await getData();
    let userList = document.querySelector('#user-list');
    userList.innerHTML = "loading..."
    try {
    users.forEach((user) => {
    userList.innerHTML +=`
    <div class='card user-container col-lg-4'>
    <img class='user-avatar' src=${user.avatar} height="auto" width="200" />
    <p class='card-title'>${user.name}</p>    
    <button class='btn btn-primary' onClick='deleteUser(${user.id})'>Delete</button>
    <button class='btn btn-primary' onClick='updateUser(${user.id})'>Edit</button>
    </div>
    `;
    });
    
}catch(err){
    console.log(err);
}
};
displayData();

async function createUser(){
    let username = document.querySelector('.add-input-user').value;
    let userAvatar = document.querySelector('.add-input-avatar').value;
    if(username!="" && userAvatar!=""){
    let data = await fetch(url,
{
    method : 'POST',
    body:JSON.stringify({
        name:username,
        avatar:userAvatar
    }),
    headers :{
        'content-type' : 'application/json'
    },
    
});
    }else{
        alert('Please enter a username and avatar'); 
}
displayData(); 
}


async function deleteUser(id){
        try{
    const data = await fetch(`https://62eca25155d2bd170e83c376.mockapi.io/users/${id}`,{
        method: "DELETE",
        headers:{
        "Content-Type" : "application/json"
        },
    })
    const users= await data.json();
    console.log(users);
    displayData();
}catch(err){
    console.log(err);
}
}

async function updateUser(id){
    let username = document.querySelector('.add-input-user').value;
    let userAvatar = document.querySelector('.add-input-avatar').value;
    if(username!="" && userAvatar!=""){
    let data = await fetch(`https://62eca25155d2bd170e83c376.mockapi.io/users/${id}`,
{
    method : 'PUT',
    body:JSON.stringify({
        name:username,
        avatar:userAvatar
    }),
    headers :{
        'content-type' : 'application/json'
    },
    
});
    }else{
        alert('Please enter a username and avatar'); 
}

displayData(); 
}

// async function updateUser(id){
//     updateData(id);
// }

