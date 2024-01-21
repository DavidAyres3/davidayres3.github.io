const title = document.getElementById('title');
const avatar = document.getElementById('avatar')
const input = document.getElementById('newTask')
const enter = document.getElementById('enter')

const userData = localStorage.getItem('userData')

if(userData) {
    const userObject = JSON.parse(userData)
    
    if(userObject && userObject.username){
        const username = userObject.username
        title.innerHTML = `Lista de tarefas | ${username}`
    }
    
} else {
    alert('Você precisa realizar login.')
    window.location.href = "/index.html"
}

const userObject = JSON.parse(userData)
const username = userObject.username

async function getUser() {
    return fetch(`https://dvd-deploy-cyclic.cyclic.app/users/${username}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        });
}

function handleUserData() {
    getUser()
        .then(data => {
            const user = data.id;
            const userDataJSON = JSON.stringify(user)
            if (localStorage.getItem('userId')) {
                localStorage.removeItem('userId')
            }
            localStorage.setItem('userId', userDataJSON)
            fetch(`https://dvd-deploy-cyclic.cyclic.app/tasks/${user}`)
                .then(res => {
                    if (res.status === 200)
                        return res.json()
                })
                .then(data => {
                    var taskList = document.getElementById('tarefas');
                    data.forEach((task, indice) => {
                        var div = document.createElement("div");
                        var p = document.createElement("p");
                        var strong = document.createElement("strong")

                        p.textContent = task.description;
                        strong.textContent = task.createdAt
                        div.appendChild(p);
                        div.appendChild(strong)

                        taskList.appendChild(div);
                    });
                })
        })
}
handleUserData()

function newTask() {
    const id = localStorage.getItem('userId')

    const data = {
        user_id: id,
        description: input.value
    }

    fetch('https://dvd-deploy-cyclic.cyclic.app/task/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const taskList = document.getElementById('tarefas')


enter.addEventListener('click', (e) => {
    newTask();
    location.reload()
})
