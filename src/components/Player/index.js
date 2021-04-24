import React from 'react';
import cn from 'classnames';

import globalStyles from '../../styles/global.module.scss';
import styles from './styles.module.scss';

export const Player = ({ isRunning, isActive, send, player }) => {
  const playCard = (id) => {
    send('playCard', id);
  };

  const startGame = () => send('start');
  const ready = () => send('ready');
  const pass = () => send('pass');

  const hasStartOption = () => {
    return isRunning === false && player.id && player.isOwner;
  };

  const hasReadyOption = () => {
    return isRunning === false && player.isReady === false && player.isOwner === false;
  };

  const isVisibleToPlayer = () => player.id?.includes(player.friendlyId);

  return (
    <div>
      <p>
        Name {player.name}: friendly {player.friendlyId} : id {player.id}
        {hasReadyOption() && isVisibleToPlayer() && (
          <button type="button" onClick={ready}>
            Ready {player.id}
          </button>
        )}
      </p>

      {hasStartOption() && isVisibleToPlayer() && (
        <button type="button" onClick={startGame}>
          Start Game {player.id}
        </button>
      )}

      {isVisibleToPlayer() && player.isPickupActive && (
        <button type="button" onClick={pass}>
          Pass {player.id}
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
              ></button>
            ))
          : [...new Array(player.cardsLength)].map((_, index) => <div key={index} className={globalStyles.card}></div>)}
      </section>
    </div>
  );
};
