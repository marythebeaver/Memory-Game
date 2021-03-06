/*
 * create an array cardDesk that holds all the cards
 */
let par = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
            'fa-leaf', 'fa-bicycle','fa-bomb'];
let cardDesk = par.concat(par);

/*
 * Functions
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// start Game finction, for randomly displaying cards
function startGame() {
  randomCards = shuffle(cardDesk);

  let htmlContent = randomCards.map(function(eachCard){
    return `<li class="card"><i class="fa ${eachCard}"></i></li>`;
  });

  document.querySelector('.deck').innerHTML = htmlContent.join('');
  initTime();
}

// End Game finction
function endGame(moves, stars, seconds) {

  // add a selectors for selecting the message to be show after 1 sec
  setTimeout(function showMessage() {
    const h3s = document.querySelectorAll('h3');
    document.querySelector('h2').classList.remove("hide");
    document.querySelector('.cover').classList.remove("hide");
    document.querySelector('.box').classList.remove("hide");
    document.querySelector('.button').classList.remove("hide");
    h3s.forEach(function(h3){
    h3.classList.remove("hide");
    })

    // edit message with the game info
    document.querySelector('.record').textContent = 'With ' + moves +
        ' Moves, ' + seconds + ' Seconds and ' + stars + ' Stars.';
  }, 1000);
}

// init timer function
let timer = setInterval(initTime, 1000);
let second = 0

function initTime() {
  document.querySelector('.timer').textContent = second;
  second = second + 1
}

// stop timer function
function StopTime() {
  clearInterval(timer);
}


/*
 * start game
 */
startGame();

/*
 * set variable for listener
 */

// allcards: add a selector for selecting all the cards
// moves: add a selector for selecting the moves number
// i is the open card counter
// m is the total click motion counter
const allcards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
let i = 0
let m = 0
let s = 3
let first_card = []

/*
 * a listener used to listen all the cards by each
 */
allcards.forEach(function(card){

  card.addEventListener('click', function () {
    i = i + 1;
    console.log('click event'+ i);

    // open the card if the click number is under 2, ignore clicks more than 2
    if (i < 3){
      card.classList.add("open", "show");
      m = m + 1;

      // change moves number and determine rating
      moves.textContent = m;

      if (m == 21){
        document.querySelector('.fa-star').classList.remove("fa-star");
        s = 2;
      }

      if (m == 35){
        document.querySelector('.fa-star').classList.remove("fa-star");
        s = 1;
      }

      // record the first opened card's info
      if (i == 1){
        first_card = card;
      }

      // when there's two open cards
      else{

        // determine wheterht the open cards are matched, if so, turn it into match card
        // determine whether all cards matched
        if (first_card.querySelector('i').classList.item(1) == card.querySelector('i').classList.item(1)){
          console.log('match!')
          card.classList.add("match");
          first_card.classList.add("match");

          if (document.querySelectorAll('.match').length == 16){
            console.log('all finished');
            StopTime();
            seconds = document.querySelector('.timer').textContent
            endGame(m, s, seconds);
          }
        }

        // close the opened cards after 1 second
        setTimeout(function closeCard() {
          card.classList.remove("open", "show");
          first_card.classList.remove("open", "show");

        // reset i to start another run
        i = 0;

        }, 1000);
      }
    }
  });
})
