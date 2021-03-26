import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';

import { connect, send } from './network';
import { gameService } from './services/game';
import { Player } from './components/Player';
import { ColorSelector } from './components/ColorSelector';

import globalStyles from './styles/global.module.scss';
import './styles/styles.scss';

function App() {
  const [name, setName] = useState('');
  const [showColorSelector, setShowColorSelector] = useState(false);
  const { room } = useStore(gameService.$);

  useEffect(() => {
    gameService.colorRequested.watch((_) => {
      setShowColorSelector(true);
    });
  }, []);

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

  const handleColorSelector = (colorId) => {
    setShowColorSelector(false);
    send('colorSelected', colorId);
  };

  const getCard = () => {
    send('getCard');
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
          room.stack.map((card, index) => (
            <div
              key={card.id}
              style={{ transform: `translate(-50%, -50%) rotate(${index * 10}deg)` }}
              className={cn(globalStyles.card, globalStyles[card.className], globalStyles.played)}
            ></div>
          ))}
      </section>
      <section className={globalStyles.deck}>
        sessionId: {room?.sessionId}
        activePlayerId: {room?.activePlayerId}
        {room?.deckSize && room?.sessionId === room?.activePlayerId ? (
          <button onClick={() => getCard()} className={globalStyles.card} type="button"></button>
        ) : (
          <div className={globalStyles.card}></div>
        )}
      </section>
      {showColorSelector && <ColorSelector clickHandler={handleColorSelector} />}
      {room?.players &&
        room.players.map((player) => (
          <Player
            key={player.name}
            send={send}
            isRunning={room?.isRunning}
            isActive={player.friendlyId === room?.activeFriendlyId}
            onMessage={room?.onMessage}
            player={player}
          />
        ))}
      onMessage:{room?.onMessage}
      send:{room?.send}
    </div>
  );
}

export default App;
