import { cardsContainer, shuffleCards } from "./main.js";

const volumeOption = document.getElementById('volume-option');

export const flipOption = document.getElementById('flip-option');
// variable para verificar si el comodin ya ha sido usado
export let hasUsedWildcard = false;

function cardsAreFlipped() {

    const cards = Array.from(cardsContainer.querySelectorAll('.card'));
    let countFlips = 0;

    cards.forEach(card => {
        
        const frontCard = card.querySelector('.front');
        const backCard = card.querySelector('.back');

        // agregar al contador si la carta ya esta volteada
        if (frontCard.style.transform == 'rotateY(180deg)' && 
            backCard.style.transform == 'rotateY(0deg)'){ 
            countFlips++;
        }

    });

    return cards.length === countFlips;
}

volumeOption.addEventListener('click', (e) => {
    
    console.log('Hola soy el volumen');

    if (volumeOption.className.includes('fa-volume-high')) {
        volumeOption.className = 'fa-solid fa-volume-xmark';
    }
    else {
        volumeOption.className = 'fa-solid fa-volume-high';
    }

});

flipOption.addEventListener('click', (e) => {

    console.log('Hola soy el restart');
    
    if (!cardsAreFlipped()) {

        if (!hasUsedWildcard) {
            shuffleCards(3);
            hasUsedWildcard = true;
            flipOption.style.display = 'none';  
        }
        /* else {
            alert('you only have one wild card 😨');
        } */
    }
    else {
        console.log('las cartas ya estan volteadas');
    }

});