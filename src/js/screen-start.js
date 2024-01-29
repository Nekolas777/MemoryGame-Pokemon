import { cardsContainer, getPokemon, displayCards, attempsHTML } from "./main";
import { gameSelection } from "./data";

const startContent = document.querySelector('.start-content')
const hardBtn = document.querySelector('.hard-difficult');
const normalBtn = document.querySelector('.normal-difficult');
const startGameBtn = document.getElementById('startGame-btn');

const startScreen = document.querySelector('.start-screen');

const optionSelectedSound = document.getElementById('option-selected');

// my variables
const { normal, hard } = gameSelection;

function selectButton(selectedBtn, otherBtn) {
    selectedBtn.classList.add('selected');
    otherBtn.classList.remove('selected');
}

function selectOptionSound() {
    optionSelectedSound.play();
    setTimeout(() => {
        optionSelectedSound.pause();
        optionSelectedSound.currentTime = 0;
    }, 300);
}

function startGame( {attemps, numCards} ) {

    getPokemon(numCards);
    attempsHTML.textContent = attemps;

}

startContent.addEventListener('click', (e) => {

    const clickedBtn = e.target;

    if (clickedBtn === normalBtn) {
        clickedBtn.classList.contains('selected') === false ? selectOptionSound() : null;
        selectButton(normalBtn, hardBtn);
        console.log(normal);
    } else if (clickedBtn === hardBtn) {
        clickedBtn.classList.contains('selected') === false ? selectOptionSound() : null;
        selectButton(hardBtn, normalBtn);
        console.log(hard);
    }

});

startGameBtn.addEventListener('click', (e) => {

    
    if (normalBtn.classList.contains('selected')) {
        console.log("Elegiste la dificultad normal");
        startGame(normal);       
    }
    else if (hardBtn.classList.contains('selected')) {
        console.log("Elegiste la dificultad dificil");
        // añadimos un padding para dar espacio en el eje y
        cardsContainer.style.padding = '80px 0';
        startGame(hard);
    }
    
    if (normalBtn.classList.contains('selected') || hardBtn.classList.contains('selected')) {
        startScreen.classList.add('slide-up');
    }
    else {
        alert('Debe elegir una dificultad para continuar');
    }
    
    document.body.style.backgroundImage = 'url("images/background-Game.jpg")';

});


// For testing, this weekend I will fix it
startScreen.addEventListener('transitionend', () => {

    startScreen.style.display = 'none';
    cardsContainer.style.display = 'grid';
    
    if (normalBtn.classList.contains('selected')) {
        displayCards(normal.timeFlip);
    } 
    else if (hardBtn.classList.contains('selected')) {
        displayCards(hard.timeFlip);
    }

    console.log('termino animacion');

})
