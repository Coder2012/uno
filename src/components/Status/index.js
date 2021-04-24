import React from 'react';

export const Status = ({room, onChangeHandler, onClickHandler}) => {
  return (
  <section>
    {room === null ? (
      <div>
        <input type="text" onChange={onChangeHandler} />
        <button type="button" onClick={onClickHandler}>
          Join Game
        </button>
      </div>
    ):room.players.map(player => <p key={player.friendlyId}>{player.isOwner ? `Host: ${player.name}` : `Player: ${player.name}`}</p>)
    }
  </section>
  )
}
