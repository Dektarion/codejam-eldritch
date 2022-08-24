import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import blueCardsData from '../data/mythicCards/blue/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import greenCardsData from '../data/mythicCards/green/index.js';

const ancientsContainer = document.querySelector('.ancients__display');
const difficultyButtonsContainer = document.querySelector('.difficulty__display');
const ancients = document.querySelectorAll('.ancients');
const difficultyButtons = document.querySelectorAll('.difficulty__buttons');
const deckButtonDisplay = document.querySelector('.deck-button__display');
const deckContainer = document.querySelector('.deck__container');
const shuffleButton = document.querySelector('.shuffle-button');
const cardPlace = document.querySelector('.card');
const deskBackground = document.querySelector('.deck');

/* Информация для циклов */

let gameInformation = {
  idGod: '',
  idDifficulty: '',
  numGodInArr: null,
};

const addNumGod = (idOfGod) => {
  switch(idOfGod) {
    case ancientsData[0].id :
      gameInformation.numGodInArr = 0;
      break;
    case ancientsData[1].id :
      gameInformation.numGodInArr = 1;
      break;
    case ancientsData[2].id :
      gameInformation.numGodInArr = 2;
      break;
    case ancientsData[3].id :
      gameInformation.numGodInArr = 3;
      break;
  }
};

const min = 0;

/* Выбор древнего */

const activeAncient = (event) => {
  for (let element of ancients) {
    element.classList.remove('active_ancient');
  }
  if (event.target.classList.contains('ancients')) {
    gameInformation.idGod = event.target.id;
    addNumGod(gameInformation.idGod);
    event.target.classList.add('active_ancient');
    difficultyButtonsContainer.classList.remove('difficulty__display_hidden');
    deckContainer.classList.add('hidden');
  }
};

/* Выбор сложности */

const activeDifficultyButtons = (event) => {
  for (let element of difficultyButtons) {
    element.classList.remove('difficulty__buttons_active');
  }
  if (event.target.classList.contains('difficulty__buttons')) {
    gameInformation.idDifficulty = event.target.id;
    event.target.classList.add('difficulty__buttons_active');
    deckButtonDisplay.classList.remove('deck-button__display_hidden');
    deckContainer.classList.add('hidden');
    console.log(gameInformation);
  }
};

ancientsContainer.addEventListener('click', activeAncient);
difficultyButtonsContainer.addEventListener('click', activeDifficultyButtons);

/* Показ колоды и трекера карт */

const visiableDeckContainer = () => {
  deckContainer.classList.remove('hidden');
  deckButtonDisplay.classList.add('deck-button__display_hidden');
};

shuffleButton.addEventListener('click', visiableDeckContainer);

/* Выбор нужного количества карт каждого цвета */

const getGreenCardsImgArr = () => {
  const max = 17;
  let randomGreenImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numGodInArr].allGreenCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomGreenImgArr.includes(greenCardsData[num]);
      if(!check){
        randomGreenImgArr.push(greenCardsData[num]);      
      }
    }
    while(check);
  }
  
  return randomGreenImgArr;
};

const getBrownCardsImgArr = () => {
  const max = 20;
  let randomBrownImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numGodInArr].allBrownCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomBrownImgArr.includes(brownCardsData[num]);
      if(!check){
        randomBrownImgArr.push(brownCardsData[num]);      
      }
    }
    while(check);
  }
  
  return randomBrownImgArr;
};

const getBlueCardsImgArr = () => {
  const max = 11;
  let randomBlueImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numGodInArr].allBlueCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomBlueImgArr.includes(blueCardsData[num]);
      if(!check){
        randomBlueImgArr.push(blueCardsData[num]);      
      }
    }
    while(check);
  }

  return randomBlueImgArr;
};

/* Создание массива массивов отобранных карт*/

const getImgArr = () => {
  let allChosenCardsArr = [];
  let greenCards = getGreenCardsImgArr();
  let brownCards = getBrownCardsImgArr();
  let blueCards = getBlueCardsImgArr();

  allChosenCardsArr.push(greenCards);
  allChosenCardsArr.push(brownCards);
  allChosenCardsArr.push(blueCards);

  return allChosenCardsArr;
};

/* Функция перемешивания карт внутри массива */

function shuffleArray(arr) {
  let shuffleArr = [];
  let lenght = arr.length;
  while (lenght > 0) {
    let index = Math.floor(Math.random() * lenght);
    shuffleArr.push(arr[index]);
    arr.splice(index, 1);
    lenght--;
  }
  return shuffleArr;
}

/* Отбор карт для каждого этапа */

// var allStageArrGlobal;

let arrAllValues = [];

const flattenArr = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    if (Array.isArray(currentValue)) {
      flattenArr(currentValue);
    } else {
      arrAllValues.push(currentValue);
    }
  }
  return arrAllValues;
};

const allStageArrObj = {
  arrFlatten: [],
};

const getCardsForAllStage = () => {
  let allStageArr = [];
  let firstStageArr = [];
  let secondStageArr = [];
  let thirdStageArr = [];
  let allChosenCardsArr = getImgArr();

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numGodInArr].firstStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      firstStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numGodInArr].secondStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      secondStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numGodInArr].thirdStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      thirdStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  allStageArr.push(shuffleArray(firstStageArr));
  allStageArr.push(shuffleArray(secondStageArr));
  allStageArr.push(shuffleArray(thirdStageArr));
  
  console.log(allStageArr);

  allStageArrObj.arrFlatten = flattenArr(allStageArr);

  // return flattenArr(allStageArr);
  return allStageArrObj;
};

// allStageArrObj.arrFlatten = getCardsForAllStage();

const chooseCards = () => {
  switch(gameInformation.idDifficulty) {
    case difficulties[0].id :

      break;
    case difficulties[1].id :

      break;
    case difficulties[2].id :
      getCardsForAllStage();
      break;
    case difficulties[3].id :

      break;
    case difficulties[4].id :

      break;
  }
};

shuffleButton.addEventListener('click', () => {
  allStageArrObj.arrFlatten = [];
  chooseCards();
  });

/* Показ карт */

const setBg = () => {
  console.log(allStageArrObj.arrFlatten);

  if (allStageArrObj.arrFlatten.length > 0) {
    cardPlace.style.backgroundImage = `url('${allStageArrObj.arrFlatten[0].cardFace}')`;
    allStageArrObj.arrFlatten.shift(allStageArrObj.arrFlatten[0]);
  } else {
    cardPlace.style.backgroundImage = `url('null')`;
  }
};

deskBackground.addEventListener('click', setBg);


// const state = {
//   deck: []
// }
// state.deck = shuffleDeck();

// zameshat'Button.addEventlistener('click', () => {
//   state.deck = [];
//   TVOY CODE...;
// })

/*просто на клик по сложности задать массив = []. тогда в следующую игру не пойдут
 недоигранные карты. Мож, у вас их много, и вы просто запутались в них, и не все обнуляете? 
 у меня их несколько, я все обнуляю */

/* повесить обнуление на кнопку генерации колоды */