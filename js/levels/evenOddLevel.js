class EvenOddLevel extends Level {
    #rulesList = ['Четное', 'Нечетное']; #ruleId = 0;
    #maxScore = 10; #score = 0; 
    #maxAttempts = 5; #attempts = 0;
    #targetsCount = 12; #targetsArr = [];
    #gameArea; #header; #bottomMenu; #ruleElement;
    #player; #timer = new Timer(60);

    constructor(player) {
        super();
        this.#player = player;
    }

    start() {
        this.#createHeader('Четное / Нечетное', 60);
        this.#createBottomMenu(this.#player.name);
        this.#createGameArea();
        this.#changeRule();
        setTimeout(() => {
            this.#createTargets();
        }, 2500);
        setTimeout(() => {
            this.#timer.work();
        }, 2800);
    }

    #createTargets() {
        for (let i = 0; i < this.#targetsCount; i++) {
            if (i < this.#maxAttempts)
                this.#targetsArr.push(new EvenOddTarget(this.#gameArea, this.#ruleId));
            else 
                this.#targetsArr.push(new EvenOddTarget(this.#gameArea, Math.abs(this.#ruleId - 1)));
            if (this.#targetsArr[i].value % 2 == this.#ruleId)
                this.#targetsArr[i].element.addEventListener('click', () => {

                });
        }
    }

    #createBottomMenu(name) {
        this.#bottomMenu = super.createBottomMenu(name);
        main.insertAdjacentElement('beforeend', this.#bottomMenu);
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
    #stepX; #stepY;
    #sizeElement;
    #score = 2;
    #value;
    #element;
    #container; #containerWidth; #containerHeight;
    #condition = true;
    constructor(container, ruleId) {
        this.#container = container;
        this.#value = parseInt(Math.random() * 100);
        if (this.#value % 2 != ruleId) {
            this.#value = (this.#value < 99) ? this.#value + 1 : this.#value - 1;
        }

        this.#element = this.#createTargetElement();
        this.#container.insertAdjacentElement('beforeend', this.#element);
        this.#sizeElement = this.#element.getBoundingClientRect().width;
        this.#containerWidth = this.#container.getBoundingClientRect().width;
        this.#containerHeight = this.#container.getBoundingClientRect().height;
        this.#x = parseInt(Math.random() * (this.#containerWidth - this.#sizeElement));
        this.#y = parseInt(Math.random() * (this.#containerHeight - this.#sizeElement));
        this.#setPositionTargetElement();
        setTimeout(() => {
            this.#element.style.transitionDuration = "2000ms";
        }, 0);
        this.#move();
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

    #move() {
        // while(this.#condition) {

        // }
    }

    #setDirection() {
        
    }

    #calcMovement() {

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