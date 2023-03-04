class EvenOddLevel extends Level {
    #timer = new Timer(60);
    #rulesList = ['Четное', 'Нечетное'];
    #rule = '';
    #targetsArr = [];
    #gameArea;
    #header;
    #bottomMenu;
    #player;

    constructor(player) {
        super();
        this.#player = player;
        let targetsCount = 12;
        for (let i = 0; i < targetsCount; i++) {
            this.#targetsArr.push(new EvenOddTarget());
        }
    }

    start() {
        this.#createHeader('Четное / Нечетное', 60);
        this.#createBottomMenu(this.#player.name);
        this.#createGameArea();
    }

    #createBottomMenu(name) {
        this.#bottomMenu = super.createBottomMenu(name);
        main.insertAdjacentElement('beforeend', this.#bottomMenu);
    }

    #createHeader(levelName, time) {
        this.#header = super.createHeader(levelName, time);
        main.insertAdjacentElement('beforeend', this.#header);
    }

    #createGameArea() {
        this.#gameArea = super.createGameArea();
        this.#header.insertAdjacentElement('afterend', this.#gameArea);
    }

    #createRule() {
        let levelRule = super.createRule();
        levelRule.classList.add('level-rule-change');
    }
}

class EvenOddTarget {
    #x; #y;
    #stepX; #stepY;
    #value;
    constructor() {
        this.#value = parseInt(Math.random() * 100);
    }

    get value() {
        return this.#value;
    }
}