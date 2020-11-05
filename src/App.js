import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { connect, send } from './network';
import { gameService } from './services/game';

import './App.css';
import { Player } from './components/Player';

function App() {
  const [name, setName] = useState('');
  const { room } = useStore(gameService.$);

  useEffect(() => {
    console.log('EFFECT: ', room?.players[0]);
  }, [room?.timestamp]);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const play = () => {
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
          <button type="button" onClick={play}>
            Play
          </button>
        </div>
      )}
      {room?.players && room.players.map((player) => <Player key={player.name} player={player} send={send} />)}
    </div>
  );
}

export default App;
