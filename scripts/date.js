// Current Year
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

// Last Modified

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;