const modalWindow = document.querySelector(".modal-window");
const tasksBox = document.querySelector(".current-tasks__box");

document.querySelector(".modal-window__form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("taskDate").value || null;

    const taskData = {
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
            console.log("Все дуже класно!");
                modalWindow.classList.remove("modal-window--open");
                const taskId = data.id;
                const taskName = data.name;
                const taskDescription = data.description;
                const taskDate = data.date;
                const newElement = document.createElement("div");
                newElement.classList.add("task-card");
                newElement.innerHTML =
`<h2>${taskName}</h2>
<div>${taskDescription}</div>
                    `;
            tasksBox.appendChild(newElement);
        })
        .catch(error => {
            console.error("Сталася помилка:", error);
        });
});