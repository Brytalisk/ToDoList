const modalWindow = document.querySelector(".modal-window");
const tasksBox = document.querySelector(".current-tasks__box");

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Завантажені задачі з localStorage:", tasks);
    tasks.forEach(task => {
        renderTask(task);
    });
}

function renderTask(data) {
    const newElement = document.createElement("div");
    newElement.classList.add("task-card");
    newElement.innerHTML = `
        <div class="task-checkbox__container"><input type="checkbox" class="task-checkbox"/></div>
        <details class="task-info">
            <summary class="task-title">${data.name}</summary>
            <p class="task-description">${data.description}</p>
        </details>
        <div class="task-delete-update">&times;</div>
    `;
    tasksBox.appendChild(newElement);

    const deleteButton = newElement.querySelector(".task-delete-update");
    deleteButton.addEventListener("click", () => {
        const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = updatedTasks.filter(task => task.id !== data.id);
        saveTasksToLocalStorage(filteredTasks);
        tasksBox.removeChild(newElement);
    });
}

loadTasksFromLocalStorage();

document.querySelector(".modal-window__form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("taskDate").value || null;

    const taskData = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        date: taskDate ? new Date(taskDate).toISOString() : null
    };

    fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Помилка під час створення завдання");
            }
            return response.json();
        })
        .then(data => {
            console.log("Нова задача створена:", data);
            modalWindow.classList.remove("modal-window--open");
            renderTask(data);

            const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            updatedTasks.push(data);
            saveTasksToLocalStorage(updatedTasks);
        })
        .catch(error => {
            console.error("Сталася помилка:", error);
        });
});