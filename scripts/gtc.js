// COUNTRIES CONTAINER
const countriesContainer = document.querySelector('.main-gtc-itself-middle-countries');
const countryButtons = document.querySelectorAll('.main-gtc-itself-middle-country');
const countryButtonImages = document.querySelectorAll('.main-gtc-itself-middle-country-image');

// COUNTRY HINT TEXT
const countryHintText = document.querySelector('.main-gtc-itself-middle-hint-text');

// GUESS THE COUNTRY
const gtc = {
    pickedCountry: '',
    guessBy: {
        guessBy: 'name',
    }
};

// START THE GAME

function startTheGame() {
    retrievingTheCountriesData();
    enablingAndResettingTheCountryButtons();
};

startTheGame();

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
        console.log(error);
        location.reload();
    };
};

// DISPLAYING FOUR COUNTRIES

function displayingFourCountries(countriesData) {
    let pickedCountry = Math.floor(Math.random() * 3);
    for (let i = 0; i < countryButtons.length; i++) {
        let randomCountryIndex = countriesData[Math.floor(Math.random() * countriesData.length)];

        // COUNTRY IMAGE AND ALT
        countryButtonImages[i].src = randomCountryIndex.flags.svg;
        countryButtonImages[i].alt = `${randomCountryIndex[gtc.guessBy.guessBy]}'s flag`;

        // COUNTRY BUTTON
        countryButtons[i].setAttribute(`data-country-${gtc.guessBy.guessBy}`, randomCountryIndex[gtc.guessBy.guessBy]);

        if (i === pickedCountry) {
            gtc.pickedCountry = randomCountryIndex[gtc.guessBy.guessBy];
            countryHintText.innerHTML = `Country ${gtc.guessBy.guessBy}: <span>${randomCountryIndex[gtc.guessBy.guessBy]}</span>`;
        };
    };
};

// PICKING A COUNTRY

for (let i = 0; i < countryButtons.length; i++) {
    countryButtons[i].addEventListener('click', () => {
        const countryGuessData = countryButtons[i].getAttribute(`data-country-${gtc.guessBy.guessBy}`);

        // 
        if (gtc.pickedCountry === countryGuessData) {
            countryButtons[i].classList.add('main-gtc-itself-middle-country-correct');
        } else {
            countryButtons[i].classList.add('main-gtc-itself-middle-country-incorrect');

            // SHOWING THE CORRECT ANSWER
            for (const countryButton of countryButtons) {
                const countryButtonAttribute = countryButton.getAttribute(`data-country-${gtc.guessBy.guessBy}`);

                if (countryButtonAttribute === gtc.pickedCountry) {
                    countryButton.classList.add('main-gtc-itself-middle-country-correct');
                    break;
                };
            };
        };

        // DISABLING THE COUNTRY BUTTONS
        disablingTheCountryButtons();

        setTimeout(() => {
            enablingAndResettingTheCountryButtons();
            gtc.pickedCountry = '';
            retrievingTheCountriesData();
        }, 2000);
    });
};

// DISABLING THE COUNTRY BUTTONS

function disablingTheCountryButtons() {
    for (const countryButton of countryButtons) {
        countryButton.disabled = true;
    };
};

// ENABLING AND RESETTING THE COUNTRY BUTTONS

function enablingAndResettingTheCountryButtons() {
    for (const countryButton of countryButtons) {
        countryButton.disabled = false;
        countryButton.classList.remove('main-gtc-itself-middle-country-correct');
        countryButton.classList.remove('main-gtc-itself-middle-country-incorrect');
    };
};