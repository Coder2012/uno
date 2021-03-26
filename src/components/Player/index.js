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

  const ready = () => {
    send('ready');
  }

  return (
    <div>
      <p>
        Name {player.name}: friendly {player.friendlyId} : id {player.id}
        {!isRunning && !player.isReady && !player.isOwner && <button type="button" onClick={ready}>
         Ready {player.id}
        </button>}
      </p>

      {!isRunning && player.id && player.isOwner && (
        <button type="button" onClick={startGame}>
          Start Game {player.id}
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
                title={`id:${card.id} ${card.color} ${card.value && card.value} ${card.action?.type}`}
              >
              </button>
            ))
          : [...new Array(player.cardsLength)].map((_, index) => <div key={index} className={globalStyles.card}></div>)}
      </section>
    </div>
  );
};
