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
        })
        .catch(error => {
            console.error("Сталася помилка:", error);
        });
});