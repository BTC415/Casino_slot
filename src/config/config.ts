import { IConfig, game_category_config_type, game_global_vars_type } from "../@types";
export const config: IConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  autoStart: true,
  antialias: true,
  transparent: false,
  resolution: 1
};
export const game_global_vars: game_global_vars_type = {
  rulesHTML: "",
  stake: {
    max: 0,
    min: 0
  },
  balance: 0,
  isFullScreen: false,
  info_dialog_wrapper_scale_ratio: 1.5,
  auto_spin_val: 0,
  prev_won_line_index: -1,
  prev_won_line_length: 0,
  // won_lines: [],
  last_win: 0,
  running: false,
  wonRes: null,
  floatSymbolStore: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  floatCardBackFireStore: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  pf_hash: "",
  gameId: "jrsl",
  timeout_id: null,
  blood_trail: null,
  bet_text: null,
  total_bet_text: null,
  bline_val_text: null,
  chip_item_text_arr: [],
  mobile_win_hold_spin_text_upper: null,
  mobile_win_hold_spin_text_down: null
}
export const Game_Category_Config: { [key: string]: game_category_config_type } = {
  jrsl: {
    api: {
      variation: 10,
      slot_type: "jungle-rumble"
    },
    footerBar: {
      info: {
        position: {
          x: 70,
          y: 15
        }
      },
      setting: {
        position: {
          x: 350,
          y: 30
        }
      },
      wallet: {
        position: {
          x: 414,
          y: 30
        }
      },
      holdSpin: {
        position: {
          x: 1150,
          y: 40
        }
      },
      totalWin: {
        position: {
          x: 1230,
          y: 40
        }
      },
      totalBet: {
        position: {
          x: 1230,
          y: 80
        }
      },
      totalBetStatic: {
        position: {
          x: 1100,
          y: 80
        }
      },
      spin: {
        position: {
          x: 1520,
          y: 10
        }
      },
      autospin: {
        position: {
          x: 1430,
          y: 22
        }
      },
      autospinText: {
        position: {
          x: 1462,
          y: 5
        }
      },
      bet: {
        position: {
          x: 665,
          y: 80
        }
      },
      betStatic: {
        position: {
          x: 665,
          y: 36
        }
      },
      bline: {
        position: {
          x: 0,
          y: 0
        }
      },
      betup: {
        position: {
          x: 785,
          y: 18
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      betdown: {
        position: {
          x: 785,
          y: 61
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blineup: {
        position: {
          x: 135,
          y: -60
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blinedown: {
        position: {
          x: 135,
          y: -5
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      chipList: {
        position: {
          x: 670,
          y: 0
        },
      }
    },
    loadingBarLength: 150,
    loadingBarLogo: {
      logo: {
        position: {
          x: 280,
          y: 150
        },
        scale: {
          x: 1.0,
          y: 1.0
        }
      },
      loadingBar: {
        position: {
          x: 280,
          y: 550
        },
        scale: {
          x: 1,
          y: 1
        }
      }
    },
    cardBack: {
      length: 1,
      scale: {
        x: 1.6,
        y: 1.6
      },
      position: {
        x: 115,
        y: 108
      }
    },
    fontFaceTitle: "Salsa",
    fontFaceValue: "Salsa",
    fill: 0xffffff,
    style: "normal",
    splash: {
      fire: {
        count: 300,
        scale: { x: 1.8, y: 2 },
        position: { x: 206, y: 216 },
        speed: 0.5,
      },
      fire2: {
        count: 300,
        scale: { x: 1.8, y: 2 },
        position: { x: 1638, y: 218 },
        speed: 0.5,
      },
      candle: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 40, y: 540, },
        speed: 0.5,
      },
      candle2: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 1840, y: 540 },
        speed: 0.5,
      },
      bubble: {
        count: 129,
        scale: { x: 1, y: 1 },
        position: { x: 90, y: -70, },
        speed: 0.5,
      },
    },
    backBubble: {
      count: 1,
      desktop: {
        position: [
          { x: 100, y: 1000, },
          { x: 1800, y: 1000, }
        ],
      },
      mobile: {
        position: [
          { x: 600, y: 1500, },
          { x: 1200, y: 1500, }
        ],
      },
    },
    scaleFactor: [1.6, 1.6, 1, 1, 1],
    portal: {
      scale: [1.05, 1.05, 0.7],
      position: [
        { x: 958, y: 500 },
        { x: 958, y: 500 },
        { x: 965, y: 500 }
      ],
      logoAnim: {
        length: 1,
        scale: [2.3, 2.3],
        position: [
          { x: 940, y: 91 },
          { x: 940, y: 91 },
        ],
      },
    },
    start: {
      scale: [1, 0.8, 0.7],
      position: [
        { x: 970, y: 1100 },
        { x: 970, y: 1100 },
        { x: 950, y: 900 }
      ]
    },
    loading: {
      initText: {
        position: {
          x: 980,
          y: 550
        }
      },
      icon: {
        position: {
          x: 970,
          y: 650
        }
      },
      splashContainer: {
        position: {
          x: 680,
          y: 300
        }
      }
    },
    bloodTrail: {
      count: 1,
      desktop: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mobile: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mask: {
        x: 0,
        y: 0,
        w: 250,
        h: 140
      }
    }
  },
  vvsl: {
    api: {
      variation: 11,
      slot_type: "vampire-vault"
    },
    footerBar: {
      info: {
        position: {
          x: 70,
          y: 15
        }
      },
      setting: {
        position: {
          x: 350,
          y: 30
        }
      },
      wallet: {
        position: {
          x: 414,
          y: 30
        }
      },
      holdSpin: {
        position: {
          x: 1150,
          y: 40
        }
      },
      totalWin: {
        position: {
          x: 1230,
          y: 40
        }
      },
      totalBet: {
        position: {
          x: 1230,
          y: 80
        }
      },
      totalBetStatic: {
        position: {
          x: 1100,
          y: 80
        }
      },
      spin: {
        position: {
          x: 1520,
          y: 10
        }
      },
      autospin: {
        position: {
          x: 1430,
          y: 22
        }
      },
      autospinText: {
        position: {
          x: 1462,
          y: 5
        }
      },
      bet: {
        position: {
          x: 665,
          y: 80
        }
      },
      betStatic: {
        position: {
          x: 665,
          y: 36
        }
      },
      bline: {
        position: {
          x: 0,
          y: 0
        }
      },
      betup: {
        position: {
          x: 785,
          y: 18
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      betdown: {
        position: {
          x: 785,
          y: 61
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blineup: {
        position: {
          x: 135,
          y: -60
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blinedown: {
        position: {
          x: 135,
          y: -5
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      chipList: {
        position: {
          x: 670,
          y: 0
        },
      }
    },
    loadingBarLength: 150,
    loadingBarLogo: {
      logo: {
        position: {
          x: 280,
          y: 150
        },
        scale: {
          x: 1.0,
          y: 1.0
        }
      },
      loadingBar: {
        position: {
          x: 280,
          y: 550
        },
        scale: {
          x: 1,
          y: 1
        }
      }
    },
    cardBack: {
      length: 1,
      scale: {
        x: 1.6,
        y: 1.6
      },
      position: {
        x: 115,
        y: 108
      }
    },
    fontFaceTitle: "Blood",
    fontFaceValue: "London",
    fill: 0xff0000,
    style: "normal",
    splash: {
      fire: {
        count: 27,
        scale: { x: -1, y: 1 },
        position: { x: 250, y: 140 },
        speed: 0.2,
      },
      fire2: {
        count: 27,
        scale: { x: 1, y: 1 },
        position: { x: 1540, y: 140 },
        speed: 0.2,
      },
      candle: {
        count: 299,
        scale: { x: 0.7, y: 0.7 },
        position: { x: 40, y: 855, },
        speed: 0.5,
      },
      candle2: {
        count: 299,
        scale: { x: 1, y: 1 },
        position: { x: 80, y: 10000 },
        speed: 0.5,
      },
      bubble: {
        count: 1,
        scale: { x: 0.7, y: 0.7 },
        position: { x: 140, y: 800, },
        speed: 0.5,
      },
    },
    backBubble: {
      count: 1,
      desktop: {
        position: [
          { x: 100, y: 1000, },
          { x: 1800, y: 1000, }
        ],
      },
      mobile: {
        position: [
          { x: 600, y: 1500, },
          { x: 1200, y: 1500, }
        ],
      },
    },
    scaleFactor: [1.51, 1.51, 1.0, 1, 1.0],
    portal: {
      scale: [1.25, 1.25, 0.8],
      position: [
        { x: 905, y: 400 },
        { x: 905, y: 500 },
        { x: 925, y: 400 }
      ],
      logoAnim: {
        length: 1,
        scale: [2.3, 2.3],
        position: [
          { x: 940, y: 91 },
          { x: 940, y: 91 },
        ],
      },
    },
    start: {
      scale: [1, 0.8, 0.7],
      position: [
        { x: 920, y: 1000 },
        { x: 920, y: 1100 },
        { x: 910, y: 800 }
      ]
    },
    loading: {
      initText: {
        position: {
          x: 900,
          y: 550
        }
      },
      icon: {
        position: {
          x: 890,
          y: 650
        }
      },
      splashContainer: {
        position: {
          x: 600,
          y: 300
        }
      }
    },
    bloodTrail: {
      count: 46,
      desktop: {
        position: {
          x: -30,
          y: 0
        },
        scale: {
          x: 2.5,
          y: 2.5
        },
      },
      mobile: {
        position: {
          x: -30,
          y: 0
        },
        scale: {
          x: 7.5,
          y: 7.5
        },
      },
      mask: {
        x: 0,
        y: 0,
        w: 750,
        h: 420
      }
    }
  },
  grsl: {
    api: {
      variation: 13,
      slot_type: "gold-rush"
    },
    footerBar: {
      info: {
        position: {
          x: 70,
          y: 15
        }
      },
      setting: {
        position: {
          x: 350,
          y: 30
        }
      },
      wallet: {
        position: {
          x: 414,
          y: 30
        }
      },
      holdSpin: {
        position: {
          x: 1150,
          y: 40
        }
      },
      totalWin: {
        position: {
          x: 1230,
          y: 40
        }
      },
      totalBet: {
        position: {
          x: 1230,
          y: 80
        }
      },
      totalBetStatic: {
        position: {
          x: 1090,
          y: 80
        }
      },
      spin: {
        position: {
          x: 1520,
          y: 10
        }
      },
      autospin: {
        position: {
          x: 1430,
          y: 22
        }
      },
      autospinText: {
        position: {
          x: 1462,
          y: 5
        }
      },
      bet: {
        position: {
          x: 665,
          y: 80
        }
      },
      betStatic: {
        position: {
          x: 665,
          y: 36
        }
      },
      bline: {
        position: {
          x: 0,
          y: 0
        }
      },
      betup: {
        position: {
          x: 785,
          y: 18
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      betdown: {
        position: {
          x: 785,
          y: 61
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blineup: {
        position: {
          x: 135,
          y: -60
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blinedown: {
        position: {
          x: 135,
          y: -5
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      chipList: {
        position: {
          x: 670,
          y: 0
        },
      }
    },
    loadingBarLength: 70,
    loadingBarLogo: {
      logo: {
        position: {
          x: 280,
          y: 200
        },
        scale: {
          x: 1.0,
          y: 1.0
        }
      },
      loadingBar: {
        position: {
          x: 280,
          y: 500
        },
        scale: {
          x: 1,
          y: 1
        }
      }
    },
    cardBack: {
      length: 40,
      scale: {
        x: 1.6,
        y: 1.6
      },
      position: {
        x: 115,
        y: 108
      }
    },
    fontFaceTitle: "Silvano",
    fontFaceValue: "Silvano",
    fill: 0xffffff,
    style: "normal",
    splash: {
      fire: {
        count: 27,
        scale: { x: 1.1, y: 1.1 },
        position: { x: -70, y: 35 },
        speed: 0.5,
      },
      fire2: {
        count: 27,
        scale: { x: 1.1, y: 1.1 },
        position: { x: 1560, y: 35 },
        speed: 0.4,
      },
      candle: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 40, y: 540, },
        speed: 0.5,
      },
      candle2: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 1840, y: 540 },
        speed: 0.5,
      },
      bubble: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 90, y: -70, },
        speed: 0.5,
      },
    },
    backBubble: {
      count: 1,
      desktop: {
        position: [
          { x: 100, y: 1000, },
          { x: 1800, y: 1000, }
        ],
      },
      mobile: {
        position: [
          { x: 600, y: 1500, },
          { x: 1200, y: 1500, }
        ],
      },
    },
    scaleFactor: [1.57, 1.57, 1, 1, 1],
    portal: {
      scale: [1.22, 1.22, 0.79],
      position: [
        { x: 962, y: 500 },
        { x: 962, y: 500 },
        { x: 965, y: 500 }
      ],
      logoAnim: {
        length: 27,
        scale: [2.3, 1.55],
        position: [
          { x: 940, y: 91 },
          { x: 950, y: 231 },
        ],
      },
    },
    start: {
      scale: [1, 0.8, 0.7],
      position: [
        { x: 970, y: 1100 },
        { x: 970, y: 1100 },
        { x: 950, y: 900 }
      ]
    },
    loading: {
      initText: {
        position: {
          x: 980,
          y: 550
        }
      },
      icon: {
        position: {
          x: 970,
          y: 650
        }
      },
      splashContainer: {
        position: {
          x: 680,
          y: 300
        }
      }
    },
    bloodTrail: {
      count: 1,
      desktop: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mobile: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mask: {
        x: 0,
        y: 0,
        w: 250,
        h: 140
      }
    }
  },
  wwsl: {
    api: {
      variation: 12,
      slot_type: "wild-west"
    },
    footerBar: {
      info: {
        position: {
          x: 70,
          y: 15
        }
      },
      setting: {
        position: {
          x: 350,
          y: 30
        }
      },
      wallet: {
        position: {
          x: 414,
          y: 30
        }
      },
      holdSpin: {
        position: {
          x: 1150,
          y: 40
        }
      },
      totalWin: {
        position: {
          x: 1230,
          y: 40
        }
      },
      totalBet: {
        position: {
          x: 1230,
          y: 80
        }
      },
      totalBetStatic: {
        position: {
          x: 1100,
          y: 80
        }
      },
      spin: {
        position: {
          x: 1520,
          y: 10
        }
      },
      autospin: {
        position: {
          x: 1430,
          y: 22
        }
      },
      autospinText: {
        position: {
          x: 1462,
          y: 5
        }
      },
      bet: {
        position: {
          x: 665,
          y: 80
        }
      },
      betStatic: {
        position: {
          x: 665,
          y: 36
        }
      },
      bline: {
        position: {
          x: 0,
          y: 0
        }
      },
      betup: {
        position: {
          x: 785,
          y: 18
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      betdown: {
        position: {
          x: 785,
          y: 61
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blineup: {
        position: {
          x: 135,
          y: -60
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      blinedown: {
        position: {
          x: 135,
          y: -5
        },
        scale: {
          x: 1,
          y: 1
        }
      },
      chipList: {
        position: {
          x: 670,
          y: 0
        },
      }
    },
    loadingBarLength: 70,
    loadingBarLogo: {
      logo: {
        position: {
          x: 280,
          y: 150
        },
        scale: {
          x: 1.0,
          y: 1.0
        }
      },
      loadingBar: {
        position: {
          x: 280,
          y: 550
        },
        scale: {
          x: 1,
          y: 1
        }
      }
    },
    cardBack: {
      length: 1,
      scale: {
        x: 1.6,
        y: 1.6
      },
      position: {
        x: 115,
        y: 108
      }
    },
    fontFaceTitle: "Poppins",
    fontFaceValue: "Poppins",
    fill: 0xffffff,
    style: "normal",
    splash: {
      fire: {
        count: 1,
        scale: { x: 2.2, y: 2.2 },
        position: { x: -70, y: 35 },
        speed: 0.5,
      },
      fire2: {
        count: 1,
        scale: { x: 2.2, y: 2.2 },
        position: { x: 1560, y: 35 },
        speed: 0.4,
      },
      candle: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 40, y: 540, },
        speed: 0.5,
      },
      candle2: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 1840, y: 540 },
        speed: 0.5,
      },
      bubble: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 90, y: -70, },
        speed: 0.5,
      },
    },
    backBubble: {
      count: 1,
      desktop: {
        position: [
          { x: 100, y: 1000, },
          { x: 1800, y: 1000, }
        ],
      },
      mobile: {
        position: [
          { x: 600, y: 1500, },
          { x: 1200, y: 1500, }
        ],
      },
    },
    scaleFactor: [1.52, 1.52, 1, 1, 1],
    portal: {
      scale: [1.3, 1.3, 0.8],
      position: [
        { x: 962, y: 500 },
        { x: 962, y: 500 },
        { x: 965, y: 500 }
      ],
      logoAnim: {
        length: 1,
        scale: [2.3, 2.3],
        position: [
          { x: 940, y: 91 },
          { x: 940, y: 91 },
        ],
      },
    },
    start: {
      scale: [1, 0.8, 0.7],
      position: [
        { x: 970, y: 1100 },
        { x: 970, y: 1100 },
        { x: 950, y: 900 }
      ]
    },
    loading: {
      initText: {
        position: {
          x: 980,
          y: 550
        }
      },
      icon: {
        position: {
          x: 970,
          y: 650
        }
      },
      splashContainer: {
        position: {
          x: 680,
          y: 300
        }
      }
    },
    bloodTrail: {
      count: 1,
      desktop: {
        position: {
          x: 110,
          y: 100
        },
        scale: {
          x: 1.75,
          y: 1.7
        },
      },
      mobile: {
        position: {
          x: 110,
          y: 100
        },
        scale: {
          x: 1.75,
          y: 1.7
        },
      },
      mask: {
        x: 166,
        y: 0,
        w: 640,
        h: 560
      }
    }
  },
  mbsl: {
    api: {
      variation: 14,
      slot_type: "mermaid-beauty"
    },
    footerBar: {
      info: {
        position: {
          x: 40,
          y: 25
        }
      },
      setting: {
        position: {
          x: 320,
          y: 40
        }
      },
      wallet: {
        position: {
          x: 384,
          y: 40
        }
      },
      holdSpin: {
        position: {
          x: 1110,
          y: 40
        }
      },
      totalWin: {
        position: {
          x: 1190,
          y: 40
        }
      },
      totalBet: {
        position: {
          x: 1190,
          y: 80
        }
      },
      totalBetStatic: {
        position: {
          x: 1060,
          y: 80
        }
      },
      spin: {
        position: {
          x: 1470,
          y: 10
        }
      },
      autospin: {
        position: {
          x: 1380,
          y: 22
        }
      },
      autospinText: {
        position: {
          x: 1410,
          y: 0
        }
      },
      bet: {
        position: {
          x: 665,
          y: 74
        }
      },
      betStatic: {
        position: {
          x: 665,
          y: 30
        }
      },
      bline: {
        position: {
          x: 0,
          y: -6
        }
      },
      betup: {
        position: {
          x: 768,
          y: 40
        },
        scale: {
          x: 1.4,
          y: 1.4
        }
      },
      betdown: {
        position: {
          x: 505,
          y: 40
        },
        scale: {
          x: 1.4,
          y: 1.4
        }
      },
      blineup: {
        position: {
          x: 80,
          y: -45
        },
        scale: {
          x: 1.4,
          y: 1.4
        }
      },
      blinedown: {
        position: {
          x: -135,
          y: -45
        },
        scale: {
          x: 1.4,
          y: 1.4
        }
      },
      chipList: {
        position: {
          x: 690,
          y: 0
        },
      }
    },
    loadingBarLength: 70,
    loadingBarLogo: {
      logo: {
        position: {
          x: 280,
          y: 200
        },
        scale: {
          x: 1.0,
          y: 1.0
        }
      },
      loadingBar: {
        position: {
          x: 280,
          y: 500
        },
        scale: {
          x: 1,
          y: 1
        }
      }
    },
    cardBack: {
      length: 14,
      scale: {
        x: 1.4,
        y: 1.4
      },
      position: {
        x: 82,
        y: 152
      }
    },
    fontFaceTitle: "Silvano",
    fontFaceValue: "Silvano",
    fill: 0xffffff,
    style: "normal",
    splash: {
      fire: {
        count: 1,
        scale: { x: 1.1, y: 1.1 },
        position: { x: -70, y: 35 },
        speed: 0.5,
      },
      fire2: {
        count: 1,
        scale: { x: 1.1, y: 1.1 },
        position: { x: 1560, y: 35 },
        speed: 0.4,
      },
      candle: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 40, y: 540, },
        speed: 0.5,
      },
      candle2: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 1840, y: 540 },
        speed: 0.5,
      },
      bubble: {
        count: 1,
        scale: { x: 1, y: 1 },
        position: { x: 90, y: -70, },
        speed: 0.2,
      },
    },
    backBubble: {
      count: 34,
      desktop: {
        position: [
          { x: 100, y: 1000, },
          { x: 1800, y: 1000, }
        ],
      },
      mobile: {
        position: [
          { x: 600, y: 1500, },
          { x: 1200, y: 1500, }
        ],
      },
    },
    scaleFactor: [1.46, 1.46, 1, 1, 1],
    portal: {
      scale: [1.15, 1.15, 1],
      position: [
        { x: 962, y: 500 },
        { x: 962, y: 500 },
        { x: 965, y: 450 }
      ],
      logoAnim: {
        length: 27,
        scale: [2.3, 1.9],
        position: [
          { x: 940, y: 91 },
          { x: 970, y: 115 },
        ],
      },
    },
    start: {
      scale: [1, 0.8, 0.7],
      position: [
        { x: 970, y: 1100 },
        { x: 970, y: 1100 },
        { x: 950, y: 950 }
      ]
    },
    loading: {
      initText: {
        position: {
          x: 980,
          y: 550
        }
      },
      icon: {
        position: {
          x: 970,
          y: 650
        }
      },
      splashContainer: {
        position: {
          x: 680,
          y: 300
        }
      }
    },
    bloodTrail: {
      count: 1,
      desktop: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mobile: {
        position: {
          x: 0,
          y: 0
        },
        scale: {
          x: 1,
          y: 1
        },
      },
      mask: {
        x: 0,
        y: 0,
        w: 250,
        h: 140
      }
    }
  },
}