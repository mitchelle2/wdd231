// ========================================
// PORT HARCOURT CHAMBER HOME PAGE
// ========================================


// ========================================
// ========================================
// WEATHER
// ========================================

const API_KEY = "efcf9c4ff72189cf21c25f8fb2c8b4c7";

const city = "Port Harcourt";
const country = "NG";

const currentTemperature =
    document.querySelector("#current-temp");

const weatherDescription =
    document.querySelector("#weather-description");

const forecast =
    document.querySelector("#forecast");


// ========================================
// GET WEATHER
// ========================================

async function getWeather() {

    try {

        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`;


        // Get current weather
        const currentResponse =
            await fetch(currentURL);

        if (!currentResponse.ok) {
            throw new Error(
                `Weather request failed: ${currentResponse.status}`
            );
        }

        const currentData =
            await currentResponse.json();


        // Display current temperature
        currentTemperature.textContent =
            `${Math.round(currentData.main.temp)}°C`;


        // Display weather description
        weatherDescription.textContent =
            currentData.weather[0].description;


        // Get forecast
        const forecastResponse =
            await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast request failed: ${forecastResponse.status}`
            );
        }

        const forecastData =
            await forecastResponse.json();


        displayForecast(forecastData.list);


    } catch (error) {

        console.error(
            "Unable to load weather data:",
            error
        );

        currentTemperature.textContent =
            "Weather unavailable";

        weatherDescription.textContent =
            "Unable to retrieve current weather.";

        forecast.innerHTML =
            "<p>Forecast data is currently unavailable.</p>";
    }
}


// ========================================
// DISPLAY 3-DAY FORECAST
// ========================================

function displayForecast(data) {

    forecast.innerHTML = "";

    const dailyForecast = [];


    data.forEach((item) => {

        const date =
            new Date(item.dt * 1000);

        const dateString =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        // Select one forecast around midday
        if (
            date.getHours() >= 11 &&
            date.getHours() <= 14 &&
            !dailyForecast.some(
                (day) => day.date === dateString
            )
        ) {

            dailyForecast.push({

                date: dateString,

                temperature:
                    Math.round(item.main.temp),

                description:
                    item.weather[0].description

            });

        }

    });


    // Display the first three days
    dailyForecast
        .slice(0, 3)
        .forEach((day) => {

            const card =
                document.createElement("article");

            card.classList.add("forecast-card");


            card.innerHTML = `
                <h3>${day.date}</h3>

                <p class="forecast-temperature">
                    ${day.temperature}°C
                </p>

                <p>
                    ${day.description}
                </p>
            `;


            forecast.appendChild(card);

        });
}


// ========================================
// START WEATHER
// ========================================

getWeather();

// BUSINESS SPOTLIGHTS
// ========================================

const spotlightContainer =
    document.querySelector("#spotlight-container");

async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Member data request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        // Get only Gold and Silver members
        const qualifiedMembers =
            data.members.filter(
                (member) =>
                    member.membership === 2 ||
                    member.membership === 3
            );

        // Randomize the qualified members
        const shuffledMembers =
            qualifiedMembers.sort(
                () => Math.random() - 0.5
            );

        // Select three random members
        const selectedMembers =
            shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {

        console.error(
            "Unable to load member data:",
            error
        );

        if (spotlightContainer) {
            spotlightContainer.innerHTML =
                "<p>Business spotlights are currently unavailable.</p>";
        }
    }
}


function displaySpotlights(members) {

    if (!spotlightContainer) {
        console.error(
            "Spotlight container was not found."
        );
        return;
    }

    spotlightContainer.innerHTML = "";

    members.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");

        const membershipLevel =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p>
                <strong>${membershipLevel}</strong>
            </p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
        `;

        spotlightContainer.appendChild(card);

    });
}


// Start business spotlights
getSpotlights();


// ========================================
// FOOTER YEAR
// ========================================

const year =
    document.querySelector("#year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}