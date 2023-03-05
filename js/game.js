class LeaderBoard {
    #playerList = [];
    #head; #leaderBoard;
    #backBtn;

    constructor() {
        if (localStorage.getItem('playerList') != null) 
            this.#playerList.push(...localStorage.getItem('playerList'));
        
        this.#head = this.#createHead();
        this.#leaderBoard = this.#createLeaderBoard();
    }

    addPlayer(player) {
        this.#playerList.push(player);
        this.#sortPlayerList();
        this.#leaderBoard = this.#createLeaderBoard();
        localStorage.setItem('playerList', this.#playerList);
    }

    draw(parent) {
        parent.insertAdjacentElement('beforeend', this.#head);
        parent.insertAdjacentElement('beforeend', this.#leaderBoard);
    }

    #openMainScreen() {
        document.querySelector('main').innerHTML = "";
        new MainScreen().drawScreen(document.querySelector('main'));
    }

    #clear() {
        this.#head.remove();
        this.#leaderBoard.remove();
    }

    #sortPlayerList() {
        this.#playerList = this.#playerList.sort(() => a - b);
    }

    #createLeaderBoard() {
        let leaderBoard = document.createElement('div');
        leaderBoard.className = "leaderboard";

        if (this.#playerList.length > 0) {
            for (let i = 0; i < this.#playerList.length; i++) {
                let row = this.#createRow(i, this.#leaderBoard[i]);
                leaderBoard.insertAdjacentElement('beforeend', row);
            }
        } else {
            let row = this.#createRow(0, new Player('Нет результатов'));
            leaderBoard.insertAdjacentElement('beforeend', row);
        }

        return leaderBoard;
    }

    #createHead() {
        let head = document.createElement('div');
        head.className = "leaderboard-head";

        let backBtn = document.createElement('div');
        backBtn.className = "leaderboard-back";

        let title = document.createElement('h1');
        title.className = "leaderboard-title";
        title.innerHTML = "Таблица рейтингов";

        head.insertAdjacentElement('beforeend', backBtn);
        head.insertAdjacentElement('beforeend', title);

        backBtn.addEventListener('click', this.#openMainScreen);
        return head;
    }

    #createRow(index, player) {
        let row = document.createElement('div');
        row.className = "leaderboard-row";

        let cellId = document.createElement('p');
        cellId.className = "leaderboard-id leaderboard-cell";
        cellId.innerHTML = index;

        let cellName = document.createElement('p');
        cellName.className = "leaderboard-name leaderboard-cell";
        cellName.innerHTML = player.name;

        let cellScore = document.createElement('p');
        cellScore.className = "leaderboard-score leaderboard-cell";
        cellScore.innerHTML = player.score;

        row.insertAdjacentElement('beforeend', cellId);
        row.insertAdjacentElement('beforeend', cellName);
        row.insertAdjacentElement('beforeend', cellScore);

        return row;
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

    constructor(player) {
        this.#player = player;
        this.#levels = [new EvenOddLevel(this.#player)];
    }

    nextLevel() {
        if (this.#levelCurrent >= 0) 
            this.#levels[this.#levelCurrent].clearLevel();
        this.#levelCurrent++;
        let callback = this.#levels[this.#levelCurrent].start();
    }

    gameOver() {

    }

}