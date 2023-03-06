// Информация о выражениях
// expression – само выражение(без пробелов)
// result – результат данного выражения
// hiddenElements – идентификаторы скрытых символов выражения(отчет с нуля)
let expressions = [
    {
        'expression': '2+4/(5*4)',
        'result': 20,
        'hiddenElements': [ 1, 3, 5, 6 ]
    },
    {
        'expression': '9+3*4/7',
        'result': 35,
        'hiddenElements': [ 2, 3, 5, 6 ]
    },
];


class AriphmeticExpressionLevel extends Level {
    #player;
    #bottomMenu; #header; #gameArea;
    #timer = new Timer(levelsInfoArr.ariphmeticExpression.time);
    #keyboardArr = []; #keyboardValuesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '(', ')', '+', '-', '/', '*'];
    #keyboardElement;
    #expression;
    #score = 0; #maxScore = levelsInfoArr.ariphmeticExpression.score;
    #container;

    constructor(player) {
        super();
        this.#player = player;
    }

    start() {
        this.#createHeader(levelsInfoArr.ariphmeticExpression.name);
        this.#createBottomMenu(this.#player.name);
        this.#createGameArea();
        this.#timer.work(this.#finish);
    }

    #finish = () => {
        this.#player.addPoints(Math.round(this.#score));
        this.#timer.stop();
        document.querySelector('main').insertAdjacentElement('beforeend', this.#createFinishModal());
    }

    #createFinishModal() {
        return super.createFinishModal(levelsInfoArr.ariphmeticExpression.name, Math.round(this.#score), this.#player.score, () => {
            this.clearLevel();
            game.nextLevel();
        });
    }

    #createBottomMenu(name) {
        this.#bottomMenu = super.createBottomMenu(name);
        main.insertAdjacentElement('beforeend', this.#bottomMenu);
    }

    #createHeader(levelName) {
        this.#header = super.createHeader(levelName, this.#timer);
        main.insertAdjacentElement('beforeend', this.#header);
    }

    #createGameArea() {
        this.#gameArea = super.createGameArea();

        this.#container = document.createElement('div');
        this.#container.className = "ariphmetic-expression";
        this.#gameArea.insertAdjacentElement('beforeend', this.#container);
        this.#header.insertAdjacentElement('afterend', this.#gameArea);
        let idExpression = Math.round(Math.random() * (expressions.length-1));
        this.#expression = new AriphmeticExpression(expressions[idExpression].expression, expressions[idExpression].result, expressions[idExpression].hiddenElements);
        this.#container.insertAdjacentElement('beforeend', this.#expression.element);
        this.#createKeyboard();
        this.#gameArea.insertAdjacentElement('beforeend', this.#keyboardElement);
    }

    #createKeyboard = () => {
        this.#keyboardElement = document.createElement('div');
        this.#keyboardElement.className = "ariphmetic-expression-keyboard";
        for (let i = 0; i < this.#keyboardValuesArr.length; i++) {
            let key = new AriphmeticExpressionKey(this.#keyboardValuesArr[i], this.#gameArea);
            key.element.addEventListener('click', () => {
                this.#keyClick(key);
            });
            this.#keyboardArr.push(key);
        }
        let resetKey = document.createElement('div');
        resetKey.className = "ariphmetic-expression-key ariphmetic-expression-key-reset";
        resetKey.innerText = "Сброс";
        resetKey.addEventListener('click', () => {
            this.#resetKeyClick();
        });
        this.#keyboardElement.insertAdjacentElement('beforeend', resetKey);

        let checkKey = document.createElement('div');
        checkKey.className = "ariphmetic-expression-key ariphmetic-expression-key-check";
        checkKey.innerText = "Проверить";
        checkKey.addEventListener('click', () => {
            this.#finish();
        });
        this.#keyboardElement.insertAdjacentElement('beforeend', checkKey);
    }

    #keyClick(keyElement) {
        console.log(keyElement.value + " = " + this.#expression.hiddenValuesArr[this.#expression.hiddenElementCurrent]);
        if (this.#expression.hiddenElementCurrent < this.#expression.hiddenElementsArray.length) {
            if (keyElement.value == this.#expression.hiddenValuesArr[this.#expression.hiddenElementCurrent]) {
                    this.#score += this.#maxScore / this.#expression.hiddenElementsArray.length;
                    if (this.#score > this.#maxScore) this.#score = this.#maxScore;
                }
            keyElement.activate(this.#expression.hiddenElementsArray[this.#expression.hiddenElementCurrent]);
            this.#expression.hiddenElementCurrentUp();
        }
        console.log(this.#score);
    }

    #resetKeyClick() {
        for (let i = 0; i < this.#expression.hiddenElementsArray.length; i++) {
            this.#expression.hiddenElementsArray[i].innerText = "_";
        }
        this.#expression.hiddenElementCurrentReset();
        this.#score = 0;
        for (let i = 0; i < this.#keyboardArr.length; i++) {
            if (this.#keyboardArr[i].activeCondition == true) {
                this.#keyboardArr[i].deactivate();
            }
        }
    }
}

class AriphmeticExpressionKey {
    #value; #element;
    #activeCondition = false;
    #moveTimeout;
    #x; #y; #x2; #y2;
    #container; #sizeElement;
    #containerWidth; #containerHeight;
    #speed = 4;

    constructor(value, container) {
        this.#container = container;
        this.#value = value;
        this.#element = document.createElement('div');
        this.#element.className = "ariphmetic-expression-key";
        this.#element.innerText = this.#value;
        this.#container.insertAdjacentElement('beforeend', this.#element);
        this.#sizeElement = this.#element.getBoundingClientRect().width;
        this.#containerWidth = this.#container.getBoundingClientRect().width;
        this.#containerHeight = this.#container.getBoundingClientRect().height;
        this.#x = parseInt(Math.random() * (this.#containerWidth - this.#sizeElement));
        this.#y = parseInt(Math.random() * (this.#containerHeight - this.#sizeElement));
        this.#setPositionTargetElement();
        setTimeout(() => {
            this.#move();
        }, 0);
    }

    get element() {
        return this.#element;
    }

    get value() {
        return this.#value;
    }

    get activeCondition() {
        return this.#activeCondition;
    }

    deactivate() {
        this.#activeCondition = false;
        this.#element.style.opacity = 1;
        this.#element.style.zIndex = 1;
    }

    activate(container) {
        this.#activeCondition = true;
        this.#element.style.opacity = 0;
        this.#element.style.zIndex = -1;
        container.innerText = this.#value;
    }

    async #move() {
        this.#setArrivalPoint();
        let time = this.#calcTimeMovement();
        this.#x = this.#x2;
        this.#y = this.#y2;
        this.#element.style.transition = "transform linear " + time + "ms, opacity linear 200ms";
        this.#setPositionTargetElement();
        if (this.#activeCondition == false) 
            this.#moveTimeout = setTimeout(() => this.#move(), time);
    }

    #setArrivalPoint() {
        let xRandom = parseInt(Math.round(Math.random() * (this.#containerWidth - this.#sizeElement)));
        let yRandom = parseInt(Math.round(Math.random() * (this.#containerHeight - this.#sizeElement)));

        

        let randomDirection = parseInt(Math.round(Math.random()));

        if (this.#x == 0 || this.#x == this.#containerWidth - this.#sizeElement) {
            this.#x2 = xRandom;
            this.#y2 = (parseInt(Math.round(Math.random())) == 1) ? this.#containerHeight - this.#sizeElement : 0;
        } else if (this.#y == 0 || this.#y == this.#containerHeight - this.#sizeElement) {
            this.#y2 = yRandom;
            this.#x2 = (parseInt(Math.round(Math.random())) == 1) ? this.#containerWidth - this.#sizeElement : 0;
        }
        else if (randomDirection == 0) {
            this.#x2 = (parseInt(Math.round(Math.random())) == 1) ? this.#containerWidth - this.#sizeElement : 0;
            this.#y2 = yRandom;
        } else {
            this.#y2 = (parseInt(Math.round(Math.random())) == 1) ? this.#containerHeight - this.#sizeElement : 0;
            this.#x2 = xRandom;
        }
    }

    #calcTimeMovement() {
        this.#setArrivalPoint();
        let x1, x2, y1, y2;
        if (this.#x < this.#x2) {
            x1 = this.#x;
            x2 = this.#x2;
        } else {
            x1 = this.#x2;
            x2 = this.#x;
        }

        if (this.#y < this.#y2) {
            y1 = this.#y;
            y2 = this.#y2
        } else {
            y1 = this.#y2;
            y2 = this.#y;
        }
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return Math.round(distance / this.#speed) * 100;
    }

    #setPositionTargetElement() {
        this.#element.style.transform = "translate(" + this.#x +  "px, " + this.#y + "px)";
    }
}

class AriphmeticExpression {
    #expression; #result;
    #element; #hiddenElements = []; #hiddenValuesArr = [];
    #hiddenElementsArray = [];
    #hiddenElementCurrent = 0;

    constructor(expression, result, hiddenElementsArray) {
        this.#expression = expression;
        this.#result = result;
        this.#hiddenElements = hiddenElementsArray;
        this.createElement();
    }

    get element() {
        return this.#element;
    }

    get hiddenElementsArray() {
        return this.#hiddenElementsArray;
    }

    get hiddenElements() {
        return this.#hiddenElements;
    }

    get hiddenElementCurrent() {
        return this.#hiddenElementCurrent;
    }

    get hiddenValuesArr() {
        return this.#hiddenValuesArr;
    }

    hiddenElementCurrentReset() {
        this.#hiddenElementCurrent = 0;
    }

    hiddenElementCurrentUp() {
        this.#hiddenElementCurrent++;
    }

    createElement() {
        this.#element = document.createElement('div');
        this.#element.className = "ariphmetic-expression-expression";
        for (let i = 0; i < this.#expression.length; i++) {
            let symbol = document.createElement('span');
            
            if (this.#hiddenElements.indexOf(i) >= 0) {
                symbol.innerText = '_';
                this.#hiddenElementsArray.push(symbol);
                this.#hiddenValuesArr.push(this.#expression[i]);
            } else {
                symbol.innerText = this.#expression[i];
            }
            this.#element.insertAdjacentElement('beforeend', symbol);
        }
        let result = document.createElement('span');
        result.innerText = " = " + this.#result;
        this.#element.insertAdjacentElement('beforeend', result);
    }
}