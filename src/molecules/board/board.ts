import keycode from "keycode";
import { Base } from "../../atoms";
import {
  DEFAULT_BOARD_COLOR,
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_SPEED,
  DEFAULT_BOARD_WIDTH,
  OFFSET_BOARD_X,
} from "./board-constants";
import { BoardProps } from "./board-interfaces";

export class Board extends Base {
  width: number;
  height: number;
  fillColor: string;
  x: number;
  y: number;
  speed: number;
  clientWidth: number;

  constructor({
    color = DEFAULT_BOARD_COLOR,
    height = DEFAULT_BOARD_HEIGHT,
    width = DEFAULT_BOARD_WIDTH,
    speed = DEFAULT_BOARD_SPEED,
    x,
    y,
    ctx,
    clientWidth,
  }: BoardProps) {
    super();
    this.width = width;
    this.height = height;
    this.fillColor = color;
    this.x = x - Math.floor(width / 2);
    this.y = y;
    this.ctx = ctx;
    this.speed = speed;
    this.clientWidth = clientWidth;
  }

  reset() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  handleArrowKeypress() {
    document.addEventListener("keydown", (event) => {
      if (keycode.isEventKey(event, "left")) {
        this.reset();
        const newX = this.x - OFFSET_BOARD_X * this.speed;

        if (newX <= 0) {
          this.x = 0;
        } else {
          this.x = newX;
        }
      }

      if (keycode.isEventKey(event, "right")) {
        this.reset();
        const newX = this.x + OFFSET_BOARD_X * this.speed;

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
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.handleArrowKeypress();
  }
}
