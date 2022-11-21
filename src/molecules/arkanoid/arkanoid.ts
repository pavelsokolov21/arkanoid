import keycode from "keycode";
import { Ball, Board, Brick } from "../../atoms";
import {
  BOARD_BOTTOM_GAP,
  CANVAS_BOTTOM_GAP,
  GAME_STATUSES,
} from "../../constants";
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
  PositionsOfElements,
  XRatios,
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
  board: Board | null;
  ball: Ball | null;
  xRatio: XRatios;

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
    this.board = null;
    this.xRatio = 1;
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

  checkBallBrickBouncing({
    ballPositions,
    brickPositions,
    brick,
  }: Omit<PositionsOfElements, "boardPosition" | "subBoardsPositions"> & {
    brick: Brick;
  }) {
    // top of ball to bottom of brick
    if (
      ballPositions.top.y <= brickPositions.leftBottom.y &&
      ballPositions.bottom.y >= brickPositions.leftBottom.y &&
      ballPositions.top.x >= brickPositions.leftBottom.x &&
      ballPositions.top.x <= brickPositions.rightBottom.x
    ) {
      brick.break();
      this.ballDirections.y = BALL_DIRECTION_Y.BOTTOM;
    }

    // bottom of ball to top of brick
    if (
      ballPositions.bottom.y >= brickPositions.leftTop.y &&
      ballPositions.top.y <= brickPositions.leftTop.y &&
      ballPositions.bottom.x >= brickPositions.leftTop.x &&
      ballPositions.bottom.x <= brickPositions.rightTop.x
    ) {
      brick.break();
      this.ballDirections.y = BALL_DIRECTION_Y.TOP;
    }

    // left of ball to right of brick
    if (
      ballPositions.left.x <= brickPositions.rightBottom.x &&
      ballPositions.right.x >= brickPositions.rightBottom.x &&
      ballPositions.left.y >= brickPositions.rightTop.y &&
      ballPositions.left.y <= brickPositions.rightBottom.y
    ) {
      brick.break();
      this.ballDirections.x = BALL_DIRECTIONS_X.RIGHT;
    }

    // right of ball to left of brick
    if (
      ballPositions.right.x >= brickPositions.leftBottom.x &&
      ballPositions.left.x <= brickPositions.leftBottom.x &&
      ballPositions.right.y >= brickPositions.leftTop.y &&
      ballPositions.right.y <= brickPositions.leftBottom.y
    ) {
      brick.break();
      this.ballDirections.x = BALL_DIRECTIONS_X.LEFT;
    }
  }

  getXPosition() {
    if (this.ballDirections.x === BALL_DIRECTIONS_X.NONE) {
      return 0;
    }

    const ratio = this.ballDirections.x === BALL_DIRECTIONS_X.LEFT ? -1 : 1;

    return this.xRatio * ratio;
  }

  checkBouncingBallFromBoard({
    ballPositions,
    boardPosition,
    subBoardsPositions,
  }: Omit<PositionsOfElements, "brickPositions">) {
    if (
      boardPosition.topLeft.x < ballPositions.bottom.x &&
      boardPosition.topRight.x > ballPositions.bottom.x &&
      boardPosition.topLeft.y <= ballPositions.bottom.y
    ) {
      this.ballDirections.y = BALL_DIRECTION_Y.TOP;
    }

    // checking subboard positions
    subBoardsPositions.forEach((position, index) => {
      if (
        position.topLeft.x <= ballPositions.bottom.x &&
        position.topRight.x >= ballPositions.bottom.x &&
        position.topLeft.y <= ballPositions.bottom.y
      ) {
        if (index === 0 || index === 3) {
          this.xRatio = 1;
        }

        if (index === 1 || index === 2) {
          this.xRatio = 0.5;
        }

        if (index === 0 || index === 1) {
          this.ballDirections.x = BALL_DIRECTIONS_X.LEFT;
        }

        if (index === 2 || index === 3) {
          this.ballDirections.x = BALL_DIRECTIONS_X.RIGHT;
        }
      }
    });
  }

  checkBouncingBallFromBorders({
    ballPositions,
  }: Pick<PositionsOfElements, "ballPositions">) {
    if (ballPositions.right.x >= this.width) {
      this.ballDirections.x = BALL_DIRECTIONS_X.LEFT;
    }

    if (ballPositions.left.x <= 0) {
      this.ballDirections.x = BALL_DIRECTIONS_X.RIGHT;
    }

    if (ballPositions.top.y <= 0) {
      this.ballDirections.y = BALL_DIRECTION_Y.BOTTOM;
    }
  }

  start() {
    document.addEventListener("keypress", (event) => {
      if (keycode.isEventKey(event, "space")) {
        if (this.gameStatus === GAME_STATUSES.PROCESSING) {
          return;
        }

        this.gameStatus = GAME_STATUSES.PROCESSING;
        this.ball!.changeGameStatus(true);
        for (let i = 1; i <= 10_000; i++) {
          setTimeout(() => {
            this.ball!.changePosition({
              y: this.ballDirections.y === BALL_DIRECTION_Y.TOP ? 1 : -1,
              x: this.getXPosition(),
            });

            const ballPositions = this.ball!.getPositionsByRadius();
            const boardPosition = this.board!.getPositions();
            const subBoardsPositions = this.board!.getSubBoardsPositions();

            // Checking bricks
            this.bricks.map((row) =>
              row.map((brick) => {
                if (brick.getIsBroken()) {
                  return brick;
                }

                const brickPositions = brick.getPositions();

                this.checkBallBrickBouncing({
                  brickPositions,
                  ballPositions,
                  brick,
                });

                return brick;
              })
            );

            this.checkBouncingBallFromBoard({
              ballPositions,
              boardPosition,
              subBoardsPositions,
            });
            this.checkBouncingBallFromBorders({ ballPositions });
          }, 10 * i);
        }
      }
    });
  }

  renderBoard() {
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

    this.board = board;
  }

  renderBall() {
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
      speedWithBoard: BOARD_SPEED,
    });
    ball.render();

    this.ball = ball;
  }

  render() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.renderBoard();
    this.renderBall();
    this.renderBricks();

    this.start();
  }
}
