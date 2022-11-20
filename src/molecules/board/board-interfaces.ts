export interface BoardProps {
  width?: number;
  height?: number;
  color?: string;
  x: number;
  y: number;
  speed: number;
  ctx: CanvasRenderingContext2D;
}
