
export const pokemonColor = {
    "normal": "#a8a878",
    "fire": "#f08030",
    "water": "#6890f0",
    "grass": "#78c850",
    "electric": "#f8d030",
    "ice": "#98d8d8",
    "fighting": "#c03028",
    "poison": "#a040a0",
    "ground": "#e0c068",
    "flying": "#a890f0",
    "psychic": "#f85888",
    "bug": "#a8b820",
    "rock": "#b8a038",
    "ghost": "#705898",
    "dragon": "#7038f8",
    "dark": "#705848", // Aproximación al color negro
    "steel": "#b8b8d0", // Aproximación a tonos grises
    "fairy": "#ee99ac",
};

// if you add more difficults, you can modify this
export const gameSelection = {
    normal: {
        attemps: 3,
        timeFlip: 2.5,
        numCards: 5,
    },
    hard: { 
        attemps: 5,
        timeFlip: 5,
        numCards: 10,
    }
}

/* console.log(gameSelection.hard); */
