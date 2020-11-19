import { $game as $ } from './store';
import { networkUpdate, colorRequested } from './events';

export const gameService = {
  $,
  networkUpdate,
  colorRequested,
};
