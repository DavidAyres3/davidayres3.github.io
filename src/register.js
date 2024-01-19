const firstnameInput = document.getElementById('firstname')
const lastnameInput = document.getElementById('lastname')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const registerButton = document.getElementById('register')
const backButton = document.getElementById('back')
const form = document.getElementById('form')

function register(){
    const userData = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    fetch('http://localhost:3333/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        delete userData.password

        console.log('Usuário registrado: ', data)

        window.location.href = '../pages/login.html'
    })
    .catch(e => {
        console.error('Erro ao registrar novo usuário.', e)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!usernameInput.value || !emailInput.value || !passwordInput.value || !firstnameInput.value || !lastnameInput.value) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    register()
})

backButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../pages/login.html'
})