import "normalize.css";

import { ARKANOID_CANVAS } from "./constants";
import { Arkanoid } from "./molecules";

const canvas = document.getElementById(ARKANOID_CANVAS) as HTMLCanvasElement;

const arkanoid = new Arkanoid({ canvas });

arkanoid.render();
