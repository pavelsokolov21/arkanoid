import { Brick } from "../../atoms";
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

export type Bricks = Array<Brick[]>;
