const menuButtons = document.querySelectorAll('.main-gtc-menu-button-container');
const guessByButtons = document.querySelectorAll('.main-gtc-menu-button-content-button-guess-by');
const musicButton = document.querySelector('#musicButton');
const soundButton = document.querySelector('#soundButton');
const audioElement = document.createElement('audio');
audioElement.volume = 0.2;
audioElement.src = '../assets/sounds/bg-music.mp3';

// GUESS BY TEXT
const guessByText = document.querySelector('#guessByText');

// HANDLING THE MENU BUTTONS

for (let i = 0; i < menuButtons.length; i++) {
    let isInnerContainerShown = false;
    menuButtons[i].addEventListener('click', e => {
        e.stopPropagation();
        if (isInnerContainerShown === false) {
            menuButtons[i].classList.add('main-gtc-menu-button-active');
            
            isInnerContainerShown = true;
        } else {
            menuButtons[i].classList.remove('main-gtc-menu-button-active');

            isInnerContainerShown = false;
        };
    });

    window.addEventListener('click', () => {
        isInnerContainerShown = false;
        menuButtons[i].classList.remove('main-gtc-menu-button-active');
    });
};

// HANDLING THE GUESS BY

for (let i = 0; i < guessByButtons.length; i++) {
    guessByButtons[i].addEventListener('click', e => {
        e.stopPropagation();
        const guessByValue = guessByButtons[i].getAttribute('data-guess-by-value');

        gtc.guessBy.guessBy = guessByValue;

        for (const guessByButton of guessByButtons) {
            guessByButton.classList.remove('main-gtc-menu-button-content-button-guess-by-active');
        };
        guessByButtons[i].classList.add('main-gtc-menu-button-content-button-guess-by-active');

        guessByText.textContent = `GUESS BY: ${guessByValue.toUpperCase()}`;
    });
};

// HANDLING THE MUSIC

function handlingTheMusic(e) {
    e.stopPropagation();

    if (gtc.isMusicOn === false) {
        musicButton.classList.add('main-gtc-menu-button-content-button-settings-active');
        audioElement.play();
        
        gtc.isMusicOn = true;
    } else {
        musicButton.classList.remove('main-gtc-menu-button-content-button-settings-active');
        audioElement.pause();
        
        gtc.isMusicOn = false;
    };
};

// HANDLING THE SOUND

function handlingTheSound(e) {
    e.stopPropagation();

    if (gtc.isSoundOn === false) {
        soundButton.classList.add('main-gtc-menu-button-content-button-settings-active');
        
        gtc.isSoundOn = true;
    } else {
        soundButton.classList.remove('main-gtc-menu-button-content-button-settings-active');
        
        gtc.isSoundOn = false;
    };
};

// INITIALIZING THE BUTTONS
musicButton.addEventListener('click', handlingTheMusic);
soundButton.addEventListener('click', handlingTheSound);