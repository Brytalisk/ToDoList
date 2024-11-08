const modalForm = document.querySelector(".modal-window__form");
const currentTaskNav = document.querySelector("#current-task");

//Event for create new task and display it
modalForm.addEventListener("submit",event => {
    event.preventDefault();

    const taskName = document.querySelector("#taskName").value;
    const taskDescription = document.querySelector("#taskDescription").value;
    const taskDate = document.querySelector("#taskDate").value;

    const formData = {
        "taskName" : taskName,
        "taskDescription" : taskDescription,
        "taskDate" : taskDate,
    }; //збираю всі інфу з форми

        fetch("http://localhost:3000/createTask",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Request failed.");
                }
                return response.json();
            })
            .then(data => {
                createHTMLCodeForTask(data);
                console.log("Task created");
            })
            .catch(error => console.log(error))
    })

//Function for create code of Task's block
export function createHTMLCodeForTask(data) {
    const newTask = document.createElement("div");
    newTask.classList.add("task-card");
    newTask.setAttribute("id", data._id);
    newTask.innerHTML = `   
                    <div class="task-card__checkbox">
                        <input type="checkbox">
                    </div>              
                    <div class="task-card__text">
                        <h2 class="task-card__title">${data.name}</h2>
                        <p class="task-card__description">${data.description}</p>
                    </div>
                    <div class="task-card__delete">                    
                            <img class="task-card__delete-icon" src="../icons/delete-icon.png" alt="Delete icon">  
                    </div>             
                `;
    const taskContainer =  document.querySelector(".current-tasks__box");
    taskContainer.insertAdjacentElement("afterbegin", newTask);
}

currentTaskNav.addEventListener("click", (event) => {
    console.log("Hello!");
    renderTasks();
})

//Event for show all tasks when the session starts
async function renderTasks() {
    try {
        const response = await fetch("http://localhost:3000/renderTasks");
            if (!response.ok) {
                throw new Error("Request failed.");
            }
        console.log("Hi from method renderTasks");
            const tasks = await response.json();

            tasks.forEach((task) => {createHTMLCodeForTask(task)});
    }catch (error) {
        console.log("Problem with loading tasks - " + error);
    }
}

document.querySelector(".current-tasks__box").addEventListener("click", (event) => {
    if(event.target.classList.contains("task-card__delete-icon")) {
        console.log("Yes, this class exist");
        const taskElement = event.target.closest(".task-card");
        const taskId = taskElement.getAttribute("id");
        console.log(taskId);
        deleteChoosenTask(taskId, taskElement);
    }
})


async function deleteChoosenTask(taskId, taskElement) {
    try {
        const response = await fetch(`http://localhost:3000/deleteTask/${taskId}`, {
            method: "DELETE",
        });
        if (!response.ok) { throw new Error("Request failed."); }
        taskElement.remove();
        console.log("Task deleted successfully");

    } catch (error) {
        console.error("Problem when tried delete task in front - " + error);
    }
}