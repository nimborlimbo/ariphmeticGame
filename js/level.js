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
    #gameArea;
    #header;
    #bottomMenu;

    constructor(player, levelName, time, levelRule = null) {
        this.#header = this.createHeader(levelName, time, levelRule)
        player.name
    }

    createHeader(levelName, time, levelRule = null) {
        let header = document.createElement('div');
        header.className = "header";
    
        let wrap = document.createElement('div');
    
        let titleElement = document.createElement('p');
        titleElement.className = "level-title";
        titleElement.innerHTML = levelName;
        header.insertAdjacentElement('beforeend', titleElement);
    
        let timer = new Timer(time);
        wrap.insertAdjacentElement('beforeend', timer.element);
        timer.work();
    
        if (levelRule != null) {
            let ruleElement = document.createElement('p');
            ruleElement.className = "level-rule";
            ruleElement.innerHTML = levelRule;
            wrap.insertAdjacentElement('beforeend', ruleElement);
        }
    
        header.insertAdjacentElement('beforeend', wrap);
    
        return header;
    }

    createBottomMenu(name) {
        let nameElement = document.createElement('p');
        nameElement.className = "name";
        nameElement.innerHTML = name;
    }
}

