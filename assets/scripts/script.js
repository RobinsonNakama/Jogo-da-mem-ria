const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"





startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());

}

function initializeCards(card) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);


    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}





function flipCard() {
    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondeCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }
            else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondeCardView = document.getElementById(game.secondeCard.id);

                    firstCardView.classList.remove('flip');
                    secondeCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById ("gameOver");
    gameOverLayer.style.display = 'none';
}