import { PIXI } from "../renderer";

export interface IConfig {
  width: number;
  height: number;
  backgroundColor: number | string;
  autoStart?: boolean;
  antialias?: boolean;
  transparent?: boolean;
  resolution?: number;
};
export type gameIdType = "jrsl" | "vvsl" | "grsl" | "wwsl" | "mbsl"
export type game_global_vars_type = {
  rulesHTML: string,
  stake: {
    max: number,
    min: number
  },
  balance: number,
  isFullScreen: boolean,
  info_dialog_wrapper_scale_ratio: number,
  auto_spin_val: number,
  prev_won_line_index: number,
  prev_won_line_length: number,
  last_win: number,
  running: boolean,
  wonRes: any,
  floatSymbolStore: (null | PIXI.AnimatedSprite)[][],
  floatCardBackFireStore: (null | PIXI.AnimatedSprite)[][],
  pf_hash: string,
  gameId: gameIdType,
  timeout_id: NodeJS.Timeout | null,
  blood_trail: PIXI.AnimatedSprite | null,
  bet_text: PIXI.Text | null,
  total_bet_text: PIXI.Text | null,
  bline_val_text: PIXI.Text | null,
  chip_item_text_arr: PIXI.Text[],
  mobile_win_hold_spin_text_upper: PIXI.Text | null,
  mobile_win_hold_spin_text_down: PIXI.Text | null,
}
export type game_category_config_type = {
  api: {
    variation: number,
    slot_type: string
  },
  footerBar: {
    [key: string]: {
      position: {
        x: number,
        y: number
      },
      scale?: {
        x: number,
        y: number
      }
    }
  },
  loadingBarLength: number,
  loadingBarLogo: {
    [key in "logo" | "loadingBar"]: {
      position: {
        x: number,
        y: number
      },
      scale: {
        x: number,
        y: number
      }
    }
  },
  cardBack: {
    length: number,
    scale: {
      x: number,
      y: number
    },
    position: {
      x: number,
      y: number
    }
  },
  fontFaceTitle: string,
  fontFaceValue: string,
  fill: number,
  style: "normal" | "italic",
  splash: {
    [key in "fire" | "fire2" | "candle" | "candle2" | "bubble"]: {
      count: number,
      scale: {
        x: number,
        y: number
      },
      position: {
        x: number,
        y: number
      },
      speed: number,
    };
  },
  backBubble: {
    count: number,
    desktop: {
      position: [
        { x: number, y: number, },
        { x: number, y: number, }
      ],
    },
    mobile: {
      position: [
        { x: number, y: number, },
        { x: number, y: number, }
      ],
    },
  },
  scaleFactor: number[],
  portal: {
    scale: number[],
    position: {
      x: number,
      y: number
    }[],
    logoAnim: {
      length: number,
      scale: number[],
      position: {
        x: number,
        y: number
      }[],
    },
  },
  start: {
    scale: number[],
    position: {
      x: number,
      y: number
    }[]
  },
  loading: {
    [key in "initText" | "icon" | "splashContainer"]: {
      position: {
        x: number,
        y: number
      }
    }
  },
  bloodTrail: {
    count: number,
    desktop: {
      position: {
        x: number,
        y: number
      },
      scale: {
        x: number,
        y: number
      },
    },
    mobile: {
      position: {
        x: number,
        y: number
      },
      scale: {
        x: number,
        y: number
      },
    },
    mask: {
      x: number,
      y: number,
      w: number,
      h: number
    }
  }
}