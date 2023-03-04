class LeaderBoard {
    #playerList = [];

    constructor() {
        if (localStorage.getItem('playerList').length > 0) 
            this.#playerList.push(...localStorage.getItem('playerList'));
        
    }

    addPlayer(player) {
        this.#playerList.push(player);
    }

    drawLeaderBoard() {

    }
}

class Player {
    #name;
    #score = 0;
    
    constructor(name) {
        this.#name = name;
        
    }

    get name() {
        return this.#name;
    }

    get score() {
        return this.#score;
    }

    addPoints(pointsCount) {
        this.#score += pointsCount;
    }
}

class Game {
    #player;
    #levels = [];
    #levelCurrent = -1;
    // #leaderBoard = new LeaderBoard();

    constructor(player) {
        this.#player = player;
        this.#levels = [new EvenOddLevel(player)];
    }

    nextLevel() {
        if (this.#levelCurrent >= 0) 
            this.#levels[this.#levelCurrent].clearLevel();
        this.#levelCurrent++;
        this.#levels[this.#levelCurrent].start();
    }

    gameOver() {

    }

}