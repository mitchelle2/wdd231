import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");

const areaNames = [
    "card1",
    "card2",
    "card3",
    "card4",
    "card5",
    "card6",
    "card7",
    "card8"
];

// Build the discover cards
places.forEach((place, index) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    // Assign each card to its grid area
    card.style.gridArea = areaNames[index];

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.alt}"
                width="300"
                height="200"
                loading="lazy">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button">Learn More</button>
    `;

    grid.appendChild(card);

});

// Display the last visit message
const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const oneDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((currentVisit - Number(lastVisit)) / oneDay);

    if (daysBetween < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysBetween === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysBetween} days ago.`;

    }

}

localStorage.setItem("lastVisit", currentVisit);