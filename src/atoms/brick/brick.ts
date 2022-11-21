import { COLORS } from "../../constants";
import { Position } from "../../interfaces";
import { DEFAULT_BRICK_HEIGHT, DEFAULT_BRICK_WIDTH } from "./brick-constants";
import { BrickPositions, BrickProps } from "./brick-interfaces";

export class Brick {
  width: number;
  height: number;
  x: number;
  y: number;
  fillColor: COLORS;
  ctx: CanvasRenderingContext2D;
  isBroken: boolean;

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
    this.isBroken = false;
  }

  getPositions(): BrickPositions {
    const leftTop: Position = {
      x: this.x,
      y: this.y,
    };
    const leftBottom: Position = {
      x: this.x,
      y: this.y + this.height,
    };
    const rightTop: Position = {
      x: this.x + this.width,
      y: this.y,
    };
    const rightBottom: Position = {
      x: this.x + this.width,
      y: this.y + this.height,
    };

    return {
      leftTop,
      leftBottom,
      rightTop,
      rightBottom,
    };
  }

  getIsBroken() {
    return this.isBroken;
  }

  toggleIsBroken() {
    this.isBroken = !this.isBroken;
  }

  break() {
    this.ctx.fillStyle = COLORS.WHITE;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.toggleIsBroken();
  }

  update() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  render() {
    this.update();
  }
}
