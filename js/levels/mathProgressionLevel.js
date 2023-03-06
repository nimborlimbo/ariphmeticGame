const ProgressionRules = {
    GEOMETRIC: 'Геометрическая прогрессия',
    ARIPHMETIC: 'Арифметическая прогрессия'
};

class MathProgressionLevel extends Level {
    #player;
    #bottomMenu; #header; #gameArea;
    #timer = new Timer(levelsInfoArr.mathProgression.time);

    // Свойства прогрессий
    #maxGeometricStep = 5; #maxAriphmeticStep = 50;
    #maxGeometricStart = 8; #maxAriphmeticStart = 100;

    #itemsCount = 4; //Количество элементво прогессии
    #progressionsCount = 2;
    #maxScore = levelsInfoArr.mathProgression.score;
    #score = 0;
    #progressionArr = [];
    #ariphmeticProgressionArr = [];
    #geometricProgressionArr = [];

    constructor(player) {
        super();
        this.#player = player;
    }

    start() {
        this.#createHeader(levelsInfoArr.mathProgression.name, this.#timer);
        this.#createBottomMenu(this.#player.name);
        this.#createGameArea();
        this.#timer.work(this.#finish);
    }

    #finish = () => {
        for (let i = 0; i < this.#progressionArr.length; i++) {
            if (this.#progressionArr[i].condition)
                this.#score = this.#score += this.#maxScore / (this.#progressionsCount * 2);
        }
        this.#player.addPoints(this.#score);
        this.#timer.stop();
        document.querySelector('main').insertAdjacentElement('beforeend', this.#createFinishModal());
    }

    #createFinishModal() {
        return super.createFinishModal(levelsInfoArr.mathProgression.name, this.#score, this.#player.score, () => {
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

        let container = document.createElement('div');
        container.className = "math-progression";

        container.insertAdjacentElement('beforeend', this.#createProgressionColumn(ProgressionRules.ARIPHMETIC));
        container.insertAdjacentElement('beforeend', this.#createProgressionColumn(ProgressionRules.GEOMETRIC));

        this.#gameArea.insertAdjacentElement('beforeend', container);

        this.#header.insertAdjacentElement('afterend', this.#gameArea);
    }

    #createProgressionColumn = (rule) => {
        let column = document.createElement('div');
        column.className = "math-progression-column";
        let title = document.createElement('h2');
        title.className = "math-progression-name";
        title.textContent = rule;
        column.insertAdjacentElement('beforeend', title);
        let maxStart;
        let maxStep;
        let arr;
        if (rule == ProgressionRules.ARIPHMETIC) {
            maxStart = this.#maxAriphmeticStart;
            maxStep = this.#maxAriphmeticStep;
            arr = this.#ariphmeticProgressionArr;
        } else if (rule == ProgressionRules.GEOMETRIC) {
            maxStart = this.#maxGeometricStart;
            maxStep = this.#maxGeometricStep;
            arr = this.#geometricProgressionArr;
        }

        for (let i = 0; i < this.#progressionsCount; i++) {
            let start = Math.round((Math.random()+1) * (maxStart-2));
            let step = Math.round((Math.random()+1) * (maxStep-2));
            if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (step == arr[i].step) {
                        step++;
                    }
                }
            }
            let item = new MathProgressionItem(start, step, this.#itemsCount, rule);
            let itemElement = item.createElement();
            arr.push(item);
            this.#progressionArr.push(item);
            item.input.addEventListener('change', () => {
                this.#inputCallback(item, itemElement, rule);
            });
            column.insertAdjacentElement('beforeend', itemElement);
        }
        return column;
    }

    #inputCallback(item, element, rule) {
        let input = item.input;
        console.log(input);
        let step;
        if (rule == ProgressionRules.ARIPHMETIC)
            if (item.inputPosition != 0)
                step = parseInt(input.value) - item.progressionArr[item.inputPosition - 1];
            else 
                step = item.progressionArr[item.inputPosition + 1] - parseInt(input.value);
        else if (rule == ProgressionRules.GEOMETRIC) 
            if (item.inputPosition != 0)
                step = parseInt(input.value) / item.progressionArr[item.inputPosition - 1];
            else
                step =  item.progressionArr[item.inputPosition + 1] / parseInt(input.value);

        if (step == item.step) {
            element.classList.add('input-success');
            element.classList.remove('input-error');
            item.condition = true;
        } else {
            element.classList.add('input-error');
            element.classList.remove('input-success');
            item.condition = false; 
        }
        let finish = true;
        for (let i = 0; i < this.#progressionArr.length; i++) {
            if (this.#progressionArr[i].condition == false) finish = false; 
        }

        if (finish) this.#finish();
    }
}

class MathProgressionItem {
    #progressionArr = [];
    #start; #step;
    #input; #inputPosition;
    #rule;
    #itemsCount;
    condition = false;

    constructor(start, step, itemsCount, rule) {
        this.#start = start;
        this.#step = step;
        this.#rule = rule;
        this.#itemsCount = itemsCount;
        let currentItem = this.#start;
        if (rule == ProgressionRules.ARIPHMETIC) {
            for (let i = 0; i < itemsCount; i++) {
                this.#progressionArr.push(currentItem);
                currentItem += this.#step;
            }
        } else if (rule == ProgressionRules.GEOMETRIC) {
            for (let i = 0; i < itemsCount; i++) {
                this.#progressionArr.push(currentItem);
                currentItem *= this.#step;
            }
        }
    }

    get progressionArr() {
        return this.#progressionArr;
    }

    get input() {
        return this.#input;
    }

    get step() {
        return this.#step;
    }

    get rule() {
        return this.#rule;
    }
    
    get inputPosition() {
        return this.#inputPosition;
    }

    createElement() {
        let element = document.createElement('div');
        console.log(this.#itemsCount);
        this.#inputPosition = Math.round(Math.random() * (this.#itemsCount - 1));
        element.className = "math-progression-item";
        this.#input = document.createElement('input');
        this.#input.type = 'number';
        this.#input.placeholder = "0";
        for (let i = 0; i < this.#progressionArr.length; i++) {
            let num = document.createElement('span');
            if (i == this.#inputPosition) 
                num.insertAdjacentElement('beforeend', this.#input);
            else
                num.textContent = this.#progressionArr[i];
            element.insertAdjacentElement('beforeend', num);
            if (i < this.#progressionArr.length-1) 
                element.append('•');
        }
        
        return element;
    }
}