import { COLORS } from "../../constants";
import { Position } from "../../interfaces";

export interface BallProps {
  radius?: number;
  color?: COLORS;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  moveSpeed?: number;
  speedWithBoard?: number;
  isGameStarted: boolean;
  offsetBoardX: number;
  clientWidth: number;
}
