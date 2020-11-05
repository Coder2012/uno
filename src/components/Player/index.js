import React from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';

import styles from '../../styles/global.module.scss';

export const Player = ({ player, send }) => {
  const getCard = () => {
    send('getCard');
  };

  const ready = () => {
    send('ready', true);
  };

  return (
    <div>
      <button type="button" onClick={getCard}>
        Get Card
      </button>
      {player.id && (
        <button type="button" onClick={ready}>
          Ready {player.name}
        </button>
      )}
      <p>
        {player.name}:{player.id}
      </p>
      <ul>
        {player.cards
          ? player.cards.map((card) => (
              <li key={card.id}>
                <button className={cn(styles.card, styles[card.className])} type="button">
                  id:{card.id} {card.color} {card.value && card.value}
                </button>
              </li>
            ))
          : [...new Array(player.cardsLength)].map((_, index) => <li key={index} className={styles.card}></li>)}
      </ul>
    </div>
  );
};
