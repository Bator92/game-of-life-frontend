import {Position} from './position';

export interface Block {
  position: Position;
  aliveCells: boolean[][];
}
