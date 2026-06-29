
import {startBoard,tigerTurn,switchTurn,goatleft,piece, decreGoatleft} from "./data.js";
import{possibleSpaces,makeTigerMove} from "./logic.js";
const flatboard = startBoard.flat();
let firstclick = true;

 let sourceSpace;


const board = document.getElementById('board1');
board.addEventListener('click',(e)=>{
    if(e.target==board){
        clearHighlight();
    }
});

for(let i=0;i<25;i++){
    const space = document.createElement('div');
    space.className='space';
    space.id = i;
    board.appendChild(space);
    
    const content = flatboard[i].piece;

    if(content){
        space.innerHTML=content.emoji;
        

    }

    space.addEventListener('click',()=> spaceClicked(space));

}


function clearHighlight(){
    const all = document.getElementsByClassName('space');
     for(let i of all){
        i.style.border="none";
        i.style.background="black";
    }
}

function spaceClicked(space){
    

   clearHighlight();
   
      if (space.innerHTML == '') {
        if(goatleft>0 && !tigerTurn){
            space.innerHTML='🐐';
            flatboard[parseInt(space.id)].piece = piece("goat","🐐");
            switchTurn();
            decreGoatleft();
        }
        return; 
    }

   


  if(firstclick){

    space.style.border = '10px solid red';
    highlightMoves(parseInt(space.id));
    sourceSpace = space;
    firstclick = false;
    
}

    else {
        if(sourceSpace.id==space.id){
            firstclick = true;
            return;
        }
        makeTigerMove(parseInt(sourceSpace.id),parseInt(space.id));
        firstclick=true;
    }
    
    
}

function highlightMoves(indd){
    const row = Math.floor(indd/5);
    const col = indd % 5;

    const targets = possibleSpaces(row,col);
    console.log(targets);
    for(const i of targets){
        const flatIndex = i.row * 5 + i.col;
        
        const MySpace = document.getElementById(flatIndex);
        MySpace.style.background="green";

    }
    

    
}

export function emptySpace(spaceid){
    document.getElementById(spaceid).innerHTML='';

}
export function insertPiece(spaceid,emoji){
    document.getElementById(spaceid).innerHTML=emoji;

}


