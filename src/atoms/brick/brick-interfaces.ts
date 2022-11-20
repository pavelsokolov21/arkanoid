import { COLORS } from "../../constants";

export interface BrickProps {
  width?: number;
  height?: number;
  x: number;
  y: number;
  color?: COLORS;
  ctx: CanvasRenderingContext2D;
}
