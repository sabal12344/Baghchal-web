import {startBoard,tigerTurn,switchTurn,goatleft,piece, decreGoatleft,goatkill,killGoat} from "./data.js";
import{possibleSpaces,makeTigerMove, makeGoatMove,isTrapped} from "./logic.js";
const flatboard = startBoard.flat();
let firstclick = true;

let sourceSpace;
 let selectedPiece = null;

const board = document.getElementById('board1');


const svg = document.getElementById("board-svg");

function drawLine(r1,c1,r2,c2){

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", c1*100 + 50);
    line.setAttribute("y1", r1*100 + 50);

    line.setAttribute("x2", c2*100 + 50);
    line.setAttribute("y2", r2*100 + 50);

    line.setAttribute("stroke","black");
    line.setAttribute("stroke-width","4");

    svg.appendChild(line);
}


for(let r=0;r<5;r++){
    for(let c=0;c<4;c++){
        drawLine(r,c,r,c+1);
    }
}

for(let r=0;r<4;r++){
    for(let c=0;c<5;c++){
        drawLine(r,c,r+1,c);
    }
}



drawLine(0,0,1,1);
drawLine(1,1,2,2);
drawLine(2,2,3,3);
drawLine(3,3,4,4);


drawLine(0,4,1,3);
drawLine(1,3,2,2);
drawLine(2,2,3,1);
drawLine(3,1,4,0);


drawLine(0,2,1,1);
drawLine(1,1,2,0);

drawLine(0,2,1,3);
drawLine(1,3,2,4);

drawLine(2,0,3,1);
drawLine(3,1,4,2);

drawLine(2,4,3,3);
drawLine(3,3,4,2);



board.addEventListener('click',(e)=>{
    if(e.target==board){
        clearHighlight();
        firstclick = true;
        sourceSpace = null;
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

    //space.addEventListener('click',()=> spaceClicked(space));
}

const spaceElements = document.getElementsByClassName("space");

function clearHighlight(){
    const all = document.getElementsByClassName('space');
    for(let i of all){
        i.style.border="none";
        i.style.background="black";
    }
}

function spaceClicked(space){

   clearHighlight();

   if (space.innerHTML == '' && firstclick) {
        if(goatleft>0 && !tigerTurn){
            space.innerHTML='🐐';
            flatboard[parseInt(space.id)].piece = piece("goat","🐐");
            switchTurn();
            decreGoatleft();
              updateStats();

              if(isTrapped()){
        alert("The tigers are trapped. Goats wonn");
        window.location.reload();
    }
        }
        return;
    }

    /*if(!tigerTurn && goatleft<=0){
        makeGoatMove();


    }*/


    

    if(firstclick){

        selectedPiece = flatboard[parseInt(space.id)].piece;

        if (selectedPiece.name === "tiger" && !tigerTurn) return;
        if ((selectedPiece.name === "goat" && goatleft>0) || (selectedPiece.name==="goat" && tigerTurn)) return;

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
        


       
        if(selectedPiece.name==="tiger")
        makeTigerMove(parseInt(sourceSpace.id),parseInt(space.id));


        else
            makeGoatMove(parseInt(sourceSpace.id),parseInt(space.id));

        firstclick=true;
    }
}

function highlightMoves(indd){
    const row = Math.floor(indd/5);
    const col = indd % 5;

    const targets = possibleSpaces(row,col);
    

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






const num = document.createElement("p");
const turn = document.createElement("p");
const stats = document.getElementById("stats");
const start = document.getElementById("start");

    stats.appendChild(num);
    stats.appendChild(turn);

start.addEventListener("click",()=>{

    for(const space of spaceElements){
        space.addEventListener('click',()=> spaceClicked(space));
    }
    
    stats.style.display = "flex";
    stats.style.justifyContent = "space-between";
    updateStats();
    start.textContent = "Quit";
    start.addEventListener("click",()=>{
        if(tigerTurn){
            alert("Goats won by resignation");
            
        }
        else{
            alert("Tigers won by resignation");

        }
        window.location.reload();
    })
    


    

})

export function updateStats() {
    
    num.textContent = "Goats killed : " + goatkill;
    
    
    let whose = "";


    if(tigerTurn){
        whose= "Tiger's "
    }
    else{
        whose = "Goat's "
    }


    turn.textContent = whose + "turn";

    
}






