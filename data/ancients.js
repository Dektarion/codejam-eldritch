import ancients from '../assets/Ancients/index.js';

const ancientsData = [
  {
    id: 'azathoth',
    name: 'azathoth',
    cardFace: ancients.azathoth,
    firstStage: {
      greenCards: 1,
      blueCards: 1,
      brownCards: 2,
      allCards: 4,
    },
    secondStage: {
      greenCards: 2,
      blueCards: 1,
      brownCards: 3,
      allCards: 6,
    },
    thirdStage: {
      greenCards: 2,
      blueCards: 0,
      brownCards: 4,
      allCards: 6,
    },
    allCardsCount: 16,
    allGreenCardsCount: 5,
    allBrownCardsCount: 9,
    allBlueCardsCount: 2,
  },
  {
    id: 'cthulhu',
    name: 'cthulhu',
    cardFace: ancients.cthulhu,
    firstStage: {
      greenCards: 0,
      blueCards: 2,
      brownCards: 2,
      allCards: 4,
    },
    secondStage: {
      greenCards: 1,
      blueCards: 0,
      brownCards: 3,
      allCards: 4,
    },
    thirdStage: {
      greenCards: 3,
      blueCards: 0,
      brownCards: 4,
      allCards: 7,
    },
    allCardsCount: 15,
    allGreenCardsCount: 4,
    allBrownCardsCount: 9,
    allBlueCardsCount: 2,
  },
  {
    id: 'iogSothoth',
    name: 'iogSothoth',
    cardFace: ancients.iogSothoth,
    firstStage: {
      greenCards: 0,
      blueCards: 1,
      brownCards: 2,
      allCards: 3,
    },
    secondStage: {
      greenCards: 2,
      blueCards: 1,
      brownCards: 3,
      allCards: 6,
    },
    thirdStage: {
      greenCards: 3,
      blueCards: 0,
      brownCards: 4,
      allCards: 7,
    },
    allCardsCount: 16,
    allGreenCardsCount: 5,
    allBrownCardsCount: 9,
    allBlueCardsCount: 2,
  },
  {
    id: 'shubNiggurath',
    name: 'shubNiggurath',
    cardFace: ancients.shubNiggurath,
    firstStage: {
      greenCards: 1,
      blueCards: 1,
      brownCards: 2,
      allCards: 4,
    },
    secondStage: {
      greenCards: 3,
      blueCards: 1,
      brownCards: 2,
      allCards: 6,
    },
    thirdStage: {
      greenCards: 2,
      blueCards: 0,
      brownCards: 4,
      allCards: 6,
    },
    allCardsCount: 16,
    allGreenCardsCount: 6,
    allBrownCardsCount: 8,
    allBlueCardsCount: 2,
  },
];

export default ancientsData