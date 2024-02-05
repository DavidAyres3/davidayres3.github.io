const firstnameInput = document.getElementById('firstname')
const lastnameInput = document.getElementById('lastname')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const registerButton = document.getElementById('register')
const backButton = document.getElementById('back')
const form = document.getElementById('form')

function register(){
    const userData = {
        username: usernameInput.value,
        password: passwordInput.value
    }

    fetch('https://dvd-deploy-cyclic.cyclic.app/register',{
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

        window.location.href = '/index.html'
    })
    .catch(e => {
        console.error('Erro ao registrar novo usuário.', e)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!usernameInput.value || !passwordInput.value) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    register()
})

backButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/index.html'
})
