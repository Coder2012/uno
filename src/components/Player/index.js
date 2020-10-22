import React from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';

import styles from '../../styles/global.module.scss';

export const Player = ({ player }) => {
  const getCards = () => {};

  return (
    <div>
      <button type="button" onClick={getCards}>
        Get Cards
      </button>
      <p>{player.name}</p>
      <ul>
        {player.cards
          ? player.cards.map((card) => (
              <li key={card.id}>
                <button className={cn(styles.card, styles[card.className])} type="button">
                  id:{card.id} {card.color} {card.value && card.value}
                </button>
              </li>
            ))
          : [...(new Array(player.cardsLength))].map((_, index) => <li key={index} className={styles.card}></li>)}
      </ul>
    </div>
  );
};
