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

    knightMoves(start, end){
        let startBox = this.arrToSring(start);
        let endBox = this.arrToSring(end);
    
        // BFS traversal to find the shortest path
        let visited = new Set();
        let queue = [[startBox]];
        
        while (queue.length > 0) {
            let currentPath = queue.shift();
            let currentBox = currentPath[currentPath.length - 1];
            
            if (!visited.has(currentBox)) {
                visited.add(currentBox);
                let movesFromCurrent = this.adList.get(currentBox);
                
                for (let move of movesFromCurrent) {
                    let newPath = [...currentPath, move];
    
                    if (move === endBox) {
                        // Found the shortest path
                        let path = newPath.map(this.stringToArr);
                        console.log(`reached in ${path.length - 1} moves!`);
                        return path;
                    }
                    
                    queue.push(newPath);
                }
            }
        }
        // If no path is found
        return null;
    }
}

let game = new graph;
console.log(game.knightMoves([0, 0], [1, 2]));
console.log(game.knightMoves([0, 0], [3, 3]));
console.log(game.knightMoves([0, 0], [7, 7]));
console.log(game.knightMoves([3, 3], [4, 7]));