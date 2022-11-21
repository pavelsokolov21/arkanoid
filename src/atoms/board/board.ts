import keycode from "keycode";
import { COLORS } from "../../constants";
import { Position } from "../../interfaces";
import {
  DEFAULT_BOARD_COLOR,
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_SPEED,
  DEFAULT_BOARD_WIDTH,
  DEFAULT_OFFSET_BOARD_X,
} from "./board-constants";
import { BoardProps } from "./board-interfaces";

export class Board {
  width: number;
  height: number;
  fillColor: COLORS;
  x: number;
  y: number;
  speed: number;
  clientWidth: number;
  offsetBoardX: number;
  ctx: CanvasRenderingContext2D;

  constructor({
    color = DEFAULT_BOARD_COLOR,
    height = DEFAULT_BOARD_HEIGHT,
    width = DEFAULT_BOARD_WIDTH,
    speed = DEFAULT_BOARD_SPEED,
    offsetBoardX = DEFAULT_OFFSET_BOARD_X,
    x,
    y,
    ctx,
    clientWidth,
  }: BoardProps) {
    this.width = width;
    this.height = height;
    this.fillColor = color;
    this.x = x - Math.floor(width / 2);
    this.y = y;
    this.ctx = ctx;
    this.speed = speed;
    this.clientWidth = clientWidth;
    this.offsetBoardX = offsetBoardX;
  }

  reset() {
    this.ctx.fillStyle = COLORS.WHITE;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getPositions() {
    const topLeft: Position = {
      x: this.x,
      y: this.y,
    };

    const topRight = {
      x: this.x + this.width,
      y: this.y,
    };

    return {
      topLeft,
      topRight,
    };
  }

  handleArrowKeypress() {
    document.addEventListener("keydown", (event) => {
      if (keycode.isEventKey(event, "left")) {
        this.reset();
        const newX = this.x - this.offsetBoardX * this.speed;

        if (newX <= 0) {
          this.x = 0;
        } else {
          this.x = newX;
        }
      }

      if (keycode.isEventKey(event, "right")) {
        this.reset();
        const newX = this.x + this.offsetBoardX * this.speed;

        if (newX + this.width >= this.clientWidth) {
          this.x = this.clientWidth - this.width;
        } else {
          this.x = newX;
        }
      }

      this.update();
    });
  }

  render() {
    this.update();

    this.handleArrowKeypress();
  }
}
