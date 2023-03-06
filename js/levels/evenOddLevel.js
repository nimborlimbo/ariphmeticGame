class EvenOddLevel extends Level {
    #rulesList = ['Четное', 'Нечетное']; #ruleId = 0;
    #maxScore = levelsInfoArr.evenOdd.score; #score = 0; 
    #maxAttempts = 5; #attempts = 0;
    #targetsCount = 12; #targetsArr = [];
    #gameArea; #header; #bottomMenu; #ruleElement; #resultsContainer;
    #player; #timer = new Timer(levelsInfoArr.evenOdd.time);

    constructor(player) {
        super();
        this.#player = player;
    }

    start() {
        this.#createHeader(levelsInfoArr.evenOdd.name, this.#timer);
        this.#createBottomMenu(this.#player.name);
        this.#createGameArea();
        this.#changeRule();
        setTimeout(() => {
            this.#createTargets();
        }, 2500);
        setTimeout(() => {
            this.#timer.work(this.#finish);
        }, 2800);
    }

    #finish = () => {
        this.#player.addPoints(this.#score);
        this.#timer.stop();
        document.querySelector('main').insertAdjacentElement('beforeend', this.#createFinishModal());
        for (let i = 0; i < this.#targetsArr.length; i++) {
            this.#targetsArr[i].deactivate();
        }
    }

    #createFinishModal() {
        return super.createFinishModal(levelsInfoArr.evenOdd.name, this.#score, this.#player.score, () => {
            this.clearLevel();
            game.nextLevel();
        });
    }

    #createTargets() {
        for (let i = 0; i < this.#targetsCount; i++) {
            if (i < this.#maxAttempts)
                this.#targetsArr.push(new EvenOddTarget(this.#gameArea, this.#ruleId, this.#maxScore / this.#maxAttempts));
            else 
                this.#targetsArr.push(new EvenOddTarget(this.#gameArea, Math.abs(this.#ruleId - 1), 0));
            this.#targetsArr[i].element.addEventListener('click', () => {
                this.#targetClick(this.#targetsArr[i]);
            });
        }
    }

    #targetClick(target) {
        this.#score += target.score;
        this.#attempts++;
        target.activate(this.#ruleId, this.#resultsContainer);
        if (this.#attempts >= this.#maxAttempts) 
            this.#finish();
    }       

    #createBottomMenu(name) {
        this.#bottomMenu = super.createBottomMenu(name);
        this.#bottomMenu.style.flexDirection = 'column';
        this.#bottomMenu.style.alignItems = 'center';
        let resultsContainer = document.createElement('div');
        resultsContainer.className = "even-odd-results-container";
        this.#bottomMenu.insertAdjacentElement('afterbegin', resultsContainer);   
        main.insertAdjacentElement('beforeend', this.#bottomMenu);
        this.#resultsContainer = resultsContainer;
    }

    #createHeader(levelName) {
        this.#header = super.createHeader(levelName, this.#timer);
        this.#ruleElement = this.#createRuleElement();
        this.#header.insertAdjacentElement('beforeend', this.#ruleElement);
        main.insertAdjacentElement('beforeend', this.#header);
    }

    #createGameArea() {
        this.#gameArea = super.createGameArea();
        this.#header.insertAdjacentElement('afterend', this.#gameArea);
    }

    #createRuleElement() {
        let ruleElement = super.createRule();
        ruleElement.classList.add('level-rule-change');
        ruleElement.innerText = "-";
        return ruleElement;
    }

    #changeRule() {
        this.#ruleId = parseInt(Math.random() * 2);
        let index = 0;
        let start = performance.now();
        let changeAnimation = () => {
            this.#ruleElement.innerText = this.#rulesList[index];
            index++;
            if (index >= this.#rulesList.length) 
                index = 0;

            if (performance.now() - start < 2000 
                || this.#ruleElement.innerText != this.#rulesList[this.#ruleId]) {
                    setTimeout(() => {
                        changeAnimation();
                    }, 10);
            } else {
                setTimeout(() => {
                    this.#ruleElement.classList.remove('level-rule-change');
                }, 100);
            }
        }
        changeAnimation();
    }
}

class EvenOddTarget {
    #x; #y;
    #x2; #y2;
    #speed = 10;
    #sizeElement;
    #score;
    #value;
    #element;
    #container; #containerWidth; #containerHeight;
    #moveTimeout;
    #ruleId;
    #condition = true;
    constructor(container, ruleId, score) {
        this.#container = container;
        this.#ruleId = ruleId;
        this.#score = score;
        this.#setValue();
        this.#element = this.#createTargetElement();
        this.#container.insertAdjacentElement('beforeend', this.#element);
        this.#sizeElement = this.#element.getBoundingClientRect().width;
        this.#containerWidth = this.#container.getBoundingClientRect().width;
        this.#containerHeight = this.#container.getBoundingClientRect().height;
        this.#x = parseInt(Math.random() * (this.#containerWidth - this.#sizeElement));
        this.#y = parseInt(Math.random() * (this.#containerHeight - this.#sizeElement));
        this.#setPositionTargetElement();
        setTimeout(() => this.#move(), 0);
    }

    get value() {
        return this.#value;
    }

    get score() {
        return this.#score;
    }

    get element() {
        return this.#element;
    }

    deactivate() {
        if (this.#condition == true) this.#element.remove();
    }

    activate(ruleId, container) {
        this.#condition = (this.#condition) ? true : false;
        if (this.#ruleId == ruleId) 
            this.#element.classList.add('input-success');
        else
            this.#element.classList.add('input-error');
        console.log(ruleId + " " + this.#ruleId);
        this.#element.style.opacity = 0;
        setTimeout(() => {
            this.#element.style.opacity = 1;
            this.#element.style.position = "static";
            this.#element.style.transform = "";
            this.#element.remove();
            container.insertAdjacentElement('beforeend', this.#element);
            clearTimeout(this.#moveTimeout);
        }, 200);
    }

    async #move() {
        this.#setArrivalPoint();
        let time = this.#calcTimeMovement();
        this.#x = this.#x2;
        this.#y = this.#y2;
        this.#element.style.transition = "transform linear " + time + "ms, opacity linear 200ms";
        this.#setPositionTargetElement();
        if (this.#condition == true) 
            this.#moveTimeout = setTimeout(() => this.#move(), time);
    }

    #setValue() {
        this.#value = parseInt(Math.random() * 99) + 1;
        if (this.#value % 2 != this.#ruleId) {
            this.#value = (this.#value < 99) ? this.#value + 1 : this.#value - 1;
        }
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

    #createTargetElement() {
        let targetElement = document.createElement('div');
        targetElement.className = "even-odd-target";
        targetElement.innerText = this.#value;
        return targetElement;
    }

    #setPositionTargetElement() {
        this.#element.style.transform = "translate(" + this.#x +  "px, " + this.#y + "px)";
    }
}