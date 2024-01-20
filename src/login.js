const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const loginButton = document.getElementById('login')
const form = document.getElementById('form')
const backButton = document.getElementById('back')


function login() {
    const userData = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    
    fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (res.status === 200) {
            if(localStorage.getItem('userData')){
                localStorage.removeItem('userData');
            }
            const userDataWithoutPassword = { ...userData };
            delete userDataWithoutPassword.password;
            const userDataJSON = JSON.stringify(userDataWithoutPassword);
            localStorage.setItem('userData', userDataJSON);
            window.location.href = "./pages/main.html";
        } else {
            alert("Usuário ou senha inválidos.");
            throw new Error('Credenciais inválidas');
        }
    })
    .catch(error => {
        console.error('Erro ao entrar.', error);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!usernameInput.value || !passwordInput.value) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    login();
});

backButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './pages/register.html'
})