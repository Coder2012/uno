import React, { useEffect, useState } from 'react';
import {gameService} from '../../services/game';
import cn from 'classnames';

import { ColorSelector } from '../ColorSelector';

import globalStyles from '../../styles/global.module.scss';
import styles from './styles.module.scss';

export const Player = ({ isRunning, send, player }) => {
  const [showColorSelector, setShowColorSelector] = useState(false);

  useEffect(() => {
    gameService.colorRequested.watch(_ => {
      setShowColorSelector(true);
    });
  }, []);

  const playCard = (id) => {
    send('playCard', id);
  };

  const startGame = () => {
    send('start');
  };

  const handleColorSelector = (colorId) => {
    setShowColorSelector(false);
    send('colorSelected', colorId);
  };

  return (
    <div>
      <p>
        {player.name}:{player.id}
        {!isRunning && !player.isOwner && ' Waiting...'}
      </p>
      {!isRunning && player.id && player.isOwner && (
        <button type="button" onClick={startGame}>
          Start Game
        </button>
      )}
      {showColorSelector && <ColorSelector clickHandler={handleColorSelector} />}
      <ul className={styles.cards}>
        {player.cards
          ? player.cards.map((card) => (
              <li key={card.id}>
                <button
                  onClick={() => playCard(card.id, card.action?.type)}
                  className={cn(globalStyles.card, globalStyles[card.className])}
                  type="button"
                >
                  id:{card.id} {card.color} {card.value && card.value} {card.action?.type}
                </button>
              </li>
            ))
          : [...new Array(player.cardsLength)].map((_, index) => <li key={index} className={globalStyles.card}></li>)}
      </ul>
    </div>
  );
};
