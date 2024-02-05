const title = document.getElementById('title');
const avatar = document.getElementById('avatar')
const input = document.getElementById('newTask')
const enter = document.getElementById('enter')
const update = document.getElementById('update')

const userData = localStorage.getItem('userData')



if(userData) {
    const userObject = JSON.parse(userData)
    
    if(userObject && userObject.username){
        const username = userObject.username
        title.innerHTML = `Olá, ${username}`
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

async function handleUserData() {
    try {
        const data = await getUser();
        const user = data.id;
        const userDataJSON = JSON.stringify(user);

        if (localStorage.getItem('userId')) {
            localStorage.removeItem('userId');
        }

        localStorage.setItem('userId', userDataJSON);

        const res = await fetch(`https://dvd-deploy-cyclic.cyclic.app/tasks/${user}`);

        if (res.status === 200) {
            const data = await res.json();

            var taskList = document.getElementById('tarefas');
            data.forEach(task => {
                var div = document.createElement("div");
                var p = document.createElement("p");
                var strong = document.createElement("strong")
                var delet = document.createElement("img")
                var edit = document.createElement("img")

                p.setAttribute("task-id", task.id)
                p.textContent = task.description
                strong.textContent = task.createdAt;
                delet.id = "del"
                delet.src = "/src/svg/delete.svg";
                edit.id = "edit"
                edit.src = "/src/svg/editar.svg"

                delet.addEventListener("click", function() {
                    handleImageClick(task.id);
                });

                edit.addEventListener("click", function(){
                    toggleButtons()
                })

                update.addEventListener("click", function(){
                    const data = {
                        description: input.value
                    }
                    fetch(`https://dvd-deploy-cyclic.cyclic.app/task/update/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    location.reload()
                })

                input.onblur = function(){
                    setTimeout(function(){
                        enter.style.display = "inline-flex"
                        update.style.display = "none"
                    }, 100)
                }

                div.appendChild(delet);
                div.appendChild(p);
                div.appendChild(strong)
                div.appendChild(edit)

                taskList.appendChild(div);
            });
        } else {
            throw new Error('Erro na requisição para obter tarefas');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

handleUserData()

function handleImageClick(taskId) {
    fetch(`https://dvd-deploy-cyclic.cyclic.app/delete/task/${taskId}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            console.log("Tarefa apagada com sucesso");
            location.reload()
        } else {
            console.error("Erro ao apagar a tarefa:", res.statusText);
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });
}

function toggleButtons(){
    input.placeholder = "alterar tarefa"
    input.focus()
    updateButton()
}

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

function enterButton(){
    update.style.display = 'none'
    enter.style.display = 'inline-flex'
}

function updateButton(){
    enter.style.display = 'none'
    update.style.display = 'inline-flex'
}

enter.addEventListener('click', (e) => {
    newTask();
    location.reload()
})
