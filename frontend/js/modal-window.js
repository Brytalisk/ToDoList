const modalWindow = document.querySelector(".modal-window");
const addTaskContentContainer = document.querySelector(".header-nav__create-task");
const closeIcon = document.querySelector(".modal-window__close-button");

function openModalWindow() {
    modalWindow.classList.add("modal-window--open");
}

function closeModalWindow() {
    modalWindow.classList.remove("modal-window--open")
}

addTaskContentContainer.addEventListener("click", openModalWindow);
closeIcon.addEventListener("click", closeModalWindow);


