
import {startBoard,tigerTurn,switchTurn,piece} from "./data.js";
import{emptySpace,insertPiece} from "./ui.js";


const flatBoard = startBoard.flat();


export function possibleSpaces(row,col){
    const current = startBoard[row][col];
    if(!current.piece)
        return [];

    if(current.piece.name==="tiger" && tigerTurn)
        return  tigerPossibleSpaces(row,col);

    if(current.piece.name==="goat" && !tigerTurn)
        return goatPossibleSpaces(row,col);

   
        return [];

}



function isInside(n){
    return n<=4 && n>=0;
}




function tigerPossibleSpaces(row,col){
    const possible = goatPossibleSpaces(row,col);
    const current = startBoard[row][col];

    for(let i=-1;i<=1;i+=2){

        let target1;
        let target2;

        if(isInside(row+i))
            {
         target1 = startBoard[row+i][col];
    }

        if(isInside(col+i))
            {
         target2 = startBoard[row][col+i];
    }

          if(isInside(row+i) && target1.piece && target1.piece.name==="goat")
   {

    let targett;

    if(isInside(row+i+i)){
    targett = startBoard[row+i+i][col];
}

    if(isInside(row+i+i) && !targett.piece)
        possible.push(targett);

    
   }


   
          if(isInside(col+i) && target2.piece && target2.piece.name==="goat")
   {

    let targett;
    if(isInside(col+i+i)){
     targett = startBoard[row][col+i+i];}

    if(isInside(col+i+i) && !targett.piece)
        possible.push(targett);
   }      
   

    }

     if(current.closed){
        return possible;
    }

    
    for(let i=-1;i<=1;i+=2){

        for(let j=-1; j<=1; j+=2){

            let targetOut;
              
            if(isInside(row+i)&&isInside(col+j))
             targetOut = startBoard[row+i][col+j];


             if(isInside(row+i) && isInside(col+j) && targetOut.piece && targetOut.piece.name==="goat"){
               
                let targetIn;


                if(isInside(row+i+i) && isInside(col+j+j)){
                targetIn = startBoard[row+i+i][col+j+j];
                }

                if(isInside(row+i+i) && isInside(col+j+j) && !targetIn.piece){
                    possible.push(targetIn);
                }

             }
    

        }      

    } 
    return possible;
}






function goatPossibleSpaces(row, col){

    const current = startBoard[row][col];
    const possible = [];

    
   

    for(let i=-1;i<=1;i+=2){


        let target1;
        let target2;


         if(isInside(row+i)){
           target1 = startBoard[row+i][col];
        }


        if(isInside(col+i)){
            target2 = startBoard[row][col+i];
        }

          if(isInside(row+i) && !target1.piece)
    possible.push(target1);

   
  if(isInside(col+i) && !target2.piece)
    possible.push(target2);



    }


    //diagonal part

    if(current.closed){
        return possible;
    }

    
    for(let i=-1;i<=1;i+=2){

        for(let j=-1; j<=1; j+=2){
             if(isInside(row+i) && isInside(col+j) && !startBoard[row+i][col+j].piece)
    possible.push(startBoard[row+i][col+j]);

        }      

    } 
    return possible;
    


}

export function makeTigerMove(sourceid,destid){
       
    const srow = Math.floor(sourceid/5);
    const scol = sourceid % 5;
    const drow = Math.floor(destid/5);
    const dcol = destid % 5;
    



    if(!possibleSpaces(srow,scol).includes(startBoard[drow][dcol]))
        return;


    let capture = false;


    if(Math.abs(srow-drow)>1 || Math.abs(scol-dcol)>1)
        capture = true;



    if(capture){

        if(scol==dcol)
        {
            if(srow<drow){
                startBoard[srow+1][scol].piece=null;
                emptySpace((srow+1)*5+scol);

            }
            else{
                startBoard[srow-1][scol].piece = null;
                emptySpace((srow-1)*5+scol);

            }

        }

        if(srow == drow){
            if(scol<dcol){
                startBoard[srow][scol+1].piece=null;
                
                emptySpace((srow)*5+scol+1)

            }
            else{
                startBoard[srow][scol-1].piece=null;
                emptySpace(srow*5+scol-1)


            }
        }
        startBoard[srow][scol].piece=null;
        emptySpace(srow*5+scol);
        startBoard[drow][dcol].piece = piece("tiger","🐯");
        insertPiece(drow*5+dcol, "🐯");
        switchTurn();

        



    }    


    


}
