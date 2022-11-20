import { COLORS } from "../../constants";

export interface BoardProps {
  width?: number;
  height?: number;
  speed?: number;
  color?: COLORS;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  clientWidth: number;
}
