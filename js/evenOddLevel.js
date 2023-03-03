class evenOddLevel extends Level {
    #timer = new Timer(60);
    #rule;
    #targetsArr = [];
    constructor(targetsCount) {
        for (let i = 0; i < targetsCount; i++) {
            this.#targetsArr.push(new evenOddTarget());
        }
    }
}

class evenOddTarget {
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