

let goatLeft =20;


function piece(name,emoji){
    return {name,emoji};

}

function space(piece,closed){
    return  {piece,closed};
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

        rows.push(space(mypiece,closed));



        




    }
    return rows;
}



export function startBoard(){
    const board=[];
    for(let i=0; i<5;i++){
        board.push(row(i));
    }
    return board;
}





