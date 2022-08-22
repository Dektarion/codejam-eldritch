import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';

const ancientsContainer = document.querySelector('.ancients__display');
const difficultyButtonsContainer = document.querySelector('.difficulty__display');
const ancients = document.querySelectorAll('.ancients');
const difficultyButtons = document.querySelectorAll('.difficulty__buttons');
const deckButtonDisplay = document.querySelector('.deck-button__display');
const deckContainer = document.querySelector('.deck__container');
const deckButton = document.querySelector('.deck-button');

const activeAncient = (event) => {
  for (let element of ancients) {
    element.classList.remove('active_ancient');
  }
  if (event.target.classList.contains('ancients')) {
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
    event.target.classList.add('difficulty__buttons_active');
    deckButtonDisplay.classList.remove('deck-button__display_hidden');
    deckContainer.classList.add('hidden');
  }
};

ancientsContainer.addEventListener('click', activeAncient);
difficultyButtonsContainer.addEventListener('click', activeDifficultyButtons);

const visiableDeckContainer = () => {
  deckContainer.classList.remove('hidden');
  deckButtonDisplay.classList.add('deck-button__display_hidden');
};

deckButton.addEventListener('click', visiableDeckContainer);

