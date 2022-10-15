let id = document.querySelector('.id')
let first_name = document.querySelector('#first_name')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let last_name = document.querySelector('#last_name')
let phone_number = document.querySelector('#phone_number')
let daofbi = document.querySelector('#date_of_birth')
let clas = document.querySelector('#clas')
let url = 'https://rest-api.celt.network/public/api/user'
let metodddddd = 'POST'
console.log(phone_number);
// methodsd:
// get=>getirmek
// post=>elave etmek
// delete=>silmek
// put=>edit

async function shovapi() {
    id.innerHTML = ''
    await fetch('https://rest-api.celt.network/public/api/user')
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                id.innerHTML += `
            <li>
            <p>neym:${e.full_name}</p>
            <p>imel:${e.email}</p>
            <button onclick="editf(${e.id})">edit:</button>
            <button onclick="deletf(${e.id})">delet:</button>
        </li>
            `
            });
        })
}

function rezett(){
    first_name.value=''
    last_name.value=''
    email.value=''
    daofbi.value=''
    phone_number.value=''
    password.value=''
}

shovapi()
clas.addEventListener('click', () => {

    if (first_name.value != '' && last_name.value != '' &&
        email.value != '' && daofbi.value != '' &&
        phone_number.value != '' && password.value != '') {
        let nyuyusir = {
            first_name: first_name.value,
            email: email.value,
            password: password.value,
            date_of_birth: daofbi.value,
            last_name: last_name.value,
            phone_number: phone_number.value
        }
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: metodddddd,
            body: JSON.stringify(nyuyusir)
        }).then(resp => resp.json())
            .then(data => {
                shovapi();
                rezett();
            })

    }

})

function deletf(id){
 fetch(`https://rest-api.celt.network/public/api/user/${id}`,{
    headers:{
        'Accept':'application/json',
        'Content-type': 'application/json',
    },
    method:'DELETE'

 })
 .then(resp=>resp.json())
 .then(data=>{
    shovapi()
 })

 

}

function editf(id){
    fetch(`https://rest-api.celt.network/public/api/user/${id}`)
    .then(resp=>resp.json())
    .then(data=>{
        first_name.value=data.first_name
        last_name.value=data.last_name
        email.value=data.email
        phone_number.value=data.phone_number
        password.value=data.password
        date_of_birth.value=data.date_of_birth
        metodddddd='PUT'
        url=`https://rest-api.celt.network/public/api/user/${id}`

    })
}



