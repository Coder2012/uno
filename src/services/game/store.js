import { domain } from '../domain';
import { networkUpdate } from './events';

const initialState = {
  room: null,
};

export const $game = domain
  .createStore(initialState, { name: 'game store' })
  .on(networkUpdate, (state, room) => ({ ...state, room }));
