import { words } from './dictionnary.js';

const LIFE = 6;
const keyboard = document.querySelector('.keyboard');
const wordContainer = document.querySelector('.guess');
const result = document.querySelector('.result');
const img = document.querySelector('img');
let index = 0;
let secretWordArray = [];
let guess = [];
let lifePoints = LIFE;

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

let secretWord = getRandomWord(words);

const displayKeys = () => {
  const btnsHTML = 'azertyuiopqsdfghjklmwxcvbn'
    .split('')
    .map(
      (key) =>
        `<button type="button" data-key="${key}" class="key"><kbd>${key}</kbd></button>`
    )
    .join('');

  keyboard.innerHTML = btnsHTML;

  const btns = document.querySelectorAll('button[data-key]');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      checkGuess(e.currentTarget);
      encodeURI, endTheGame();
    });
  });
};

const setup = () => {
  secretWordArray = secretWord.split('').map((_) => '_');

  wordContainer.innerHTML = secretWordArray.join(' ');

  displayKeys();
};

const checkGuess = (element) => {
  if (element) {
    const key = element.dataset.key;

    if (!secretWord.includes(key) && !guess.includes(key)) {
      lifePoints--;
      if (index < 6) {
        index++;
      }

      img.src = `./images/${index}.jpg`;
    }

    if (!guess.includes(key)) {
      guess[guess.length] = key;
      element.disabled = true;
    }

    if (secretWord.includes(key)) {
      secretWordArray = secretWord.split('').map((letter) => {
        if (guess.includes(letter)) {
          return letter;
        } else {
          return '_';
        }
      });
    }

    wordContainer.innerHTML = secretWordArray.join(' ');
  }
};

const endTheGame = () => {
  const win = secretWord.split('').every((letter) => guess.includes(letter));
  let isEnd = false;

  if (lifePoints < 1 || (win && lifePoints >= 0)) {
    isEnd = true;
  } else {
    isEnd = false;
  }

  if (isEnd) {
    displayResult();

    keyboard.innerHTML =
      "<button type='button' class='restart'>Recommencer</button>";

    const restartBtn = document.querySelector('.restart');

    restartBtn.addEventListener('click', () => {
      restart();
    });
  }
};

const displayResult = () => {
  if (lifePoints <= 0) {
    wordContainer.textContent = secretWord;
    wordContainer.style.color = 'red';
    result.textContent = `Vous êtes pendu :'( Le mot à trouver était ${secretWord}.`;
  } else {
    result.textContent = `Félicitations, vous avez trouvé le mot ${secretWord} !`;
    wordContainer.style.color = 'green';
  }
};

const restart = () => {
  lifePoints = LIFE;
  guess = [];
  result.innerHTML = '';
  secretWord = getRandomWord(words);
  index = 0;
  img.src = `./images/${index}.jpg`;
  wordContainer.style.color = 'black';

  setup();
};

setup();

window.addEventListener('keypress', (e) => {
  const element = document.querySelector(
    `button[data-key="${e.key.toLocaleLowerCase()}"`
  );

  checkGuess(element);
  encodeURI, endTheGame();
});
