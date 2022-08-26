//#############################################################
/*                        CODE OK                            */  
//#############################################################

//#########################
/*        FONCTION       */
//#########################

/* Affiche la valeur du input range sur la page*/
function displayRangeValue(number) {
    let rangeValues = document.getElementsByClassName('gridSizeValue');
    for (let i of rangeValues) {
        i.innerText = number;
    }
}

/* Initialisation d'une grille */
function initGrid() {
    displayRangeValue(20);
    createGrid(20);
    startListen()
}

/* Création de la grille */
function createGrid(side) {
    let grid = document.createElement('div');
    grid.setAttribute("id", "grid");
    grid.style.backgroundColor = document.getElementById('backgroundColor').value;
    document.getElementById('center').appendChild(grid);
    for (let i = 0; i < side*side; i++) {
        let elt = document.createElement('div');
        elt.classList.add('box');
        elt.classList.add('boxBorder');
        grid.appendChild(elt);
    }
    document.getElementById('grid').style.gridTemplateColumns = "repeat("+side+", 1fr)";
    document.getElementById('grid').style.gridTemplateRows = "repeat("+side+", 1fr)";
}


/* Fonction qui color une boite */

function toColorBox(box) {
    let color = document.getElementById('boxColor').value;
    box.style.backgroundColor = color;
}

function toEraseBox(box) {
    box.style.backgroundColor = "";
}

function toRainbowBox(box) {
    let color =`rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    box.style.backgroundColor = color;
}

function toLighterBox(box) {
    let boxColor = box.style.backgroundColor || document.getElementById('grid').style.backgroundColor;
    boxColor = boxColor.slice(4,boxColor.length-1).split(", ");
    boxColor = boxColor.map(elt => (parseInt(elt) >= 245) ? 255 : parseInt(elt)+10);
    boxColor = "rgb("+ boxColor.join(", ")+ ")";
    box.style.backgroundColor = boxColor;
}

function toDarkerBox(box) {
    let boxColor = box.style.backgroundColor || document.getElementById('grid').style.backgroundColor;
    boxColor = boxColor.slice(4,boxColor.length-1).split(", ");
    boxColor = boxColor.map(elt => (parseInt(elt) <= 10) ? 0 : parseInt(elt)-10);
    boxColor = "rgb("+ boxColor.join(", ")+ ")";
    box.style.backgroundColor = boxColor;
}

/* Fonction qui démarre l'écoute des box*/
function startListen() {
    let allBox = document.getElementsByClassName('box');
    for (let box of allBox) {
        box.addEventListener('mouseover', function() {
            let mode = document.getElementsByClassName('btn-selected')
            if (mode.length === 0) {
                toColorBox(box);
            } else if (document.getElementsByClassName('btn-selected')[0].value === "erase-btn") {
                toEraseBox(box);
            } else if (document.getElementsByClassName('btn-selected')[0].value === "rainbow-btn") {
                toRainbowBox(box);
            } else if (document.getElementsByClassName('btn-selected')[0].value === "darker-btn") {
                toDarkerBox(box);
            } else if (document.getElementsByClassName('btn-selected')[0].value === "lighter-btn") {
                toLighterBox(box)
            }   
        });
    };
}

function activateButton(button) {
    for (let btn of allButtons) {
        if (btn === button){
            btn.classList.toggle('btn-selected')
        } else {
            btn.classList.remove('btn-selected')
        }
    }
}

//###############################
/*        Code Permanent       */
//###############################

/* Lance une grille au démarrage */
initGrid();

/* Listener du input range pour affichage valeur et création grille*/
document.getElementById('gridSize').addEventListener('input', function(event){
    let nb = event.target.value;
    displayRangeValue(nb);
    document.getElementById('grid').remove();
    createGrid(nb);
    startListen();
})

/* Listener du input color */
document.getElementById('backgroundColor').addEventListener('change', function(event) {
    event.stopPropagation();
    document.getElementById('grid').style.backgroundColor = event.target.value;
})

/* Listener des bouttons mode */
let allButtons = document.getElementsByClassName('mode-btn');
for (let button of allButtons) {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        activateButton(button);
    })
}

/* Listener boutton clear */
document.getElementById('clear-btn').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('grid').remove();
    createGrid(document.getElementById('gridSize').value);
    startListen();
})

/* Listener boutton toggle grid line */
document.getElementById('grid-btn').addEventListener('click', function(event) {
    event.stopPropagation();
    let Boxes = document.getElementsByClassName('box');
    for (let box of Boxes) {
        box.classList.toggle('boxBorder');
    }
})

//#############################################################
/*                     CODE EN TEST                          */  
//#############################################################






/*

function changeOpacity(elt) {
    opa = parseFloat(elt.style.opacity)+0.1;
    if (opa <= 1) {
        elt.style.opacity = opa.toString();
    }
    console.log(boxElt);
}



*/