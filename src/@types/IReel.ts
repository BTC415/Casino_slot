import { PIXI } from "../renderer";

export interface reelType {
  reel: PIXI.Container,
  animated_symbols: PIXI.Container[],
  card_backs: PIXI.Sprite[],
  cards: PIXI.Container[],
  url_ids: number[],
  position: number,
  previousPosition: number,
  blur: PIXI.BlurFilter,
};

export type slotAnimateUrlType = {
  title: string,
  length: number,
  position: {
    x: number,
    y: number
  },
  scale: { x: number; y: number },
  playback: boolean,
  speed: number,
  hue: number,
  saturate: number,
  brightness: number
}
export type tweenType = {
  object: Object,
  property: string,
  propertyBeginValue: number,
  target: number,
  time: number,
  easing: (t: number) => number,
  change: ((t: any) => Promise<void>) | null,
  complete: ((t: any) => Promise<void>) | null,
  start: number,
  uuid: string,
  flow: boolean
}

export type Game_Category_Dimension_Type = {
  gameBoard: {
    width: number,
    height: number,
    cardHeight: number,
    x: number,
    y: number
  },
  footerBar: {
    width: number, 
    height: number
  },
  mask: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  reelContainer: {
    x: number,
    y: number,
    scale: {
      x: number,
      y: number
    },
    gap: number
  },
  torch: {
    position: {
      x: number,
      y: number
    },
    scale: {
      x: number,
      y: number
    },
  },
  torch2: {
    position: {
      x: number,
      y: number
    },
    scale: {
      x: number,
      y: number
    },
  },
  bg: {
    [key: string]: {
      width: number,
      height: number
    },
  }
}