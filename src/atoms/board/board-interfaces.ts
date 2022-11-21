import { COLORS } from "../../constants";
import { Position } from "../../interfaces";

export interface BoardProps {
  width?: number;
  height?: number;
  speed?: number;
  color?: COLORS;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  clientWidth: number;
  offsetBoardX?: number;
}

export interface BoardPositions {
  topLeft: Position;
  topRight: Position;
}
