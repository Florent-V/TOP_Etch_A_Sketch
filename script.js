let userChoice = prompt('Combien de pixels par côté ?');
let side = parseInt(userChoice);
let opa;

const cont = document.getElementById('grid');

/* Création de la grille */

let elt;
for (let i = 0; i < side*side; i++) {
    elt = document.createElement('div');
    elt.classList.add('box');
    elt.style.background = "rgb(0, 0, 255)";
    elt.style.opacity = "0";
    cont.appendChild(elt);
}


document.getElementById('grid').style.gridTemplateColumns = "repeat("+side+", 1fr)";
document.getElementById('grid').style.gridTemplateRows = "repeat("+side+", 1fr)";



let boxElt = document.getElementsByClassName('box');
console.log(boxElt);


function changeOpacity(elt) {
    opa = parseFloat(elt.style.opacity)+0.1;
    if (opa <= 1) {
        elt.style.opacity = opa.toString();
    }
    console.log(boxElt);
}


for (let i of boxElt) {
    i.addEventListener('mouseover', function() {
        changeOpacity(i)
    })
}