const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {
        console.error(error);
    }
}

function displayMembers(members) {

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">

            <h2>${member.name}</h2>

            <p><strong>Industry:</strong> ${member.industry}</p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <p><strong>Membership:</strong> ${membershipLevel(member.membership)}</p>
        `;

        membersContainer.appendChild(card);

    });

}

function membershipLevel(level) {

    switch(level){

        case 1:
            return "Member";

        case 2:
            return "Silver";

        case 3:
            return "Gold";

        default:
            return "Member";

    }

}

getMembers();

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

});

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

});