import { COLORS } from "../../constants";
import { DEFAULT_BRICK_HEIGHT, DEFAULT_BRICK_WIDTH } from "./brick-constants";
import { BrickProps } from "./brick-interfaces";

export class Brick {
  width: number;
  height: number;
  x: number;
  y: number;
  fillColor: COLORS;
  ctx: CanvasRenderingContext2D;

  constructor({
    width = DEFAULT_BRICK_WIDTH,
    height = DEFAULT_BRICK_HEIGHT,
    color = COLORS.RED,
    x,
    y,
    ctx,
  }: BrickProps) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.fillColor = color;
    this.x = x;
    this.y = y;
  }

  update() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  render() {
    this.update();
  }
}
