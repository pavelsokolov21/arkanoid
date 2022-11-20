export interface BoardProps {
  width?: number;
  height?: number;
  speed?: number;
  color?: string;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  clientWidth: number;
}
