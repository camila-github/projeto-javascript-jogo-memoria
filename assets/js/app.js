/* Fetch elements in the html */
const gameScreen = document.getElementById('game');

/* Lets recreate welcome screen using vanilla javascript */
const welcomeScreen = () => {

    const welcome = document.createElement('div');
    welcome.classList.add('welcomeScreen');

    const gameLogo = document.createElement('p');
    gameLogo.setAttribute('class','gamelogo');
    gameLogo.innerText="Jogo da Memoria";

    const but = document.createElement('button');
    but.setAttribute('id', 'start');
    but.innerText="Play";

    const br = document.createElement('br');

    /* Append every element to each other */
    gameScreen.appendChild(welcome);
    welcome.appendChild(gameLogo);
    welcome.appendChild(br);
    welcome.appendChild(but);

    /* call playGame function when clicking a button and hides welcome screen */
    but.addEventListener('click', () => { 
        welcome.classList.add('hide');
        setTimeout(gameStart, 500);
    });
}

/* functions that starts a game */
let gameStart = function(){

    /* Create a section with a class of grid-game */
    const gameGrid = document.createElement('section');
    gameGrid.setAttribute('class','grid-game');
    gameScreen.appendChild(gameGrid);

    /* lets duplicate the cards array */
    let doubleCards = cards.concat(cards);

    /* game variables */
    let gameCount = 0;
    let firstGuess = '';
    let secondGuess = '';
    let congratsGame = 0;
    let previousClick = null;
    let gameDelay = 1200;

    /* create a match function */ 
    const gameMatch = () => {
        let select = document.querySelectorAll('.selected');
        select.forEach((card) => card.classList.add('match'));
    }

    /* create a reset function */ 
    const gameReset = () => {
        gameCount = 0;
        firstGuess = '';
        secondGuess = '';
        previousClick = null;        
        let select = document.querySelectorAll('.selected');
        select.forEach((card) => card.classList.remove('selected'));
    }

    /* shuffles the cards every reload of the page */
    doubleCards.sort(() => 0.5 - Math.random());

    /* for every items inside the card lets create in html */
    doubleCards.forEach((item) => {
        let name = item.name;
        let backgroundImage = `url(${item.img})`;

        const gameCard = document.createElement('div');
        gameCard.classList.add('card');
        gameCard.dataset.name = name;

        const frontCard = document.createElement('div');
        frontCard.classList.add('frontCard');

        const backCard = document.createElement('div');
        backCard.classList.add('backCard');
        backCard.style.backgroundImage = backgroundImage;

        gameGrid.appendChild(gameCard);
        gameCard.appendChild(frontCard);
        gameCard.appendChild(backCard);
    });

    /* when clicking each card */
    gameGrid.addEventListener('click', (e) => {
        let click = e.target;

        if(!(click.nodeName == 'SECTION' || 
            click == previousClick || 
            click.parentNode.classList.contains('selected') || 
            click.parentNode.classList.contains('match'))){

                if(gameCount < 2){
                    gameCount++;
                    if(gameCount === 1){
                        firstGuess = click.parentNode.dataset.name;
                        click.parentNode.classList.add('selected');
                    }else {
                        secondGuess = click.parentNode.dataset.name;
                        click.parentNode.classList.add('selected');
                    }
        
                    if(firstGuess !== '' && secondGuess !== ''){
                        if(firstGuess === secondGuess){
                            congratsGame++;                 
                            setTimeout(gameMatch, gameDelay);
                            setTimeout(gameReset, gameDelay);
                        }else {
                            setTimeout(gameReset, gameDelay);
                        }
                    }
                    previousClick = click;
                } 
                
                if(congratsGame == cards.length){
                    gameGrid.classList.add('hide');
                    setTimeout(gameFinish, 1400);
                }
        }
    });
}

const gameFinish = () => { 
    const finish = document.createElement('div');
    finish.classList.add('finishScreen');
    finish.innerText = "Parabens!!!";
    gameScreen.appendChild(finish);  
}

/* Call the function */
window.onload = () => welcomeScreen();