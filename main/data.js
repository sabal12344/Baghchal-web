

export let goatleft =20;

export function decreGoatleft(){
    goatleft--;
}

export let tigerTurn = false;

export function switchTurn(){
    tigerTurn = !tigerTurn;
}

export function piece(name,emoji){
    return {name,emoji};

}

function space(piece,closed,row,col){
    return  {piece,closed,row,col};
}

function row(n){
    const rows=[];

    for(let i=0;i<5;i++){
        let closed = false;
        let mypiece=null;

        if((i+n)%2==1)
            closed=true;

        if((n==0||n==4)&&(i==0||i==4)){
            mypiece = piece("tiger","🐯");
            
        }

        rows.push(space(mypiece,closed,n,i));



        




    }
    return rows;
}



 function starttBoard(){
    const board=[];
    for(let i=0; i<5;i++){
        board.push(row(i));
    }
    return board;
}

export const startBoard = starttBoard();




