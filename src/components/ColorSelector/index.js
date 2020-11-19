import React from 'react';
import styles from './styles.module.scss';

export const ColorSelector = ({clickHandler}) => {
  return (
    <section className={styles.container}>
      <button id="green" onClick={() => clickHandler('green')} type="button" className={styles.green}>Green</button>
      <button id="red" onClick={() => clickHandler('red')} type="button" className={styles.red}>Red</button>
      <button id="blue" onClick={() => clickHandler('blue')} type="button" className={styles.blue}>Blue</button>
      <button id="yellow" onClick={() => clickHandler('yellow')} type="button" className={styles.yellow}>Yellow</button>
    </section>
  );
};
