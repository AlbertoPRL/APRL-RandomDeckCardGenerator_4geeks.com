import '../scss/styles.scss'
import 'bootstrap'

const button = document.querySelector("#button");
const timeoutButton = document.querySelector("#timeout-button");
const pips = document.querySelectorAll(".pip");
const value = document.querySelector("#value");
const resizableCard = document.querySelector("#resizable-card");
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const submitCardSizeChangeButton = document.querySelector("#change-card-size");

let isIntervalSet = false;
let intervalId = null;
const valueArray = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const pipArray = [
    '<i class="bi bi-suit-club-fill pip-size"></i>',
    '<i class="bi bi-suit-spade-fill pip-size"></i>',
    '<i class="bi bi-diamond-fill pip-size" style="color: red"></i>',
    '<i class="bi bi-suit-heart-fill pip-size" style="color: red"></i>'
];

const generateCard = () => {
    const newCardValue = valueArray[randomIndex(valueArray)];
    const newCardPip = pipArray[randomIndex(pipArray)];
    value.innerHTML = newCardValue;
    for (let [index, pip] of pips.entries()) {
        pip.innerHTML = newCardPip;
        pip.classList.add("pip");
        if (index === 1) {
            pip.style.transform = "rotate(180deg)";
        }
    }
};

const generateCardWithTimeoutToggle = () => {
    if (isIntervalSet) {
        clearInterval(intervalId)
        timeoutButton.innerHTML = "Set interval 10s";
    }
    else {
        intervalId = setInterval(generateCard, 10000);
        timeoutButton.innerHTML = "Stop interval";
    }
    isIntervalSet = !isIntervalSet;
}

const changeCardSize = () => {
    resizableCard.style.width = `${Number(widthInput.value)}px`;
    resizableCard.style.height = `${Number(heightInput.value)}px`;
}

const randomIndex = (array) => {
    return Math.floor(Math.random() * array.length)
};

window.onload = () => {
    button.addEventListener("click", generateCard, false);
    timeoutButton.addEventListener("click", generateCardWithTimeoutToggle, false);
    submitCardSizeChangeButton.addEventListener("click", changeCardSize, false);
    generateCard();
}
