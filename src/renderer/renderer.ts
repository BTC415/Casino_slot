import { PIXI } from './pixi';
import { config } from '../config';
export const app = new PIXI.Application<HTMLCanvasElement>({
  width: config.width,
  height: config.height,
  backgroundColor: config.backgroundColor,
  autoStart: config.autoStart,
  antialias: config.antialias,
  resolution: config.resolution,
});
document.getElementById('game')?.appendChild(app.view);
export const Global_Vars: {
  loaded: boolean,
  initLoaded: boolean,
  info_dialog_wrapper_resize_callback: (() => void) | null,
} = {
  initLoaded: false,
  loaded: false,
  info_dialog_wrapper_resize_callback: null,
}
export const appStage = new PIXI.Container()