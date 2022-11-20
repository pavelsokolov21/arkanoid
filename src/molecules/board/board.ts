import { Base } from "../../atoms";
import {
  DEFAULT_BOARD_COLOR,
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_WIDTH,
} from "./board-constants";
import { BoardProps } from "./board-interfaces";

export class Board extends Base {
  width: number;
  height: number;
  fillColor: string;
  x: number;
  y: number;

  constructor({
    color = DEFAULT_BOARD_COLOR,
    height = DEFAULT_BOARD_HEIGHT,
    width = DEFAULT_BOARD_WIDTH,
    x,
    y,
  }: BoardProps) {
    super();
    this.width = width;
    this.height = height;
    this.fillColor = color;
    this.x = x - Math.floor(width / 2);
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
