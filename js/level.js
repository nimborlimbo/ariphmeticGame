let game;
class Timer {
    constructor(time) {
        this.time = time;
        this.element = document.createElement('p');
        this.element.className = "timer";
        this.element.innerHTML = this.time;
    }

    work(position, parent) {
        this.element.innerHTML = this.time;
        this.time--;
        if (this.time >= 0) setTimeout(() => this.work(position, parent), 1000);
    }
}

class Level {
    gameArea;
    header;
    bottomMenu;
    maxScore;

    constructor() {
        if (this.constructor == Level) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    clearLevel() {
        main.innerHTML = "";
    }

    start() {
        
    }

    finish() {
        
    }

    createGameArea() {
        let margin = 20;
        let header = document.querySelector('.header');
        let bottomMenu = document.querySelector('.btns-wrap');
        let gameAreaHeight = parseInt(bottomMenu.getBoundingClientRect().top) - 
            parseInt(header.getBoundingClientRect().bottom) - margin;
        let gameAreaPositionY = parseInt(header.getBoundingClientRect().bottom) + (margin / 2);
        let gameArea = document.createElement('div');
        gameArea.className = "game-area";
        gameArea.style.height = gameAreaHeight + "px";
        gameArea.style.top = gameAreaPositionY + "px";
        return gameArea;
    }

    createRule(levelRule) {
        let ruleElement = document.createElement('p');
        ruleElement.className = "level-rule";
        ruleElement.innerHTML = levelRule;
        return ruleElement;
    }

    createHeader(levelName, timer) {
        let header = document.createElement('div');
        header.className = "header";
    
        let wrap = document.createElement('div');
    
        let titleElement = document.createElement('p');
        titleElement.className = "level-title";
        titleElement.innerHTML = levelName;
        header.insertAdjacentElement('beforeend', titleElement);
        wrap.insertAdjacentElement('beforeend', timer.element);
        header.insertAdjacentElement('beforeend', wrap);
        
        return header;
    }

    createBottomMenu(name) {
        let bottomMenu = document.createElement('div');
        bottomMenu.className = 'btns-wrap';
        let nameElement = document.createElement('p');
        nameElement.className = "name";
        nameElement.innerHTML = name;
        bottomMenu.insertAdjacentElement('beforeend', nameElement);
        return bottomMenu;
    }
}

