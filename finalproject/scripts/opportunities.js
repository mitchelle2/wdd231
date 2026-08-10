// ================================
// Remote Career Hub
// Opportunities Page
// ================================


// Get elements from the page
const opportunitiesGrid = document.querySelector("#opportunities-grid");
const categoryFilter = document.querySelector("#category-filter");
const loadingMessage = document.querySelector("#loading-message");
const resultsMessage = document.querySelector("#results-message");

const modal = document.querySelector("#opportunity-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");


// Store the opportunities after they are fetched
let opportunities = [];


// =================================
// FETCH OPPORTUNITIES
// =================================

async function getOpportunities() {

    try {

        const response = await fetch("data/opportunities.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

       opportunities = await response.json();

displayOpportunities(opportunities);
createCategoryOptions(opportunities);

// Restore the user's saved category preference
const savedCategory =
    localStorage.getItem("selectedCareerCategory");

if (
    savedCategory &&
    [...categoryFilter.options].some(
        (option) => option.value === savedCategory
    )
) {

    categoryFilter.value = savedCategory;

    const filteredOpportunities =
        opportunities.filter(
            (opportunity) =>
                opportunity.category === savedCategory
        );

    displayOpportunities(filteredOpportunities);
}

loadingMessage.textContent = "";

    } catch (error) {

        console.error("Unable to load opportunities:", error);

        loadingMessage.textContent =
            "Sorry, the opportunities could not be loaded. Please try again later.";

    }
}


// =================================
// DISPLAY OPPORTUNITIES
// =================================

function displayOpportunities(items) {

    opportunitiesGrid.innerHTML = "";

    resultsMessage.textContent =
        `${items.length} opportunit${items.length === 1 ? "y" : "ies"} found.`;


    items.forEach((opportunity) => {

        const card = document.createElement("article");

        card.classList.add("opportunity-card");


        card.innerHTML = `
            <div class="card-content">

                <p class="card-category">
                    ${opportunity.category}
                </p>

                <h2>${opportunity.title}</h2>

                <p class="company">
                    ${opportunity.company}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${opportunity.location}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${opportunity.type}
                </p>

                <p>
                    <strong>Salary:</strong>
                    ${opportunity.salary}
                </p>

                <button
                    class="learn-more"
                    type="button"
                    data-id="${opportunity.id}">
                    View Details
                </button>

            </div>
        `;


        opportunitiesGrid.appendChild(card);

    });


    // Add click events to the buttons
    const detailButtons =
        document.querySelectorAll(".learn-more");


    detailButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const opportunityId =
                Number(button.dataset.id);

            openOpportunityModal(opportunityId);

        });

    });

}


// =================================
// CREATE CATEGORY FILTER OPTIONS
// =================================

function createCategoryOptions(items) {

    const categories = [
        ...new Set(
            items.map((item) => item.category)
        )
    ];


    categories.sort();


    categories.forEach((category) => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}


// =================================
// FILTER OPPORTUNITIES
// =================================

categoryFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;

    // Save the user's selected category
    localStorage.setItem(
        "selectedCareerCategory",
        selectedCategory
    );

    if (selectedCategory === "all") {

        displayOpportunities(opportunities);

        return;

    }

    const filteredOpportunities =
        opportunities.filter(
            (opportunity) =>
                opportunity.category === selectedCategory
        );

    displayOpportunities(filteredOpportunities);

});


// =================================
// MODAL
// =================================

function openOpportunityModal(id) {

    const opportunity =
        opportunities.find(
            (item) => item.id === id
        );


    if (!opportunity) {
        return;
    }


    modalContent.innerHTML = `

        <p class="card-category">
            ${opportunity.category}
        </p>

        <h2>${opportunity.title}</h2>

        <h3>${opportunity.company}</h3>

        <p>
            ${opportunity.description}
        </p>

        <dl>

            <dt>Location</dt>
            <dd>${opportunity.location}</dd>

            <dt>Employment Type</dt>
            <dd>${opportunity.type}</dd>

            <dt>Salary</dt>
            <dd>${opportunity.salary}</dd>

            <dt>Category</dt>
            <dd>${opportunity.category}</dd>

        </dl>

        <p>
            <strong>Interested in this type of role?</strong>
            Use the Get Started page to explore resources
            for preparing for remote work.
        </p>

    `;


    modal.showModal();

}


// =================================
// CLOSE MODAL
// =================================

closeModal.addEventListener("click", () => {

    modal.close();

});


modal.addEventListener("click", (event) => {

    const dialogDimensions =
        modal.getBoundingClientRect();


    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {

        modal.close();

    }

});


// =================================
// CURRENT YEAR
// =================================

const currentYear =
    document.querySelector("#current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// =================================
// LAST MODIFIED
// =================================

const lastModified =
    document.querySelector("#last-modified");

if (lastModified) {

    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;

}


// =================================
// STARTING THE PAGE
// =================================

getOpportunities();