import { pokemonColor } from "./data";

const d = document;
const cardsContainer = d.querySelector('.container-cards');
// arreglo para almacenar las cartas que ya hay sido seleccionadas
let seleccions = []

// endpoint to access the pokeAPI 
const url = 'https://pokeapi.co/api/v2/pokemon/'

function getPokemon(quantity) {

    // creamos un arreglo de promesas
    const promises = [];

    // creamos un Set para almencenar valores unicos en un array
    const UniqueIDs = new Set();

    while (UniqueIDs.size < quantity) {
        // generate a random number id beetwen 0 and 150
        let id = Math.floor(Math.random() * 150) + 1;
        UniqueIDs.add(id);
    }

    // aqui iteramos sobre los IDs unicos almacenados en el array UniquesIDs
    for (let id of UniqueIDs) {
        // combine the pokeAPI url with pokemon id;
        const pokemonURL = url + id;

        // Agregamos cada promesa al array "promises"
        promises.push(
            fetch(pokemonURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Peticion a pokemon con ${id} ha fallado`);
                })
        );
    }

    Promise.all(promises)
        .then((result) => {
            renderCards(result);
        })
        .catch(error => {
            console.error('Alguna de las peticiones ha fallado', error);
        })

}

function uploadImages(arrPokemons) {

    let icons = []

    for (let i = 0; i < arrPokemons.length; i++) {
        icons.push(arrPokemons[i].sprites.other.dream_world.front_default)
    }

    return icons;
}

function createButtonTypes(arrTypes, container) {

    for (let i = 0; i < arrTypes.length; i++) {

        const button = document.createElement('button');
        const typeName = arrTypes[i].type.name;

        button.textContent = typeName;

        button.classList.add(`${typeName}`);

        // añadir el color de fondo a cada tipo de acuerdo a su color
        if (typeName in pokemonColor) {
            button.style.backgroundColor = pokemonColor[typeName];
        }

        container.appendChild(button);
    }

}

function styleCard(bgColor, backContainer) {

    // puedes agregar mas funcionalidades para modificar los estilos de la carda
    backContainer.style.background = `radial-gradient(circle at 50% 0%, ${bgColor} 38%, #fff 38%)`;

}

function renderCards(arrCards) {

    console.log(arrCards);

    let icons = uploadImages(arrCards);

    // aquí almacenaremos la cantidad de cartas creadas
    let cards = [];

    for (let i = 0; i < arrCards.length; i++) {
        const { id } = arrCards[i];
        const hp = arrCards[i].stats[0].base_stat;
        const attack = arrCards[i].stats[1].base_stat;
        const defense = arrCards[i].stats[2].base_stat;
        const speed = arrCards[i].stats[5].base_stat;
        const pokeName = arrCards[i].name;
        const types = arrCards[i].types;

        // setear el color de fondo de acuerdo a color de su tipo
        const themeColor = pokemonColor[arrCards[i].types[0].type.name];

        // Crear el elemento DOM para la carta
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        /* cardElement.id = id; */

        cardElement.innerHTML = `
            <div class="front">
                <img src="public/pokecard-reverse.png">
            </div>
            <div class="back">
                <div class="hp-container">
                    <p><small>HP</small> <span>${hp}</span></p>
                </div>
                <figure class="pokemon-container">
                    <img src="${icons[i]}" alt="_${pokeName}">
                    <figcaption class="name">${pokeName}</figcaption>
                </figure>
                <div class="types-container">
                </div>
                <div class="stats-container">
                    <p><span class="attack">${attack}</span><br><strong>Attack</strong></p>
                    <p><span class="defense">${defense}</span><br><strong>Defense</strong></p>
                    <p><span class="speed">${speed}</span><br><strong>Speed</strong></p>
                </div>
            </div>
        `;

        const typesContainer = cardElement.querySelector('.types-container');
        const backContainer = cardElement.querySelector('.back');
        styleCard(themeColor, backContainer);
        createButtonTypes(types, typesContainer);

        // Almacenar la referencia al elemento DOM de la carta
        cards.push(cardElement);
    }

    // combinar los dos arreglos creados y randomizar la posición para simular aleatoriedad
    const newArray = [...cards, ...cards];

    // Añadir las cartas y unirlas con "join"
    cardsContainer.innerHTML = newArray.sort(() => Math.random() - 0.5).map(card => card.outerHTML).join(" ");

    console.log(cardsContainer);
}

cardsContainer.addEventListener('click', (e) => {

    const clickedCard = e.target.closest('.card');

    if (clickedCard) {
        const frontCards = clickedCard.querySelector('.front');
        const backCards = clickedCard.querySelector('.back');

        // validacion para verificar si la carta no esta volteada

        if (frontCards.style.transform != 'rotateY(180deg)' && backCards.style.transform != 'rotateY(0deg)') {
            frontCards.style.transform = 'rotateY(180deg)';
            backCards.style.transform = 'rotateY(0deg)';

            seleccions.push(clickedCard);
        }

        console.log(seleccions);
        if (seleccions.length == 2) {

            // almacenamos la referencia HTML de la ard en las variables
            let firstCard = seleccions[0];
            let secondCard = seleccions[1];

            setTimeout(() => {

                if (firstCard.innerHTML !== secondCard.innerHTML) {

                    console.log("SON DIFERENTES");

                    let primeraCardFront = firstCard.querySelector('.front');
                    let primeraCardBack = firstCard.querySelector('.back');
                    let segundaCardFront = secondCard.querySelector('.front');
                    let segundaCardsBack = secondCard.querySelector('.back');

                    primeraCardFront.style.transform = 'rotateY(0deg)';
                    primeraCardBack.style.transform = 'rotateY(180deg)';
                    segundaCardFront.style.transform = 'rotateY(0deg)';
                    segundaCardsBack.style.transform = 'rotateY(180deg)';
                }
                else {
                    alert("HALLASTE UN PAR WEBOOOOON!!!")
                }

            }, 1000);

            seleccions = [];
        }
        else {
            console.log('falta seleccionar');
        }

    }

})


function selectCards(seleccions, container) {

    let firstCard = document.getElementById(seleccions[0]);
    let secondCard = document.getElementById(seleccions[1]);
    let frontCards = firstCard.querySelector('.card > .front');
    let backCards = firstCard.querySelector('.card > .back');
    let frontCards1 = secondCard.querySelector('.card > .front');
    let backCards1 = secondCard.querySelector('.card > .back');

    setTimeout(() => {

        if (firstCard.id !== secondCard.id) {
            console.log("SON DIFERENTES")

            frontCards.style.transform = 'rotateY(0deg)';
            backCards.style.transform = 'rotateY(180deg)';
            frontCards1.style.transform = 'rotateY(0deg)';
            backCards1.style.transform = 'rotateY(180deg)';
        }
        else {
            console.log("Ambas cartas son iwales uwu");
        }

        console.log(firstCard, secondCard);
    }, 1000);

}

document.addEventListener('DOMContentLoaded', getPokemon(5));
