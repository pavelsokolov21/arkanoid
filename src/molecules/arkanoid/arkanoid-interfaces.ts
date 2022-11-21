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
  subBoardsPositions: BoardPositions[];
}

export type Bricks = Array<Brick[]>;

export type XRatios = 0 | 0.5 | 1 | -0.5 | -1;
