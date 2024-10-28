
const modalForm = document.querySelector(".modal-window__form")

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

    console.log(JSON.stringify(formData));
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
                const currentTask = document.querySelector(".current-tasks__box");
                currentTask.textContent = data.taskName;
            })
            .catch(error => console.log(error))
    })