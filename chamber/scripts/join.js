const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Open modal dialogs
const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modal = document.getElementById(link.dataset.modal);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close modal dialogs
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});