import * as Colyseus from 'colyseus.js';
import { gameService } from '../services/game';

let room;

export const connect = async (name) => {
  const client = new Colyseus.Client(process.env.REACT_APP_UNO_SERVER || 'ws://localhost:8080');
  console.log(process.env.REACT_APP_UNO_SERVER);

  room = await client.joinOrCreate('uno', { name });
  room.onStateChange((state) => {
    console.log('state:', state);
    gameService.networkUpdate({ ...state, timestamp: Date.now(), sessionId: room.sessionId });
  });

  room.onMessage('getColor', (cardId) => {
    gameService.colorRequested(cardId);
  });
};

export const send = (type, payload) => {
  room.send(type, payload);
};
