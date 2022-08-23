import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import blueCardsData from '../data/mythicCards/blue/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import greenCardsData from '../data/mythicCards/green/index.js';

// console.log(greenCardsData[0].cardFace);
// console.log(ancientsData[0].allCardsCount);
// document.querySelector('.myImg').src = 'https://placekitten.com/500/500' // or ./assets/platform.png
// document.querySelector('.cthulhu').style.backgroundImage = `url('${ancientsData[0].cardFace}')`;

const ancientsContainer = document.querySelector('.ancients__display');
const difficultyButtonsContainer = document.querySelector('.difficulty__display');
const ancients = document.querySelectorAll('.ancients');
const difficultyButtons = document.querySelectorAll('.difficulty__buttons');
const deckButtonDisplay = document.querySelector('.deck-button__display');
const deckContainer = document.querySelector('.deck__container');
const deckButton = document.querySelector('.deck-button');
const cardPlace = document.querySelector('.card');
const deskBackground = document.querySelector('.deck');

/* Информация для циклов */

let gameInformation = {
  idGod: '',
  idDifficulty: '',
  numInArr: 0,
};

let allStageArrObj = {};


const addNumGod = () => {
  switch(gameInformation.idGod) {
    case ancientsData[0].id :
      gameInformation.numInArr = 0;
      break;
    case ancientsData[1].id :
      gameInformation.numInArr = 1;
      break;
    case ancientsData[2].id :
      gameInformation.numInArr = 2;
      break;
    case ancientsData[3].id :
      gameInformation.numInArr = 3;
      break;
  }
};

/* Выбор древнего */

const activeAncient = (event) => {
  for (let element of ancients) {
    element.classList.remove('active_ancient');
  }
  if (event.target.classList.contains('ancients')) {
    gameInformation.idGod = event.target.id;
    addNumGod();
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
  }
};

ancientsContainer.addEventListener('click', activeAncient);
difficultyButtonsContainer.addEventListener('click', activeDifficultyButtons);

/* Выбор нужного количества карт каждого цвета */

const getGreenCardsImgArr = () => {
  const min = 0;
  const max = 17;
  let randomGreenImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numInArr].allGreenCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomGreenImgArr.includes(greenCardsData[num].cardFace);
      if(!check){
        randomGreenImgArr.push(greenCardsData[num].cardFace);      
      }
    }
    while(check);
  }
  return randomGreenImgArr;
};

const getBrownCardsImgArr = () => {
  const min = 0;
  const max = 20;
  let randomBrownImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numInArr].allBrownCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomBrownImgArr.includes(brownCardsData[num].cardFace);
      if(!check){
        randomBrownImgArr.push(brownCardsData[num].cardFace);      
      }
    }
    while(check);
  }
  return randomBrownImgArr;
};

const getBlueCardsImgArr = () => {
  const min = 0;
  const max = 11;
  let randomBlueImgArr = [];
  let check;

  for (let i = 0; i < ancientsData[gameInformation.numInArr].allBlueCardsCount; i++) {
    do {
      let num =  Math.floor(Math.random() * (max - min + 1)) + min;
      check = randomBlueImgArr.includes(blueCardsData[num].cardFace);
      if(!check){
        randomBlueImgArr.push(blueCardsData[num].cardFace);      
      }
    }
    while(check);
  }
  return randomBlueImgArr;
};

/* Создание массива массивов отобранных карт*/

const getImgArr = () => {
  let allChosenCardsArr = [];

  allChosenCardsArr.push(getGreenCardsImgArr());
  allChosenCardsArr.push(getBrownCardsImgArr());
  allChosenCardsArr.push(getBlueCardsImgArr());

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


const getCardsForAllStage = () => {
  let allStageArr = [];
  let firstStageArr = [];
  let secondStageArr = [];
  let thirdStageArr = [];
  let allChosenCardsArr = getImgArr();

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numInArr].firstStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      firstStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numInArr].secondStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      secondStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  for (let n = 0; n <= 2; n++) {
    for (let i = 0; i < ancientsData[gameInformation.numInArr].thirdStage[n]; i++) {
      let max = Math.floor(allChosenCardsArr[n].length);
      let index = Math.floor(Math.random() * max);
      thirdStageArr.push(allChosenCardsArr[n][index]);
      allChosenCardsArr[n].splice(index, 1);
    }
  }

  allStageArr.push(shuffleArray(firstStageArr));
  allStageArr.push(shuffleArray(secondStageArr));
  allStageArr.push(shuffleArray(thirdStageArr));
  
  // flattenArr(allStageArr);

  // allStageArrObj.arr = allStageArr;

  allStageArrObj.arrFlatten = flattenArr(allStageArr);

  return allStageArr;
};

/* Показ карт */

// cardCount; глобальаня переменная со значением общего количества карт для древнего
// allStageArrGlobal; глобальаня переменная с общим массивом карт

const setBg = () => {
  let allStageArrBgFlatten = allStageArrObj.arrFlatten;
  console.log(allStageArrBgFlatten);

  if (allStageArrBgFlatten.length > 0) {
    cardPlace.style.backgroundImage = `url('${allStageArrBgFlatten[0]}')`;
    allStageArrBgFlatten.shift(allStageArrBgFlatten[0]);
  } else {
    cardPlace.style.backgroundImage = `url('${allStageArrBgFlatten[0]}')`;
    cardPlace.textContent = 'Вы перебрали все доступные карты!';
  }
};


const chooseCards = () => {
  if (gameInformation.idGod === ancientsData[0].id) {
    switch(gameInformation.idDifficulty) {
      case difficulties[0].id :
        console.log(difficulties[0].id);
        break;
      case difficulties[1].id :
        console.log(difficulties[1].id);
        break;
      case difficulties[2].id :
        getCardsForAllStage();
        break;
      case difficulties[3].id :
        console.log(difficulties[3].id);
        break;
      case difficulties[4].id :
        console.log(difficulties[4].id);
        break;
    }
  } else if (gameInformation.idGod === ancientsData[1].id) {
    switch(gameInformation.idDifficulty) {
      case difficulties[0].id :
        console.log(difficulties[0].id);
        break;
      case difficulties[1].id :
        console.log(difficulties[1].id);
        break;
      case difficulties[2].id :
        getCardsForAllStage();
        break;
      case difficulties[3].id :
        console.log(difficulties[3].id);
        break;
      case difficulties[4].id :
        console.log(difficulties[4].id);
        break;
    }
  } else if (gameInformation.idGod === ancientsData[2].id) {
    switch(gameInformation.idDifficulty) {
      case difficulties[0].id :
        console.log(difficulties[0].id);
        break;
      case difficulties[1].id :
        console.log(difficulties[1].id);
        break;
      case difficulties[2].id :
        getCardsForAllStage();
        break;
      case difficulties[3].id :
        console.log(difficulties[3].id);
        break;
      case difficulties[4].id :
        console.log(difficulties[4].id);
        break;
    }
  } else if (gameInformation.idGod === ancientsData[3].id) {
    switch(gameInformation.idDifficulty) {
      case difficulties[0].id :
        console.log(difficulties[0].id);
        break;
      case difficulties[1].id :
        console.log(difficulties[1].id);
        break;
      case difficulties[2].id :
        getCardsForAllStage();
        break;
      case difficulties[3].id :
        console.log(difficulties[3].id);
        break;
      case difficulties[4].id :
        console.log(difficulties[4].id);
        break;
    }
  }
};

const visiableDeckContainer = () => {
  deckContainer.classList.remove('hidden');
  deckButtonDisplay.classList.add('deck-button__display_hidden');
  chooseCards();
};

deckButton.addEventListener('click', visiableDeckContainer);
deskBackground.addEventListener('click', setBg);






// function shuffleArray(arr) {
//   let res = [];
//   let len = arr.length;
//   while (len > 0) {
//     let ndx = Math.floor(Math.random() * len);
//     res.push(arr[ndx]);
//     arr.splice(ndx, 1);
//     len--;
//   }
//   return res;
// }

  // console.log(allStageArrBg);
  // if (allStageArrBg[0].length > 0) {
  //   cardPlace.style.backgroundImage = `url('${allStageArrBg[0][0]}')`;
  //   // allStageArrBg[0].shift(allStageArrBg[0][0]);
  //   allStageArrBg[0].splice(0, 1);
  // }

  // if (allStageArrBg[0].length === 0 && allStageArrBg[1].length > 0) {
  //   cardPlace.style.backgroundImage = `url('${allStageArrBg[1][0]}')`;
  //   // allStageArrBg[1].shift(allStageArrBg[1][0]);
  //   allStageArrBg[1].splice(0, 1);
  // } 

  // if (allStageArrBg[0].length === 0 && allStageArrBg[1].length === 0) {
  //   cardPlace.style.backgroundImage = `url('${allStageArrBg[2][0]}')`;
  //   // allStageArrBg[2].shift(allStageArrBg[2][0]);
  //   allStageArrBg[2].splice(0, 1);
  // }
  // console.log(allStageArrBg);




  // for (let i = iNum; i < ancientsData[gameInformation.numInArr].allGreenCardsCount; i++) {
  //   iNum = i;
  //   let num =  Math.floor(Math.random() * (max - min + 1)) + min;
  //   if (randomNumArr.length === ancientsData[gameInformation.numInArr].allGreenCardsCount) {
  //     return;
  //   } else if (randomNumArr.includes(num)) {
  //     getGreenCardsImgArr();
  //   } else if (randomNumArr.length <= ancientsData[gameInformation.numInArr].allGreenCardsCount) {
  //     // randomNumArr.push(greenCardsData[num].cardFace);
  //     randomNumArr.push(num);
  //   } 
  // }
  // console.log(randomNumArr);
  // return randomNumArr;

  // const getGreenCardsImgArr = () => {
//   let allGreenCardsImgArr = [];
//   for (let i = 0; i <= 17; i++) {
//     allGreenCardsImgArr.push(greenCardsData[i].cardFace);
//   }

//   console.log(allGreenCardsImgArr);
//   return allGreenCardsImgArr;
// };