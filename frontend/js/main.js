const modalForm = document.querySelector(".modal-window__form")

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
                console.log("Hello all work good")
                console.log(data);
                //Create task html structure with current info about itself
                const newTask = document.createElement("div");
                newTask.classList.add("task-card");
                newTask.setAttribute("id", data.id);
                    newTask.innerHTML = `   
                    <div class="task-box__checkbox">
                        <input type="checkbox">
                    </div>              
                    <div class="task-card__text">
                        <h2 class="task-card__title">${data.name}</h2>
                        <p class="task-card__description">${data.description}</p>
                    </div>
                    <div class="task-box__delete">                    
                            <img src="../icons/delete-icon.png" alt="Delete icon">  
                    </div>             
                `;
                const taskContainer =  document.querySelector(".current-tasks__box");
                taskContainer.insertAdjacentElement("afterbegin", newTask);

            })
            .catch(error => console.log(error))
    })