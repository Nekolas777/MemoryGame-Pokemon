const container = document.querySelector('.container-cards');

// Calcula el número de columnas basado en el estilo computado
const style = getComputedStyle(container);
const numColumns = style.gridTemplateColumns.split(' ').length;

// Calcula el número de filas basado en el número de elementos hijos
const numRows = Math.ceil(container.children.length / numColumns);

// Agrega o elimina clases basadas en el número de filas
if (numRows >= 3) {
    console.log('XD');
}