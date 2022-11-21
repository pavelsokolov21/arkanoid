import keycode from "keycode";
import { Ball, Board, Brick } from "../../atoms";
import {
  BOARD_BOTTOM_GAP,
  CANVAS_BOTTOM_GAP,
  GAME_STATUSES,
} from "../../constants";
import { Position } from "../../interfaces";
import {
  BALL_DIRECTIONS_X,
  BALL_DIRECTION_Y,
  BALL_RADIUS,
  BOARD_HEIGHT,
  BOARD_SPEED,
  BOARD_WIDTH,
  BRICK_GAP,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  DEFAULT_BRICKS_ROWS,
  OFFSET_BOARD_X,
} from "./arkanoid-constants";
import {
  ArkanoidProps,
  BallDirections,
  Bricks,
  BrickStatus,
} from "./arkanoid-interfaces";
import { getYOfBall } from "./arkanoid-utils";

export class Arkanoid {
  width: number;
  height: number;
  x: number;
  y: number;
  canvas: ArkanoidProps["canvas"];
  canvasCtx: CanvasRenderingContext2D;
  gameStatus: GAME_STATUSES;
  bricks: Bricks;
  ballDirections: BallDirections;

  constructor({ canvas }: ArkanoidProps) {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight - CANVAS_BOTTOM_GAP;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext("2d")!;
    this.gameStatus = GAME_STATUSES.INITIAL;
    this.bricks = [];
    this.ballDirections = {
      x: BALL_DIRECTIONS_X.NONE,
      y: BALL_DIRECTION_Y.TOP,
    };
  }

  renderBricks(rows: number = DEFAULT_BRICKS_ROWS) {
    const bricks: Bricks = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const countOfBricksInRow = Math.floor(
        this.width / (BRICK_GAP * 2 + BRICK_WIDTH)
      );
      const row = new Array(countOfBricksInRow)
        .fill({} as BrickStatus)
        .map<Brick>((_, brickIndex) => {
          const brickXPositionTopLeft = brickIndex * (BRICK_GAP + BRICK_WIDTH);
          const brickYPositionTopLeft =
            (rowIndex + 0.5) * (BRICK_GAP * 2 + BRICK_HEIGHT);

          const brick = new Brick({
            ctx: this.canvasCtx,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            x: brickXPositionTopLeft,
            y: brickYPositionTopLeft,
          });

          return brick;
        });

      bricks.push(row);
    }

    this.bricks = bricks;

    // Поменять логику на кол-во кирпичей в строке
    // вместо измерения кол-ва по ширине экрана
    bricks.forEach((row) => {
      row.forEach((brick) => {
        brick.render();
      });
    });
  }

  start(ball: Ball) {
    document.addEventListener("keypress", (event) => {
      if (
        keycode.isEventKey(event, "space") &&
        this.gameStatus !== GAME_STATUSES.PROCESSING
      ) {
        this.gameStatus = GAME_STATUSES.PROCESSING;
        ball.changeGameStatus(true);

        for (let i = 1; i <= 300; i++) {
          setTimeout(() => {
            ball.changePosition({
              y: this.ballDirections.y === BALL_DIRECTION_Y.TOP ? 1 : -1,
              x: 0,
            });

            const ballPositions = ball.getPositionsByRadius();

            this.bricks.map((row) =>
              row.map((brick) => {
                if (brick.getIsBroken()) {
                  return brick;
                }

                const brickPositions = brick.getPositions();

                // top ball to bottom brick
                if (
                  ballPositions.top.y <= brickPositions.leftBottom.y &&
                  ballPositions.top.x >= brickPositions.leftBottom.x &&
                  ballPositions.top.x <= brickPositions.rightBottom.x
                ) {
                  brick.break();
                  this.ballDirections.y = BALL_DIRECTION_Y.BOTTOM;
                }

                return brick;
              })
            );
          }, 10 * i);
        }
      }
    });
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
      isGameStarted: this.gameStatus === GAME_STATUSES.PROCESSING,
      offsetBoardX: OFFSET_BOARD_X,
      clientWidth: this.width,
    });
    ball.render();

    this.renderBricks();

    this.start(ball);
  }
}
