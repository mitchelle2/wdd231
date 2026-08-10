// =================================
// CONTACT PAGE
// =================================

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


// Current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Last modified
if (lastModified) {
    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}


// =================================
// NAVIGATION
// =================================

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen =
            navigation.classList.contains("open");

        menuButton.innerHTML =
            isOpen ? "✕" : "☰";

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}