"use strict";
let levels = 
    [
        {
            "name": "Четные / Нечетные",
            "desc": "После того, как выпадет случайное условие(четное или нечетное), на экране появятся числа, хаотично движущиеся по экрану. Ваша задача – нажать на те из них, которые удовлетворяют, выпавшее условие. Уровень закончится после выбора 5 чисел либо после истечения указанного времени.",
            "time": 60,
            "score": 10
        },
        {
            "name": "Арифметическая прогрессия",
            "desc": "На экране появятся несколько примеров алгебраической и геометрической прогрессий. Ваша задача – продолжить их. Если прогрессия решена верно, то ее поле станет зеленым, иначе красным. Уровень закончится, если все поля станут зелеными или, если истечет указанное время.",
            "time": 90,
            "score": 20
        },
        {
            "name": "Арифметическое выражение",
            "desc": "На экране, в случайном порядке, будут появлятся числа. Ваша задача – собрать из символов, которые будут указаны внизу экрана, выражение, равно выпавшему числу. Чем больше выражение Вы соберете, тем больше балов получите. Уровень закончится после истечения указанного времени.",
            "time": 90,
            "score": 30
        },
        
    ];

class MainScreen {
    #screen; #bottomMenu;

    constructor() {
        this.#screen = document.createElement('div');
        this.#screen.className = "main-screen";

        let countLevels = document.createElement('h1');
        countLevels.insertAdjacentHTML('beforeend', "Количество уровней: <span>" + levels.length + "</span>");

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

    screenSwitch = () => {
        let name = this.#switchBottomMenu();
        if (name != false) {
            this.#screen.remove();
            new Game(new Player(name));
        }
    }

    #createLevelInfoList() {
        let levelsInfoList = document.createElement('div');
        levelsInfoList.className = "levels-info-list";
    
        levels.forEach((item, index) => {
            levelsInfoList.insertAdjacentElement('beforeend', this.#createLevelInfoItem(index+1, item.name, item.desc, item.time, item.score));
        });
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
        let playBtn = this.#createBtn('play-btn', 'icon/play.svg', 'Играть', this.screenSwitch);
        let tableBtn = this.#createBtn('table-btn', 'icon/leaderboard.svg', 'Таблица');
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