import React from 'react';
import cn from 'classnames';

import globalStyles from '../../styles/global.module.scss';
import styles from './styles.module.scss';

export const Player = ({ isRunning, isActive, send, player }) => {
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

      <section className={cn(styles.cards, { [styles.isActive]: isActive })}>
        {player.cards
          ? player.cards.map((card) => (
              <button
                key={card.id}
                onClick={() => playCard(card.id)}
                className={cn(globalStyles.card, globalStyles[card.className], styles.card)}
                type="button"
              >
                id:{card.id} {card.color} {card.value && card.value} {card.action?.type}
              </button>
            ))
          : [...new Array(player.cardsLength)].map((_, index) => <div key={index} className={globalStyles.card}></div>)}
      </section>
    </div>
  );
};
