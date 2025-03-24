// MENU
const gtcMenu = document.querySelector('.main-gtc-menu');
const startButton = document.querySelector('#startButton');

// COUNTRIES CONTAINER
const gtcItself = document.querySelector('.main-gtc-itself');
const countriesContainer = document.querySelector('.main-gtc-itself-middle-countries');
const countryButtons = document.querySelectorAll('.main-gtc-itself-middle-country');
const countryButtonImages = document.querySelectorAll('.main-gtc-itself-middle-country-image');

// COUNTRY HINT TEXT
const countryHintText = document.querySelector('.main-gtc-itself-middle-hint-text');

// SCORE
const scoreText = document.querySelector('#scoreText');

// GUESS THE COUNTRY
const gtc = {
    isGameStarted: false,
    pickedCountry: {
        pickedCountryGuess: '',
        pickedCountryGuessReward: 0,
    },
    guessBy: {
        guessBy: 'name',
    },
    score: 0,
    isMusicOn: false,
    isSoundOn: true,
};

// START THE GAME

function startTheGame() {
    gtc.isGameStarted = true;
    checkingIfTheGameStarted();
    retrievingTheCountriesData();
    enablingAndResettingTheCountryButtons();
};

// CHECKING IF THE GAME STARTED

function checkingIfTheGameStarted() {
    if (gtc.isGameStarted === true) {
        gtcItself.classList.add('main-gtc-itself-active');
        gtcMenu.classList.add('main-gtc-menu-hidden');
    } else {
        gtcItself.classList.remove('main-gtc-itself-active');
        gtcMenu.classList.remove('main-gtc-menu-hidden');
    };
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
            gtc.pickedCountry.pickedCountryGuess = randomCountryIndex[gtc.guessBy.guessBy];
            gtc.pickedCountry.pickedCountryGuessReward = randomCountryIndex.points;
            countryHintText.innerHTML = `Country ${gtc.guessBy.guessBy}: <span>${randomCountryIndex[gtc.guessBy.guessBy]}</span>`;
        };
    };
};

// PICKING A COUNTRY

for (let i = 0; i < countryButtons.length; i++) {
    countryButtons[i].addEventListener('click', () => {
        const countryGuessData = gtc.guessBy.guessBy === 'population' ? Number(countryButtons[i].getAttribute(`data-country-${gtc.guessBy.guessBy}`)) : countryButtons[i].getAttribute(`data-country-${gtc.guessBy.guessBy}`);

        const pickedCountryGuess = gtc.guessBy.guessBy === 'population' ? Number(gtc.pickedCountry.pickedCountryGuess) : gtc.pickedCountry.pickedCountryGuess;

        // CHECKING IF THE GUESS WAS CORRECT
        if (pickedCountryGuess === countryGuessData) {
            // IF CORRECT:
            gtc.score += gtc.pickedCountry.pickedCountryGuessReward;
            scoreText.textContent = gtc.score;
            countryButtons[i].classList.add('main-gtc-itself-middle-country-correct');

            // SAVING THE SCORE IN LOCAL STORAGE
            localStorage.setItem('scoreLS', gtc.score);

            // HANDLING THE SOUND EFFECT
            if (gtc.isSoundOn === true) {
                const soundEffect = document.createElement('audio');
                soundEffect.src = '../assets/sounds/correct.wav';
                soundEffect.play();
            };
        } else {
            // IF NOT:
            countryButtons[i].classList.add('main-gtc-itself-middle-country-incorrect');

            // SHOWING THE CORRECT ANSWER
            for (const countryButton of countryButtons) {
                const countryGuessData = gtc.guessBy.guessBy === 'population' ? Number(countryButton.getAttribute(`data-country-${gtc.guessBy.guessBy}`)) : countryButton.getAttribute(`data-country-${gtc.guessBy.guessBy}`);

                if (countryGuessData === pickedCountryGuess) {
                    countryButton.classList.add('main-gtc-itself-middle-country-correct');
                    console.log(true);
                };
            };

            // HANDLING THE SOUND EFFECT
            if (gtc.isSoundOn === true) {
                const soundEffect = document.createElement('audio');
                soundEffect.src = '../assets/sounds/incorrect.wav';
                soundEffect.play();
            };
        };

        // DISABLING THE COUNTRY BUTTONS
        disablingTheCountryButtons();

        setTimeout(() => {
            enablingAndResettingTheCountryButtons();
            gtc.pickedCountry.pickedCountryGuess = '';
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

// UPDATING THE SCORE

function updatingTheScore() {
    const scoreLS = localStorage.getItem('scoreLS');
    
    if (scoreLS) {
        gtc.score = Number(scoreLS);
        scoreText.textContent = gtc.score;
    };
};

updatingTheScore();

// INITIALIZE BUTTONS
startButton.addEventListener('click', startTheGame);