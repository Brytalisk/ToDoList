const boxForCheckedChange = document.querySelector(".current-tasks__box");

boxForCheckedChange.addEventListener("change", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        const taskCard = event.target.closest(".task-card");
        taskCard.classList.toggle("task-card--completed");
    }
});
