import { resetGame } from "./main";

const btnReturnMenu = document.getElementById('returnMenu-btn');

btnReturnMenu.addEventListener('click', (e) => {

    resetGame();
    
})


