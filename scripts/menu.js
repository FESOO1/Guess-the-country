const menuButtons = document.querySelectorAll('.main-gtc-menu-button-container');
const guessByButtons = document.querySelectorAll('.main-gtc-menu-button-content-button-guess-by');

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