import { useState } from 'react';
import './App.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import { getRandomNumber } from './utils/randomNumbers';
import Card from './Card';

const suites = ['Spade', 'Diamond', 'Club', 'Heart'];

function App() {
  const [allCards, setAllCards] = useState(() => {
    let cards = [];
    for (let i = 0; i < 52; i++) {
      const suiteIndex = parseInt(i / 13);
      const number = (i % 13) + 1;
      const card = {
        suite: suites[suiteIndex],
        number,
        drawn: false,
        order: undefined,
      }
      cards.push(card);
    }
    return cards;
  });

  const handleDrawCards = () => {
    const remainingCards = allCards.filter((card, index) => !card.drawn);
    const remainingCardsLength = remainingCards.length;
    let order = allCards.length - remainingCards.length;
    if (remainingCardsLength > 0) {
      let generateRandomNumberCount = 0;
      let randomSelection = [];
      let selectedCards = [];
      while (generateRandomNumberCount < 5 && generateRandomNumberCount < remainingCardsLength) {
        let randomIndex = getRandomNumber(0, remainingCardsLength);
        if (!randomSelection.includes(randomIndex)) {
          randomSelection.push(randomIndex);
          selectedCards.push(remainingCards[randomIndex]);
          generateRandomNumberCount++;
        }
      }
      const updatedAllCards = allCards.map((card) => {
        const isSelected = selectedCards.filter((selectedCard) => selectedCard.suite === card.suite && selectedCard.number === card.number);
        if (isSelected.length) {
          card.drawn = true;
          card.order = order++;
        }
        return card;
      });

      setAllCards(updatedAllCards);
    } else {
      alert('All Cards Drawn')
    }
  }


  return (
    <div className="appContainer">
      <button onClick={handleDrawCards}>Draw Cards</button>
      <h1>Drawn Cards</h1>
      <div className="cardsContainer">
        {
          allCards.filter(card => card.drawn).sort((card1, card2) => card1.order - card2.order).map((card, index) => <Card key={`${card.suite}${index}`} card={card} />)
        }
      </div>
    </div>
  );
}

export default App;
