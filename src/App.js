import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';

import { connect, send } from './network';
import { gameService } from './services/game';
import { Status } from './components/Status';
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
    console.log('join game')
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

  const getActivePlayer = () => {
    return room?.players.filter(player => player.id === room?.activePlayerId)[0];
  }

  return (
    <div className="App">
      <p>lets play UNO!</p>
      <Status room={room} onClickHandler={joinGame} onChangeHandler={onChange} />
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
        <p>active player id = {getActivePlayer()?.id}</p>
        {room?.deckSize && room?.sessionId === room?.activePlayerId && getActivePlayer()?.isPickupActive === true ? (
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
