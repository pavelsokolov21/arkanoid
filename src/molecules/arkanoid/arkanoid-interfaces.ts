import {
  BallPositions,
  BoardPositions,
  Brick,
  BrickPositions,
} from "../../atoms";
import { Position } from "../../interfaces";
import { BALL_DIRECTIONS_X, BALL_DIRECTION_Y } from "./arkanoid-constants";

export interface ArkanoidProps {
  canvas: HTMLCanvasElement;
}

export interface BrickStatus {
  leftTop: Position;
  rightTop: Position;
  leftBottom: Position;
  rightBottom: Position;
  isBroken: boolean;
}

export interface BallDirections {
  x: BALL_DIRECTIONS_X;
  y: BALL_DIRECTION_Y;
}

export interface PositionsOfElements {
  ballPositions: BallPositions;
  brickPositions: BrickPositions;
  boardPosition: BoardPositions;
}

export type Bricks = Array<Brick[]>;
