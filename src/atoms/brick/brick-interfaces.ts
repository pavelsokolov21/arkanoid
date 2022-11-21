import { COLORS } from "../../constants";
import { Position } from "../../interfaces";

export interface BrickProps {
  width?: number;
  height?: number;
  x: number;
  y: number;
  color?: COLORS;
  ctx: CanvasRenderingContext2D;
}

export interface BrickPositions {
  leftTop: Position;
  leftBottom: Position;
  rightTop: Position;
  rightBottom: Position;
}
