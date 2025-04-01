let colors = ['red', 'green', 'yellow', 'blue', 'orange', 'white', 'pink', 'black'];
let cells = document.querySelectorAll('.cell');
let timer = document.getElementById('display');
let colorButton = '';
let answers = []
let time = 0;
let stopwatch;

const everyEquals = array => array.every(item => item === array[0]);

const checkToWin = buttons => Array.from(buttons).every(button => button.disabled);

const extractNumbers = string => parseInt(string.replace(/\D/g, ''));

const hitThePair = array => {
  array.forEach(button => {
    button.disabled = true;
  });
}

const backToGray = array => {
  array.forEach(button => {
    setTimeout(() => {
      button.style.backgroundColor = '#778899';
      button.disabled = false;
    }, 250);
  });
}

const reset = () => {
  location.reload(true);
}

const pressButton = () => {
  let allBtns = document.querySelectorAll('.cell');
  let move = []
  let compare = []
  let win = ''

  allBtns.forEach(button => {
    button.addEventListener('click', function() {
      this.style.backgroundColor = answers[extractNumbers(this.textContent)]

      compare.push(this.style.backgroundColor);
      move.push(this)
      this.classList.add('desabilitado');

      if (compare.length == 2) {
        if (everyEquals(compare)) {
          hitThePair(move)
          compare = []
          move = []
          win = checkToWin(cells)
          if (win) {
            let container = document.querySelector('.container');
            const imagem = document.createElement('img');
            imagem.src = 'images/congratulations.jpeg';
            container.appendChild(imagem);
            stopStopwatch();
            setInterval(blinkStopwatch, 600);
          }
        } else {
          backToGray(move);
          move = [];
          compare = [];
        }
      }
    });
  });
}

const startGame = () => {
  let buttonStart = document.getElementById('start');
  buttonStart.disabled = true;

  colorsCopy = colors.concat(colors)
  colorsCopy = colorsCopy.sort(() => Math.random() - 0.5);
  answers = colorsCopy;

  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = colorsCopy[i]
    cells[i].disabled = false;
  }

  setTimeout(() => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = '#778899';
    }
  }, 250);

  startStopwatch()
}

const formatTime = seconds => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secondsLeft = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

const startStopwatch = () => {
  stopwatch = setInterval(() => {
    time++;
    document.getElementById('display').textContent = formatTime(time);
  }, 1000);
}

const stopStopwatch = () => {
  clearInterval(stopwatch);
}

const blinkStopwatch = () => {
  if (timer.style.visibility === 'hidden') {
    timer.style.visibility = 'visible';
  } else {
    timer.style.visibility = 'hidden';
  }
}

pressButton()

cells.forEach(button => {
  button.disabled = true;
});
