import { COLORS } from "../../constants";
import { DEFAULT_BALL_COLOR, DEFAULT_BALL_RADIUS } from "./ball-constants";
import { BallProps } from "./ball-interfaces";

export class Ball {
  radius: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  fillColor: COLORS;

  constructor({
    ctx,
    radius = DEFAULT_BALL_RADIUS,
    color = DEFAULT_BALL_COLOR,
    x,
    y,
  }: BallProps) {
    this.radius = radius;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fillColor = color;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  }
}
