const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.innerHTML = isOpen ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close Navigation Menu" : "Open Navigation Menu"
    );

});