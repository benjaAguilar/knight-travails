class graph{
    constructor(){
        this.adList = new Map();
        this.createGamboard();
        //adds every possible move for each chess box
        this.adList.forEach((value, key) => {
            this.possibleMoves(key);
        });
    }

    arrToSring(arr){
        return `${arr[0]} - ${arr[1]}`;
    }

    stringToArr(string){
        let arr = string.split(' - ');
        arr[0] = parseInt(arr[0]);
        arr[1] = parseInt(arr[1]);
        return arr;
    }

    addNode(coords){
        this.adList.set(coords, []);
    }
    
    addEdge(origin, destination){
        origin = this.arrToSring(origin);
        destination = this.arrToSring(destination);

        this.adList.get(origin).push(destination);
    }

    //creates the gameboard with the pos coords x and y
    createGamboard(){
        let x = 0;
        let y = 0;
        for(let i = 0; i < 64; i++){
            this.addNode(this.arrToSring([y, x]));
            if(x === 7){
                y++;
                x = 0;
            }else{
                x++;
            }
        }
    }

    possibleMoves(origin){
        origin = this.stringToArr(origin);
        let y = origin[0];
        let x = origin[1];

        //down left moves
        if(y - 1 >= 0 && x - 2 >= 0) this.addEdge(origin, [y - 1, x - 2]);
        if(y - 2 >= 0 && x - 1 >= 0) this.addEdge(origin, [y - 2, x - 1]);

        //down right moves
        if(y - 1 >= 0 && x + 2 <= 7) this.addEdge(origin, [y - 1, x + 2]);
        if(y - 2 >= 0 && x + 1 <= 7) this.addEdge(origin, [y - 2, x + 1]);

        //up left moves
        if(y + 1 <= 7 && x - 2 >= 0) this.addEdge(origin, [y + 1, x - 2]);
        if(y + 2 <= 7 && x - 1 >= 0) this.addEdge(origin, [y + 2, x - 1]);

        //up right moves
        if(y + 2 <= 7 && x + 1 <= 7) this.addEdge(origin, [y + 2, x + 1]);
        if(y + 1 <= 7 && x + 2 <= 7) this.addEdge(origin, [y + 1, x + 2]);
    }
}
let game = new graph;
console.log(game);
console.log(game.adList.get('0 - 4'));