// Remote Career Hub navigation

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.innerHTML = isOpen ? "✕" : "☰";

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );
    });
}


// Current year

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Last modified date

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}