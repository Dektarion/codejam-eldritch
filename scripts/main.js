import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import blueCardsData from '../data/mythicCards/blue/index.js'
import brownCardsData from '../data/mythicCards/brown/index.js'
import greenCardsData from '../data/mythicCards/green/index.js'

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

let gameInformation = {
  idGod: '',
  idDifficulty: '',
  numInArr: 0,
}

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
}

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

const getGreenCardsImgArr = () => {
  const min = Math.ceil(0);
  const max = Math.floor(17);
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
}

const getBrownCardsImgArr = () => {
  const min = Math.ceil(0);
  const max = Math.floor(20);
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
}

const getBlueCardsImgArr = () => {
  const min = Math.ceil(0);
  const max = Math.floor(11);
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
}

const getImgArr = () => {
  let allChosenCardsArr = [];

  allChosenCardsArr.push(getGreenCardsImgArr());
  allChosenCardsArr.push(getBrownCardsImgArr());
  allChosenCardsArr.push(getBlueCardsImgArr());

  return allChosenCardsArr;
}


const getCardsForFirstStage = () => {
  let firstStageArr = [];
  let allChosenCardsArr = getImgArr();


  for (let i = 0; i < ancientsData[gameInformation.numInArr].firstStage.greenCards; i++) {
    firstStageArr.push(allChosenCardsArr[0][0].pop);
  }

}

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
        // console.log(difficulties[2].id);
        getImgArr();
        getCardsForFirstStage();
        break;
      case difficulties[3].id :
        console.log(difficulties[3].id);
        break;
      case difficulties[4].id :
        console.log(difficulties[4].id);
        break;
    }
    // console.log(ancientsData[0].allCardsCount)
  } else if (gameInformation.idGod === ancientsData[1].id) {
    console.log(ancientsData[0].allGreenCardsCount)
  } else if (gameInformation.idGod === ancientsData[2].id) {
    console.log(ancientsData[0].allBrownCardsCount)
  } else if (gameInformation.idGod === ancientsData[3].id) {
    console.log(ancientsData[0].allBlueCardsCount)
  }
}

const visiableDeckContainer = () => {
  deckContainer.classList.remove('hidden');
  deckButtonDisplay.classList.add('deck-button__display_hidden');
  chooseCards();
};

deckButton.addEventListener('click', visiableDeckContainer);












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