import React from 'react';
import cn from 'classnames';

import globalStyles from '../../styles/global.module.scss';
import styles from './styles.module.scss';

export const Player = ({ isRunning, send, player }) => {
  const playCard = (id) => {
    send('playCard', id);
  };

  const startGame = () => {
    send('start');
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
