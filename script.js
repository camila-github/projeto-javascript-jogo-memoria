/* Elemento da DOM*/
const cards = document.querySelectorAll('.card');
const cardsLength = document.querySelectorAll('.card').length;

/* Declaracao das variaveis*/
let hasFlippedCard = false;
let firstCard, secondCard; //utilizado para a primeira e segunda carta
let lockBoard = false; //Usado para bloquear o tabuleiro

//Função que checa se as cartas são iguais
const checkForMatch = () => (firstCard.dataset.card === secondCard.dataset.card) ? disableCards() : unflipCards();

/*Função que desabilita as cartas. Remove o evento do clique, e a função flipCard()*/
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

/*Função que reseta o tabuleiro. As variáveis 'firstCard' e 'secondCard' precisam ser resetadas após cada rodada. 
É criado um método 'resetBoard()', e depois é extraido 'hasFlippedCard = false' e lockBoard = false' para esse metodo. 
É utilizado o 'destructuring assignment' do ES6: [var1, var2] = ['value1', 'value2']*/
const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*Função para virar carta. A classe 'flip' será adicionada ao elemento. É selecionado todos os elementos '.card' com 
'document.querySelectorAll', através da lista com 'forEach', é adicionado o detector de evento com 'addEventListener'. 
Toda vez que uma carta for clicada a função 'flipCard' será chamada. A variável 'this' representa a carta que foi clicada. 
A função acessa a lista de classes do elemento (classList), se a classe 'flip' não estiver na lista, ela é adicionada 
e se estiver, é retirada*/
function flipCard() {
    /*Ao clicar na segunda carta, é setado o 'lockBoard' como true e a condição 'if (lockBoard) returna o bloqueio'.
    Isso previne que qualquer outra carta seja virada até que as cartas desvirem.*/
    if (lockBoard) return;
    /*Evita o duplo clique na mesma carta apos virada, validação apenas na primeira carta*/
    if (this === firstCard) return;
    /*  '.add'  :  permite clicar apenas uma vez na carta. Se usasse o  '.toggle', iria permitir clicar 
    duas vezes, mas no jogo, a logica é clicar uma vez na carta por isso o uso do  '/.add'*/
    this.classList.add('flip');
    /* O 'hasFlippedCard', é para verificar se a carta esta virada, o valor se inica 'false'
    Ao iniciar o jogo, a 'hasFlippedCard', entrará no if, e atribuira 'true', para o 'hasFlippedCard',
    ainda no mesmo jogo nas proximas carta, o if nao será executado.*/
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    /* O 'hasFlippedCard', a partir da segunda carta, será 'false', será mantido esse valor ate o jogo ser reiniciado.*/
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

/*Funcão que desvira as cartas, caso as cartas nao sejam iguais.
Em cada carta retira a class 'Flip'*/
function unflipCards() {
    lockBoard = true; //Antes de desvirar as cartas, adiciona true para bloquear o tabuleiro

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //Depois de desvirar as cartas, adiciona false para desbloquear o tabuleiro
        lockBoard = false;
        resetBoard();
    }, 1500);
}

/*Função que embaralha as cartas. Quando 'display: flex' é declarada no container, 'flex-items' são ordenados 
a partir da seguinte hierarquia: 'ordem de grupo' e de 'código fonte'. Cada grupo é definido pela propriedade 
'order', que possui como valor um número inteiro, positivo ou negativo. O grupo seria nesse caso as 'divs' 
que tem as imagens do tabuleiro. Cada 'div', tem um valor, conforme a ordem que aparece no 'display: flex',
O valor default é '0', o que significa que todos os elementos pertencem ao mesmo grupo e serão ordenados pela 
ordem em que aparecem no código fonte. Se existir mais de um grupo, os elementos são primeiro 'ordenados 
ascendentemente por grupo'. Será utilizado o forEach para iterar as cartas do tabuleiro, e gerar um número 
aleatório (conforme a quantidade de imagens que tem no tabuleiro - se tem 6 imagens será gerado uma numeracao
de 0 a 6), e atribuir na propriedade 'order'*/
/*Math.random gera numero aleatorio, multiplicado de acordo com a quantidade de cartas*/
/*Math.floor : arredonda o resultado da expressão Math.random*/
(function shuffle() {
    cards.forEach((card) => card.style.order = Math.floor(Math.random() * cardsLength));
})();

//Adiciona evento de clique na carta. O 'forEach', é para que o evento seja aplicado em todas as cartas
cards.forEach((card) => card.addEventListener('click', flipCard));