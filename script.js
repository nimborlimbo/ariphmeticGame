let mainScreen = createMainScreen();
document.querySelector('main').insertAdjacentElement('beforeend', mainScreen);
let bottomMenu = createBottomMenu();
document.querySelector('main').insertAdjacentElement('beforeend', bottomMenu);

function readName(inputSelector) {
    return document.querySelector(inputSelector).value;
}

toggleVisibleLevelInfo();