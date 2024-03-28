import { Game_Category_Dimension_Type } from "../@types"

export const Game_Category_Dimension: { [key: string]: Game_Category_Dimension_Type } = {
    jrsl: {
        gameBoard: { width: 1920, height: 960, cardHeight: 270, x: -50, y: 0 },
        footerBar: { width: 1920, height: 117 },
        mask: { x: 0, y: 270, width: 1330, height: 810 },
        reelContainer: { x: 365, y: -110, scale: { x: 0.90, y: 0.99 }, gap: 265 },
        torch: {
            position: {
                x: 202, y: 418,
            },
            scale: {
                x: 1.15, y: 1
            },
        },
        torch2: {
            position: {
                x: 1634, y: 418,
            },
            scale: {
                x: 1.18, y: 1
            },
        },
        bg: {
            desktop: {
                width: 1920,
                height: 1920
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
    vvsl: {
        gameBoard: { width: 1800, height: 935, cardHeight: 320, x: -560, y: 0 },
        footerBar: { width: 1920, height: 116 },
        mask: { x: -10, y: 270, width: 1800, height: 960 },
        reelContainer: { x: 310, y: -10, scale: { x: 0.7, y: 0.7 }, gap: 355 },
        torch: {
            position: {
                x: -120, y: 0,
            },
            scale: {
                x: 1, y: 1
            },
        },
        torch2: {
            position: {
                x: -100, y: 80,
            },
            scale: {
                x: 1, y: 1
            },
        },
        bg: {
            desktop: {
                width: 1920,
                height: 1920
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
    grsl: {
        gameBoard: { width: 1920, height: 940, cardHeight: 270, x: -50, y: 0 },
        footerBar: { width: 1920, height: 117 },
        mask: { x: -100, y: 270, width: 1630, height: 810 },
        reelContainer: { x: 357, y: -65, scale: { x: 0.80, y: 0.86 }, gap: 305 },
        torch: {
            position: {
                x: 202, y: 418,
            },
            scale: {
                x: 1.15, y: 1
            },
        },
        torch2: {
            position: {
                x: 1634, y: 418,
            },
            scale: {
                x: 1.18, y: 1
            },
        },
        bg: {
            desktop: {
                width: 1080,
                height: 1080
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
    wwsl: {
        gameBoard: { width: 1920, height: 960, cardHeight: 270, x: -45, y: 0 },
        footerBar: { width: 1920, height: 117 },
        mask: { x: -100, y: 270, width: 1630, height: 810 },
        reelContainer: { x: 398, y: 23, scale: { x: 0.77, y: 0.82 }, gap: 290 },
        torch: {
            position: {
                x: 202, y: 418,
            },
            scale: {
                x: 1.15, y: 1
            },
        },
        torch2: {
            position: {
                x: 1634, y: 418,
            },
            scale: {
                x: 1.18, y: 1
            },
        },
        bg: {
            desktop: {
                width: 1920,
                height: 1920
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
    mbsl: {
        gameBoard: { width: 1920, height: 960, cardHeight: 270, x: -50, y: 0 },
        footerBar: { width: 1920, height: 117 },
        mask: { x: -100, y: 300, width: 1670, height: 810 },
        reelContainer: { x: 357, y: -95, scale: { x: 0.80, y: 0.92 }, gap: 326 },
        torch: {
            position: {
                x: 202, y: 418,
            },
            scale: {
                x: 1.15, y: 1
            },
        },
        torch2: {
            position: {
                x: 1634, y: 418,
            },
            scale: {
                x: 1.18, y: 1
            },
        },
        bg: {
            desktop: {
                width: 1920,
                height: 1920
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
}