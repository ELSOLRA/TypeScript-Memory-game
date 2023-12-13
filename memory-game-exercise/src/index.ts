// if no defer in html, it's possible to throw all ts/js in document.addEventListener('DOMContentLoaded', () => { code here}
const memoryCards = document.querySelectorAll('.memory-card');
let flippedCards: HTMLElement[] = [];                   // more specified HTMLArticleElement
let isFlipped = false;

// Function to shuffle array    ---     Fisher-Yates shuffle function
    function shuffle(array: HTMLElement[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

// List to Array
const memoryCardsArray = Array.from(memoryCards) as HTMLElement[];

shuffle(memoryCardsArray);

// Append shuffled elements back to the DOM
    const memoryCardsContainer = document.querySelector('.memory-cards') as HTMLElement;
    memoryCardsArray.forEach((card) => memoryCardsContainer.append(card));



function flipCard(this: HTMLElement) {
    if (isFlipped || this.classList.contains('flip') || flippedCards.length === 2) return;
    this.classList.add('flip');         // 'this' refers to the current HTML element that triggered the flipCard function
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(() => {
            checkMatch();
        }, 500);
    }
}

function checkMatch () {

    const [card1, card2] = flippedCards;
    const isMatched = card1.dataset.card === card2.dataset.card;

    isMatched ? disableCards() : unflipCards();

    if(checkingWin()) {
        showOverlay();
    }

}

function disableCards() {
    const [card1, card2] = flippedCards;

// Removing click event listener only for the matched cards
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    flippedCards = [];
    isFlipped = false;
}

function unflipCards() {
    setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove('flip'));
        flippedCards = []; // Clear the flipped cards array after unflipping
        isFlipped = false;
    }, 500);
}

function checkingWin() {
    return document.querySelectorAll('.flip').length === memoryCards.length;
}

function showOverlay() {
    const overlay = document.querySelector('.overlay');
    (overlay as HTMLElement).classList.add('show');     // tells TypeScript to treat overlay as an HTMLElement and not consider the possibility of it being null
}

memoryCards.forEach((card) => card.addEventListener('click', flipCard));

const closeOverlay = document.querySelector('.overlay .close');
if (closeOverlay) {
    closeOverlay.addEventListener('click', () => {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('show');
            location.reload();
        }
    });
}
/* function resetGame() {
    memoryCards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

const closeOverlay = document.querySelector('.overlay .close');
if (closeOverlay) {
    closeOverlay.addEventListener('click', resetGame);
}
*/