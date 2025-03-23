// COUNTRIES CONTAINER
const countriesContainer = document.querySelector('.main-gtc-itself-middle-countries');
const countryButtons = document.querySelectorAll('.main-gtc-itself-middle-country');
const countryButtonImages = document.querySelectorAll('.main-gtc-itself-middle-country-image');

// COUNTRY HINT TEXT
const countryHintText = document.querySelector('.main-gtc-itself-middle-hint-text');

// GUESS THE COUNTRY
const gtc = {
    pickedCountry: '',
};

// RETRIEVING THE COUNTRIES DATA

async function retrievingTheCountriesData() {
    try {
        const request = new Request('../data/country-data.json');

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(response.status);
        };

        const data = await response.json();

        displayingFourCountries(data);
    } catch (error) {
        console.log(error)
    };
};

retrievingTheCountriesData();

// DISPLAYING FOUR COUNTRIES

function displayingFourCountries(countriesData) {
    let pickedCountry = Math.floor(Math.random() * 3);
    for (let i = 0; i < countryButtons.length; i++) {
        let randomCountryIndex = countriesData[Math.floor(Math.random() * countriesData.length)];

        // COUNTRY IMAGE AND ALT
        countryButtonImages[i].src = randomCountryIndex.flags.svg;
        countryButtonImages[i].alt = `${randomCountryIndex.name}'s flag`;

        // COUNTRY BUTTON
        countryButtons[i].setAttribute('data-country-name', randomCountryIndex.name);

        if (i === pickedCountry) {
            gtc.pickedCountry = randomCountryIndex.name;
            countryHintText.innerHTML = `Country name: <span>${randomCountryIndex.name}</span>`;
        };
    };
};

// PICKING A COUNTRY

for (let i = 0; i < countryButtons.length; i++) {
    countryButtons[i].addEventListener('click', () => {
        const countryName = countryButtons[i].getAttribute('data-country-name');

        if (gtc.pickedCountry === countryName) {
            console.log('Correct');
        } else {
            console.log('Incorrect');
        };

        setTimeout(() => {
            gtc.pickedCountry = '';
            retrievingTheCountriesData();
        }, 2000);
    });
};