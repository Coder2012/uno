import React, { useState } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';

import { connect, send } from './network';
import { gameService } from './services/game';
import { Player } from './components/Player';

import globalStyles from './styles/global.module.scss';
import './styles/styles.scss';

function App() {
  const [name, setName] = useState('');
  const { room } = useStore(gameService.$);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const joinGame = () => {
    try {
      connect(name);
    } catch (error) {
      console.error(`Error connecting`, error);
    }
  };

  return (
    <div className="App">
      <p>lets play UNO!</p>
      {room === null && (
        <div>
          <input type="text" onChange={onChange} />
          <button type="button" onClick={joinGame}>
            Join Game
          </button>
        </div>
      )}
      <section className={globalStyles.stack}>
      {room?.stack &&
        room.stack.map((card, index) => <div key={card.id} style={{ transform: `translate(-50%, -50%) rotate(${index * 10}deg)` }} className={cn(globalStyles.card, globalStyles[card.className], globalStyles.played)}></div>)}
      </section>
      {room?.players &&
        room.players.map((player) => (
          <Player key={player.name} isRunning={room.isRunning} player={player} send={send} />
        ))}
    </div>
  );
}

export default App;
