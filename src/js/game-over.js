import { ratingList, resetGame, totalPoints } from "./main";

const btnReturnMenu = document.getElementById('returnMenu-btn');

// verificamos si existe un elemento con la clave scoreList
if (!localStorage.getItem('scoreList')) {
    // Creamos un array de objeto con la info de cada personaje y su puntuacion
    const scoreList = [
        { num: "1", imgSrc: "images/charmander-face.jpg", username: "Brock Harrison", points: "9999" },
        { num: "2", imgSrc: "images/pikachu-face.webp", username: "Misty Waterflower", points: "8270" },
        { num: "3", imgSrc: "images/vaporeon-perfil.jpg", username: "Serena Yvonne", points: "6920" },
        { num: "4", imgSrc: "images/sooble-face.jpg", username: "Alisson Spring", points: "4990" },
        { num: "5", imgSrc: "images/luccario-face.jpg", username: "Clemont Lumiose", points: "2250" }
    ];

    // almacenamos el array de objetos serializables en el localStorage después de convertirlo a JSON
    localStorage.setItem('scoreList', JSON.stringify(scoreList));
}

// permite actualizar el numero de puestos al orden correcto
function updatePlaceScore(scoreList) {

    for (let i = 0; i < scoreList.length; i++) {

        let place = scoreList[i].querySelector('.list-num');

        place.textContent = i + 1;
        console.log(place);
    }

}

function appendScore(actuallyScore) {
    // variable para almacenar la posicion del nuevo elemento
    let newScore = document.createElement('li');
    newScore.classList.add("list-item");

    newScore.innerHTML = `
        <span class="list-num"></span>
        <img src="images/squirtle-face-jpg">
        <h1 class="username">Your name</h1>
        <span class="points-earned">${actuallyScore}</span>
    `;

    let scorePosition = 0;
    // selecciamos el nodeList actual para los scores
    let listItem = ratingList.querySelectorAll('.list-item');

    console.log(listItem.length);

    for (let i = 0; i < listItem.length; i++) {
        // casteamos cada uno de los puntos del array para validar
        let score = parseInt(listItem[i].querySelector('.points-earned').textContent);

        if (actuallyScore > score) {
            continue;
        }

        scorePosition++;
    }

    if (scorePosition < listItem.length) {
        ratingList.insertBefore(newScore, listItem[scorePosition]);
    }
    else {
        ratingList.appendChild(newScore);
    }

    // actualizamos el listItem para captura en variable los nuevos elementos añadidos al nodeList
    listItem = ratingList.querySelectorAll('.list-item');

    if (listItem.length > 5) {
        listItem[listItem.length - 1].remove();
    }

    listItem = ratingList.querySelectorAll('.list-item');

    updatePlaceScore(listItem);

    // Convertir listItem a un array de objetos serializables para añadir a localStorage
    let serializedList = [];
    listItem.forEach(item => {
        serializedList.push({
            num: item.querySelector('.list-num').textContent,
            imgSrc: item.querySelector('img').src,
            username: item.querySelector('.username').textContent,
            points: item.querySelector('.points-earned').textContent
        });
    });

    // Recuperar los datos almacenados del localStorage
    localStorage.setItem('scoreList', JSON.stringify(serializedList));

    console.log(listItem.length);
    console.log(listItem);

}

// realizaomos la peticion a la local storage API para obtener los datos almacenas en ella
function fetchToLocalStorage() {

    let storedScoreList = localStorage.getItem('scoreList');

    // Verificar si hay datos almacenados
    if (storedScoreList) {
        // Convertir la cadena JSON a un array de objetos
        let storedScoreArray = JSON.parse(storedScoreList);

        // Crear nuevos elementos li y agregarlos a la lista
        storedScoreArray.forEach(score => {
            let newScore = document.createElement('li');
            newScore.classList.add("list-item");

            newScore.innerHTML = `
                <span class="list-num">${score.num}</span>
                <img src="${score.imgSrc}">
                <h1 class="username">${score.username}</h1>
                <span class="points-earned">${score.points}</span>
            `;

            // Agregar el nuevo elemento a la lista
            ratingList.appendChild(newScore);
        });
    }
}

// una vez cargado el DOM llamamos a la funcion para realizar la peticion
document.addEventListener('DOMContentLoaded', function () {
    // Recuperar los datos almacenados del localStorage
    fetchToLocalStorage();
});

btnReturnMenu.addEventListener('click', (e) => {

    appendScore(totalPoints);
    resetGame();

})



