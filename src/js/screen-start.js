import { cardsContainer, getPokemon, startGame } from "./main";

const startContent = document.querySelector('.start-content')
const hardBtn = document.querySelector('.hard-difficult');
const normalBtn = document.querySelector('.normal-difficult');
const startGameBtn = document.getElementById('startGame-btn');

const startScreen = document.querySelector('.start-screen');

const optionSelectedSound = document.getElementById('option-selected');

function displayContent() {
    
}

function selectButton(selectedBtn, otherBtn) {
    selectedBtn.classList.add('selected');
    otherBtn.classList.remove('selected');
}

function selectOptionSound() {
    optionSelectedSound.play();
    setTimeout(() => {
        optionSelectedSound.pause();
        optionSelectedSound.currentTime = 0;
    }, 400);
}

startContent.addEventListener('click', (e) => {

    const clickedBtn = e.target;

    if (clickedBtn === normalBtn) {
        clickedBtn.classList.contains('selected') === false ? selectOptionSound() : null;
        selectButton(normalBtn, hardBtn);
    } else if (clickedBtn === hardBtn) {
        clickedBtn.classList.contains('selected') === false ? selectOptionSound() : null;
        selectButton(hardBtn, normalBtn);
    }

});

startGameBtn.addEventListener('click', (e) => {

    startScreen.classList.add('slide-up');
    getPokemon(5);
});


// For testing, this weekend I will fix it
startScreen.addEventListener('transitionend', () => {

    startScreen.style.display = 'none';
    cardsContainer.style.display = 'grid';
    startGame(3);
    console.log('termino animacion');

})
