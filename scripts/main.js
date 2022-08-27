// import greenCardsAssets from '../assets/MythicCards/green/index.js';
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
const deckBackground = document.querySelector('.deck');
const firstGreen = document.getElementById('firstgreen');
const firstBrown = document.getElementById('firstbrown');
const firstBlue = document.getElementById('firstblue');
const secondGreen = document.getElementById('secondgreen');
const secondBrown = document.getElementById('secondbrown');
const secondBlue = document.getElementById('secondblue');
const thirdGreen = document.getElementById('thirdgreen');
const thirdBrown = document.getElementById('thirdbrown');
const thirdBlue = document.getElementById('thirdblue');

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
let counerForEasyHardCards = 0;

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
    cardPlace.style.backgroundImage = ``;
  }
};

ancientsContainer.addEventListener('click', activeAncient);

/* Выбор сложности */

let exclude = '';
let include = '';

const getEasyHardDifficulty = () => {
  randomCardsArr.forEach((element, index) => {
    if (element.difficulty === exclude) {
      let colorOfCard = element.color;
      let obj = [];
      let checkIncl1 = Boolean;
      let checkIncl2 = Boolean;
      let checkDiff = Boolean;
      let num = 0;

      if (colorOfCard === 'green') {
        obj = greenCardsData;
      } else if (colorOfCard === 'brown') {
        obj = brownCardsData;
      } else if (colorOfCard === 'blue') {
        obj = blueCardsData;
      } 
      
      max = Object.keys(obj).length - 1;

      do {
        num =  Math.floor(Math.random() * (max - min + 1)) + min;
        checkIncl1 = randomCardsArr.includes(obj[num]);
        checkIncl2 = !checkIncl1;
        checkDiff = obj[num].difficulty !== exclude;
        if(checkIncl2 && checkDiff){
          randomCardsArr.splice(index, 1);
          randomCardsArr.splice(index, 0, obj[num]);
        }
      }
      while(!(checkIncl2 && checkDiff));
    }
  });
  return randomCardsArr;
};

let counterEasyHardCardObj = {
  easy: {
    green: null,
    brown: null,
    blue: null,
  },
  hard: {
    green: null,
    brown: null,
    blue: null,
  },
};

let greenCardsCheck = [];
let brownCardsCheck = [];
let blueCardsCheck = [];
let color = '';

const countEasyHardCard = (counter) => {
  let arr = [];
  if (counter === 0) {
    arr = greenCardsCheck;
    color = 'green';
  } else if (counter === 1) {
    arr = brownCardsCheck;
    color = 'brown';
  } else if (counter === 2) {
    arr = blueCardsCheck;
    color = 'blue';
  } else {
    return counterEasyHardCardObj;
  }

  randomCardsArr.forEach((element) => {
    if (element.color === color && element.difficulty === include) {
      arr.push(element);
      counterEasyHardCardObj[include][color] = arr.length;
    }
    }
  );
  counter++;
  countEasyHardCard(counter);
};

const numGreenEasyCards = 5;
const numBrownEasyCards = 5;
const numBlueEasyCards = 4;
const numGreenHardCards = 5;
const numBrownHardCards = 5;
const numBlueHardCards = 4;

const getVeryEasyHardDifficulty = () => {
  let maxCounter = 0;
  randomCardsArr.forEach((element, index) => {
    let colorOfCard = element.color;
    if (include === 'easy') {
      if (colorOfCard === 'green') {
        maxCounter = numGreenEasyCards;
      } else if (colorOfCard === 'brown') {
        maxCounter = numBrownEasyCards;
      } else if (colorOfCard === 'blue') {
        maxCounter = numBlueEasyCards;
      }
    } else if (include === 'hard'){
      if (colorOfCard === 'green') {
        maxCounter = numGreenHardCards;
      } else if (colorOfCard === 'brown') {
        maxCounter = numBrownHardCards;
      } else if (colorOfCard === 'blue') {
        maxCounter = numBlueHardCards;
      }
    }
    if (element.difficulty === include) {
      return;
    } else if (element.difficulty === 'normal' && counterEasyHardCardObj[include][colorOfCard] === maxCounter) {
      return;
    } else {
      let obj = [];
      let checkIncl1 = Boolean;
      let checkIncl2 = Boolean;
      let checkDiff = Boolean;
      let num = 0;

      if (colorOfCard === 'green') {
        obj = greenCardsData;
      } else if (colorOfCard === 'brown') {
        obj = brownCardsData;
      } else if (colorOfCard === 'blue') {
        obj = blueCardsData;
      } 
      
      max = Object.keys(obj).length - 1;

      do {
        num =  Math.floor(Math.random() * (max - min + 1)) + min;
        checkIncl1 = randomCardsArr.includes(obj[num]);
        checkIncl2 = !checkIncl1;
        if (counterEasyHardCardObj[include][colorOfCard] < maxCounter) {
          checkDiff = obj[num].difficulty === include;
        } else {
          checkDiff = obj[num].difficulty === 'normal';
        }

        if(checkIncl2 && checkDiff){
          randomCardsArr.splice(index, 1);
          randomCardsArr.splice(index, 0, obj[num]);
          if (obj[num].difficulty === include) {
            counterEasyHardCardObj[include][colorOfCard]++;
          }
        }
      }
      while(!(checkIncl2 && checkDiff));
    }
  });
  return randomCardsArr;
};



const getCardsOfDifficulty = () => {
  if (gameInformation.idDifficulty === 'veryeasy') {
    exclude = 'hard';
    include = 'easy';
    countEasyHardCard(counerForEasyHardCards);
    return getVeryEasyHardDifficulty();
  } else if (gameInformation.idDifficulty === 'easy') {
    exclude = 'hard';
    return getEasyHardDifficulty();
  } else if (gameInformation.idDifficulty === 'normal') {
    return;
  } else if (gameInformation.idDifficulty === 'hard') {
    exclude = 'easy';
    return getEasyHardDifficulty();
  } else if (gameInformation.idDifficulty === 'veryhard') {
    exclude = 'easy';
    include = 'hard';
    countEasyHardCard(counerForEasyHardCards);
    return getVeryEasyHardDifficulty();
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
    randomCardsArr = [];
    getCardsArr(counterOfCards);
    greenCardsCheck = [];
    brownCardsCheck = [];
    blueCardsCheck = [];
    color = '';
    counterEasyHardCardObj = {easy: {green: null, brown: null, blue: null}, hard: {green: null, brown: null, blue: null}};
    getCardsOfDifficulty();
    cardPlace.style.backgroundImage = ``;
    console.log(`Выбран Древний ${gameInformation.idGod.charAt(0).toUpperCase()}${gameInformation.idGod.slice(1)} и сложность ${gameInformation.idDifficulty.charAt(0).toUpperCase()}${gameInformation.idDifficulty.slice(1)}!`);
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

/* Прописывание количества карт в трекере */

let firstGreenCards = 0;
let firstBrownCards = 0;
let firstBlueCards = 0;
let firstAllCards = 0;
let secondGreenCards = 0;
let secondBrownCards = 0;
let secondBlueCards = 0;
let secondAllCards = 0;
let thirdGreenCards = 0;
let thirdBrownCards = 0;
let thirdBlueCards = 0;
let thirdAllCards = 0;

const getNumCardsForTracker = () => {
  firstGreenCards = ancientsData[gameInformation.numGodInArr].firstStage.greenCards;
  firstBrownCards = ancientsData[gameInformation.numGodInArr].firstStage.brownCards;
  firstBlueCards = ancientsData[gameInformation.numGodInArr].firstStage.blueCards;
  secondGreenCards = ancientsData[gameInformation.numGodInArr].secondStage.greenCards;
  secondBrownCards = ancientsData[gameInformation.numGodInArr].secondStage.brownCards;
  secondBlueCards = ancientsData[gameInformation.numGodInArr].secondStage.blueCards;
  thirdGreenCards = ancientsData[gameInformation.numGodInArr].thirdStage.greenCards;
  thirdBrownCards = ancientsData[gameInformation.numGodInArr].thirdStage.brownCards;
  thirdBlueCards = ancientsData[gameInformation.numGodInArr].thirdStage.blueCards;
  firstAllCards = ancientsData[gameInformation.numGodInArr].firstStage.allCards;
  secondAllCards = ancientsData[gameInformation.numGodInArr].secondStage.allCards;
  thirdAllCards = ancientsData[gameInformation.numGodInArr].thirdStage.allCards;
};

const getNumCardsInTracker = () => {
  firstGreen.textContent = firstGreenCards;
  firstBrown.textContent = firstBrownCards;
  firstBlue.textContent = firstBlueCards;
  secondGreen.textContent = secondGreenCards;
  secondBrown.textContent = secondBrownCards;
  secondBlue.textContent = secondBlueCards;
  thirdGreen.textContent = thirdGreenCards;
  thirdBrown.textContent = thirdBrownCards;
  thirdBlue.textContent = thirdBlueCards;
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
    getNumCardsInTracker();

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

/* Трекер карт */

const trackerCards = (card, counter) => {
  if (counter <= firstAllCards) {
    if (card.color === 'green') {
      firstGreenCards--;
      firstGreen.textContent = firstGreenCards;
    } else if (card.color === 'brown') {
      firstBrownCards--;
      firstBrown.textContent = firstBrownCards;
    } else {
      firstBlueCards--;
      firstBlue.textContent = firstBlueCards;
    }
  } else if (counter > firstAllCards && counter <= (firstAllCards + secondAllCards)) {
    if (card.color === 'green') {
      secondGreenCards--;
      secondGreen.textContent = secondGreenCards;
    } else if (card.color === 'brown') {
      secondBrownCards--;
      secondBrown.textContent = secondBrownCards;
    } else {
      secondBlueCards--;
      secondBlue.textContent = secondBlueCards;
    }
  } else {
    if (card.color === 'green') {
      thirdGreenCards--;
      thirdGreen.textContent = thirdGreenCards;
    } else if (card.color === 'brown') {
      thirdBrownCards--;
      thirdBrown.textContent = thirdBrownCards;
    } else {
      thirdBlueCards--;
      thirdBlue.textContent = thirdBlueCards;
    }
  }
};


/* Показ карт из колоды */

let counterOfClicks = 0;

const setBg = () => {
  counterOfClicks++;
  if (flattenStageArr.length > 0) {
    cardPlace.style.backgroundImage = `url('${flattenStageArr[0].cardFace}')`;
    console.log(flattenStageArr[0].id, flattenStageArr[0].difficulty);
    trackerCards(flattenStageArr[0], counterOfClicks);
    flattenStageArr.shift(flattenStageArr[0]);
  } else {
    deckBackground.style.backgroundImage = `url('')`;
    deckBackground.textContent = 'Колода закончилась';
  }
};

deckBackground.addEventListener('click', setBg);

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
  getNumCardsForTracker();
  getCardsForStages(counterForStages);
  deckBackground.style.backgroundImage = `url(./assets/${gameInformation.idGod}.jpg)`;
  deckBackground.textContent = '';
  counterOfClicks = 0;
};

shuffleButton.addEventListener('click', visiableDeckContainer);

