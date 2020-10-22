import * as Colyseus from 'colyseus.js';
import { gameService } from '../services/game';

let room;

export const connect = async (name) => {
  const client = new Colyseus.Client(process.env.UNO_SERVER || 'ws://localhost:2567');

  room = await client.joinOrCreate('uno', { name });
  room.onStateChange((state) => {
    console.log(state);
    gameService.networkUpdate({ ...state, timestamp: Date.now() });
  });
};