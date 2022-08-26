import greenCardsAssets from '../assets/MythicCards/green/index.js';
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

let randomCardsArr = [];
let greenCardsArr = [];
let brownCardsArr = [];
let blueCarsdArr = [];
let firstStageCardsArr = [];
let secondStageCardsArr = [];
let thirdStageCradsArr = [];
let allStageCardsArr = [];
let flattenStageArr = [];

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

/* Выбор нужного количества карт каждого цвета */

const min = 0;
let max = 0;
let counterOfCards = 0;
let counterForStages = 0;

const getCardsArr = (counter) => {
  let check = [];
  let obj = [];

  if (counter === 0) {
    obj = greenCardsData;
  } else if (counter === 1) {
    obj = brownCardsData;
  } else if (counter === 2) {
    obj = blueCardsData;
  } else {
    return randomCardsArr;
  }
  
  max = Object.keys(obj).length - 1;

  for (let i = 0; i < ancientsData[gameInformation.numGodInArr].cardsCount[counter]; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomCardsArr.includes(obj[num]);
      if(!check){
        randomCardsArr.push(obj[num]);      
      }
    }
    while(check);
  }
  counter++;
  getCardsArr(counter);
};

/* Выбор древнего */

const activeAncient = (event) => {
  ancients.forEach((element) => {
    element.classList.remove('active_ancient');
  });
  if (event.target.classList.contains('ancients')) {
    gameInformation.idGod = event.target.id;
    addNumGod(gameInformation.idGod);
    event.target.classList.add('active_ancient');
    difficultyButtonsContainer.classList.remove('difficulty__display_hidden');
    deckContainer.classList.add('hidden');
    randomCardsArr = [];
    getCardsArr(counterOfCards);
    cardPlace.style.backgroundImage = ``;
    console.clear();
  }
};

ancientsContainer.addEventListener('click', activeAncient);

/* Выбор сложности */

const getCardsofDifficulty = () => {
  if (gameInformation.idDifficulty === 'normal') {
    return;
  }
};


const activeDifficulty = (event) => {
  difficultyButtons.forEach((element) => {
    element.classList.remove('difficulty__buttons_active');
  });
  if (event.target.classList.contains('difficulty__buttons')) {
    gameInformation.idDifficulty = event.target.id;
    event.target.classList.add('difficulty__buttons_active');
    deckButtonDisplay.classList.remove('deck-button__display_hidden');
    deckContainer.classList.add('hidden');
    getCardsofDifficulty();
  }
};

difficultyButtonsContainer.addEventListener('click', activeDifficulty);

/* Показ колоды, трекера карт и замешевания карт на 3 этапа */

/* Создание 3 стопок карт по цветам */

const gerColorDecks = () => {
  randomCardsArr.forEach((card) => {
    if (card.color === 'green') {
      greenCardsArr.push(card);
    } else if (card.color === 'brown') {
      brownCardsArr.push(card);
    } else if (card.color === 'blue') {
      blueCarsdArr.push(card);
    } 
  });
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

/* Функция разворачивает массив в плоский */

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


/* Создание массива карт для показа */

const getCardsForStages = (counter) => {
  let obj = [];
  let arr = [];

  if (counter === 0) {
    obj = ancientsData[gameInformation.numGodInArr].firstStage;
  } else if (counter === 1) {
    obj = ancientsData[gameInformation.numGodInArr].secondStage;
  } else if (counter === 2) {
    obj = ancientsData[gameInformation.numGodInArr].thirdStage;
  } else {
    allStageCardsArr.push(shuffleArray(firstStageCardsArr));
    allStageCardsArr.push(shuffleArray(secondStageCardsArr));
    allStageCardsArr.push(shuffleArray(thirdStageCradsArr));

    flattenStageArr = flattenArr(allStageCardsArr);

    return flattenStageArr;
  }

// counter отвечает за stage
// n отвечает за цвет
// i отвечает за количество карт в цвете

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < obj[n]; i++) {
      if (n === 0) {
        arr = greenCardsArr;
      } else if (n === 1) {
        arr = brownCardsArr;
      } else if (n === 2) {
        arr = blueCarsdArr;
      }
      let max = Math.floor(arr.length);
      let index = Math.floor(Math.random() * max);
      if (counter === 0) {
        firstStageCardsArr.push(arr[index]);
      } else if (counter === 1) {
        secondStageCardsArr.push(arr[index]);
      } else if (counter === 2) {
        thirdStageCradsArr.push(arr[index]);
      } 
      arr.splice(index, 1);
    }
  }
  counter++;
  getCardsForStages(counter);
};

const visiableDeckContainer = () => {
  deckContainer.classList.remove('hidden');
  deckButtonDisplay.classList.add('deck-button__display_hidden');
  greenCardsArr = [];
  brownCardsArr = [];
  blueCarsdArr = [];
  gerColorDecks();
  arrAllValues = [];
  firstStageCardsArr = [];
  secondStageCardsArr = [];
  thirdStageCradsArr = [];
  allStageCardsArr = [];
  flattenStageArr = [];
  getCardsForStages(counterForStages);
};

shuffleButton.addEventListener('click', visiableDeckContainer);


const setBg = () => {
  if (flattenStageArr.length > 0) {
    cardPlace.style.backgroundImage = `url('${flattenStageArr[0].cardFace}')`;
    console.log(flattenStageArr[0].id, flattenStageArr[0].difficulty);
    flattenStageArr.shift(flattenStageArr[0]);
  } else {
    cardPlace.style.backgroundImage = ``;
  }
};

deskBackground.addEventListener('click', setBg);
