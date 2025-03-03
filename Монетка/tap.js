const noneImg = '/img/01 Images/Placeholder Square.svg';
const imgOnStatsBlock = document.querySelector('.stats-img');
const counterDisplay = document.getElementById('counter')
let clickerCounter = 0

imgOnStatsBlock.setAttribute("src",noneImg);

function clickerButton () {
    console.log('Була натыскнута кнопка')
    clickerCounter++
    console.log(clickerCounter)
    counterDisplay.textContent = `Ви нвклікали ${clickerCounter}`

}