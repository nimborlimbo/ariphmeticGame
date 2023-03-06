let game;
let leaderBoard;

let levelsInfoArr = 
    {
        'evenOdd': {
            "name": "Четные / Нечетные",
            "desc": "После того, как выпадет случайное условие(четное или нечетное), на экране появятся числа, хаотично движущиеся по экрану. Ваша задача – нажать на те из них, которые удовлетворяют выпавшее условие. Уровень закончится после выбора 5 чисел либо после истечения указанного времени.",
            "time": 60,
            "score": 10
        },
        'mathProgression': {
            "name": "Математические прогрессии",
            "desc": "На экране появятся несколько примеров алгебраической и геометрической прогрессий. Ваша задача – продолжить их. Если прогрессия решена верно, то ее поле станет зеленым, иначе красным. Уровень закончится, если все поля станут зелеными или, если истечет указанное время.",
            "time": 90,
            "score": 20
        },
        'ariphmeticExpression': {
            "name": "Арифметическое выражение",
            "desc": "На экране появится число. Ваша задача – собрать из символов, которые будут указаны внизу экрана, выражение, равно выпавшему числу. Чем больше символов Вы выберите правильно, тем больше балов получите. Уровень закончится после истечения указанного времени, либо после выбора всех символов правильно.",
            "time": 90,
            "score": 30
        },
        
    };
class Timer {
    #timeout;

    constructor(time) {
        this.time = time;
        this.element = document.createElement('p');
        this.element.className = "timer";
        this.element.innerHTML = this.time;
    }

    work(func) {
        this.element.innerHTML = this.time;
        this.time--;
        if (this.time >= 0) this.#timeout = setTimeout(() => this.work(func), 1000);
        else func();
    }

    stop() {
        clearTimeout(this.#timeout);
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

    createTimer(time) {
        this.time = time;
        this.element = document.createElement('p');
        this.element.className = "timer";
        this.element.innerHTML = this.time;
    }

    createFinishModal(title, scoreLevel, scorePlayer, func) {
        let finishModal = document.createElement('div');
        finishModal.className = "finish-modal";

        let titleElement = document.createElement('h2');
        titleElement.className = "finish-modal-title";
        titleElement.innerText = title;

        let scorePlayerElement = document.createElement('p');
        scorePlayerElement.className = "finish-modal-score";
        scorePlayerElement.innerText = "Всего балов: " + scorePlayer;

        let scoreLevelElement = document.createElement('p');
        scoreLevelElement.className = "finish-modal-score";
        scoreLevelElement.innerText = "Балов за уровень: " + scoreLevel;

        let btnElement = document.createElement('div');
        btnElement.className = "finish-modal-btn";

        let bgElement = document.createElement('div');
        bgElement.className = "finish-modal-bg";

        let finishModalBlock = document.createElement('div');
        finishModalBlock.className = "finish-modal-block";

        finishModalBlock.insertAdjacentElement('beforeend', titleElement);
        finishModalBlock.insertAdjacentElement('beforeend', scorePlayerElement);
        finishModalBlock.insertAdjacentElement('beforeend', scoreLevelElement);
        finishModalBlock.insertAdjacentElement('beforeend', btnElement);
        
        finishModal.insertAdjacentElement('beforeend', finishModalBlock);
        finishModal.insertAdjacentElement('beforeend', bgElement);
        
        btnElement.addEventListener('click', () => {
            func();
        });

        return finishModal;
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

