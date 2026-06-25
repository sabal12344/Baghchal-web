
import {startBoard} from "./data.js";
const flatboard = startBoard().flat();

const board = document.getElementById('board1');
board.addEventListener('click',(e)=>{
    if(e.target==board){
        clearHighlight();
    }
});

for(let i=0;i<25;i++){
    const space = document.createElement('div');
    space.className='space';
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
    }
}

function spaceClicked(space){
    

   clearHighlight();
   
    if(space.innerHTML !=''){
        space.style.border='7px solid black';
        return;

    }
    space.style.border='2px solid black';
    
}

