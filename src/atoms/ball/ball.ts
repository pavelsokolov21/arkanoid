import keycode from "keycode";
import { COLORS } from "../../constants";
import { Position } from "../../interfaces";
import {
  DEFAULT_BALL_COLOR,
  DEFAULT_BALL_MOVE_SPEED,
  DEFAULT_BALL_RADIUS,
  DEFAULT_SPEED_WITH_BOARD,
} from "./ball-constants";
import { BallPositions, BallProps } from "./ball-interfaces";

export class Ball {
  radius: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  fillColor: COLORS;
  moveSpeed: number;
  speedWithBoard: number;
  offsetBoardX: number;
  clientWidth: number;
  isGameStarted: boolean;

  constructor({
    radius = DEFAULT_BALL_RADIUS,
    color = DEFAULT_BALL_COLOR,
    moveSpeed = DEFAULT_BALL_MOVE_SPEED,
    speedWithBoard = DEFAULT_SPEED_WITH_BOARD,
    ctx,
    x,
    y,
    isGameStarted,
    offsetBoardX,
    clientWidth,
  }: BallProps) {
    this.radius = radius;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fillColor = color;
    this.speedWithBoard = speedWithBoard;
    this.moveSpeed = moveSpeed;
    this.isGameStarted = isGameStarted;
    this.offsetBoardX = offsetBoardX;
    this.clientWidth = clientWidth;
  }

  reset() {
    this.ctx.beginPath();
    this.ctx.fillStyle = COLORS.WHITE;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = COLORS.WHITE;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  handleArrowKeypress() {
    document.addEventListener("keydown", (event) => {
      if (this.isGameStarted) {
        return;
      }

      if (keycode.isEventKey(event, "left")) {
        this.reset();
        const newX = this.x - this.offsetBoardX * this.speedWithBoard;

        if (newX <= 0) {
          this.x = 0 + this.radius;
        } else {
          this.x = newX;
        }
      }

      if (keycode.isEventKey(event, "right")) {
        this.reset();
        const newX = this.x + this.offsetBoardX * this.speedWithBoard;

        if (newX + this.radius >= this.clientWidth) {
          this.x = this.clientWidth - this.radius;
        } else {
          this.x = newX;
        }
      }

      this.update();
    });
  }

  changePosition({ x, y }: Position) {
    this.reset();

    this.y -= y * this.moveSpeed;
    this.x += x * this.moveSpeed;

    this.update();
  }

  changeGameStatus(status: boolean) {
    this.isGameStarted = status;
  }

  getPositionsByRadius(): BallPositions {
    const top: Position = {
      x: this.x,
      y: this.y - this.radius,
    };
    const right: Position = {
      x: this.x + this.radius,
      y: this.y,
    };
    const bottom: Position = {
      x: this.x,
      y: this.y + this.radius,
    };
    const left: Position = {
      x: this.x - this.radius,
      y: this.y,
    };

    return {
      top,
      right,
      bottom,
      left,
    };
  }

  render() {
    this.update();

    this.handleArrowKeypress();
  }
}
