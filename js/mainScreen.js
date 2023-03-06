"use strict";

class MainScreen {
    #screen; #bottomMenu;

    constructor() {
        this.#screen = document.createElement('div');
        this.#screen.className = "main-screen";
        leaderBoard = new LeaderBoard();

        let countLevels = document.createElement('h1');
        countLevels.insertAdjacentHTML('beforeend', "Количество уровней: <span>" + Object.keys(levelsInfoArr).length + "</span>");

        this.#screen.insertAdjacentElement('beforeend', countLevels);
    
        this.#screen.insertAdjacentElement('beforeend', this.#createLevelInfoList());
        this.#bottomMenu = this.#createBottomMenu();
    }

    get bottomMenu() {
        return this.#bottomMenu;
    }

    drawScreen(parent) {
        parent.insertAdjacentElement('beforeend', this.#screen);
        parent.insertAdjacentElement('beforeend', this.#bottomMenu);
        this.#toggleVisibleLevelInfo();
    }

    play = () => {
        let name = this.#switchBottomMenu();
        if (name != false) {
            this.#screen.remove();
            game = new Game(new Player(name));
            game.nextLevel();
        }
    }

    openLeaderBoard = () => {
        document.querySelector('main').innerHTML = "";
        leaderBoard.draw(document.querySelector('main'));
    }

    #createLevelInfoList() {
        let levelsInfoList = document.createElement('div');
        levelsInfoList.className = "levels-info-list";
        let index = 0;
        for (var [key, item] of Object.entries(levelsInfoArr)) {
            levelsInfoList.insertAdjacentElement('beforeend', this.#createLevelInfoItem(index+1, item.name, item.desc, item.time, item.score));
            index++;
        }
        return levelsInfoList;
    }

    #createLevelInfoItem(index, name, desc, time, score) {
        let levelInfo = document.createElement('div');
        levelInfo.className = "level-info";
        levelInfo.innerHTML = 
            '<h2 class="level-name">' + 
                '<span>' + index + '. ' + name + '</span>' + 
            '</h2>' + 
            '<div class="level-desc-block">' +
                '<p class="level-desc">' + 
                    desc + 
                '</p>' + 
                '<div class="level-sub-info">' + 
                    '<p class="level-time">' + 
                        'Время выполнения: <b><span>' + time + '</span> секунд</b>' +
                    '</p>' + 
                    '<p class="level-score">' + 
                        'Максимально количество балов: <b><span>' + score + '</span></b>' + 
                    '</p>' + 
                '</div>' +
            '</div>';
        return levelInfo;
    }

    #createBottomMenu() {
        let bottomMenu = document.createElement('div');
        bottomMenu.className = "btns-wrap";
        let playBtn = this.#createBtn('play-btn', 'icon/play.svg', 'Играть', this.play);
        let tableBtn = this.#createBtn('table-btn', 'icon/leaderboard.svg', 'Таблица', this.openLeaderBoard);
        let nameInput = '<input class="name" type="text" name="name" placeholder="Имя">';
        bottomMenu.insertAdjacentElement('beforeend', tableBtn);
        bottomMenu.insertAdjacentHTML('beforeend', nameInput);
        bottomMenu.insertAdjacentElement('beforeend', playBtn);
        return bottomMenu;
    }
    
    #createBtn(classStr, iconPath, alt, func) {
        let btn = document.createElement('div');
        btn.className = "btn";
        btn.classList.add(classStr);
        btn.innerHTML = '<img src="' + iconPath + '" alt="' + alt + '">';
    
        btn.addEventListener("click", () => {
            func();
        });
        return btn;
    }

    #switchBottomMenu = () => {
        let name = document.querySelector(".name").value;
        let childs = this.#bottomMenu.children;
        if (name.length > 0) {
            this.#bottomMenu.innerHTML = "";
            this.#bottomMenu.remove();
            return name;
        } else {
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].classList.contains('name'))
                    childs[i].classList.add('input-error');
            }
            return false;
        }
    }

    #toggleVisibleLevelInfo() {
        const levelNames = document.querySelectorAll('.level-name'),
            levelsDescBlocks = document.querySelectorAll('.level-desc-block');
    
        levelNames.forEach((name, nameIndex) => {
            name.addEventListener('click', () => {
                levelNames.forEach((item, index) => {
                    if (index == nameIndex) item.classList.toggle('level-name-active');
                    else item.classList.remove('level-name-active');
                });
                levelsDescBlocks.forEach((block, blockIndex) => {
                    if (blockIndex != nameIndex) {
                        block.classList.remove('level-desc-block-active');
                        block.style.marginBottom = "0px";
                    } else {
                        block.classList.toggle('level-desc-block-active');
                        if (block.classList.contains('level-desc-block-active')) {
                            let blockHeight = 0;
                            for (let i = 0; i < block.children.length; i++) {
                                blockHeight += block.children[i].offsetHeight;
                            }
                            
                            block.style.marginBottom = blockHeight + "px";
                        } else {
                            block.style.marginBottom = "0px";
                        }
                    }
                });
            });
        });
    }
}