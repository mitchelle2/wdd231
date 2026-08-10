// ================================
// Remote Career Hub
// Thank You Page
// ================================

// Get the submission details container
const submissionDetails =
    document.querySelector("#submission-details");

// Get the submitted form data from the URL
const params = new URLSearchParams(window.location.search);

// Get each submitted value
const firstName = params.get("first-name");
const lastName = params.get("last-name");
const email = params.get("email");
const careerField = params.get("career-field");
const experience = params.get("experience");
const goals = params.get("goals");

// Display the submitted information
if (firstName && lastName && email) {

    submissionDetails.innerHTML = `

        <p>
            <strong>Name:</strong>
            ${firstName} ${lastName}
        </p>

        <p>
            <strong>Email:</strong>
            ${email}
        </p>

        <p>
            <strong>Career Field:</strong>
            ${careerField}
        </p>

        <p>
            <strong>Remote Work Experience:</strong>
            ${experience}
        </p>

        <p>
            <strong>Career Goals:</strong>
            ${goals}
        </p>

    `;

} else {

    submissionDetails.innerHTML = `

        <p>
            We could not find your submitted information.
        </p>

        <p>
            Please return to the Get Started page and
            submit the form again.
        </p>

        <a href="contact.html">
            Return to Get Started
        </a>

    `;

}


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