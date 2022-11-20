import "normalize.css";

import {
  ARKANOID_CANVAS,
  BOARD_BOTTOM_GAP,
  CANVAS_BOTTOM_GAP,
} from "./constants";
import { ArkanoidProps } from "./interfaces";
import { Board } from "./molecules";

const canvas = document.getElementById(ARKANOID_CANVAS) as HTMLCanvasElement;

class Arkanoid {
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
    this.x = Math.floor(this.width / 2);
    this.y = this.height - BOARD_BOTTOM_GAP;
    this.canvasCtx = canvas.getContext("2d")!;
  }

  render() {
    canvas.width = this.width;
    canvas.height = this.height;

    const board = new Board({ x: this.x, y: this.y });
    board.render(this.canvasCtx);
  }
}

const arkanoid = new Arkanoid({ canvas });

arkanoid.render();
