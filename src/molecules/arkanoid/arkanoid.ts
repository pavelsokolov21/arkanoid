import { Ball, Board } from "../../atoms";
import { BOARD_BOTTOM_GAP, CANVAS_BOTTOM_GAP } from "../../constants";
import {
  BALL_RADIUS,
  BOARD_HEIGHT,
  BOARD_SPEED,
  BOARD_WIDTH,
  OFFSET_BOARD_X,
} from "./arkanoid-constants";
import { ArkanoidProps } from "./arkanoid-interfaces";
import { getYOfBall } from "./arkanoid-utils";

export class Arkanoid {
  width: number;
  height: number;
  x: number;
  y: number;
  canvas: ArkanoidProps["canvas"];
  canvasCtx: CanvasRenderingContext2D;

  constructor({ canvas }: ArkanoidProps) {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight - CANVAS_BOTTOM_GAP;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext("2d")!;
  }

  render() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const board = new Board({
      x: Math.floor(this.width / 2),
      y: this.height - BOARD_BOTTOM_GAP,
      ctx: this.canvasCtx,
      clientWidth: this.width,
      height: BOARD_HEIGHT,
      width: BOARD_WIDTH,
      speed: BOARD_SPEED,
      offsetBoardX: OFFSET_BOARD_X,
    });
    board.render();

    const ball = new Ball({
      ctx: this.canvasCtx,
      x: Math.floor(this.width / 2),
      y: getYOfBall({
        height: this.height,
        boardBottomGap: BOARD_BOTTOM_GAP,
        boardHeight: BOARD_HEIGHT,
        ballRadius: BALL_RADIUS,
      }),
      radius: BALL_RADIUS,
      isGameStarted: false,
      offsetBoardX: OFFSET_BOARD_X,
      clientWidth: this.width,
    });
    ball.render();
  }
}
