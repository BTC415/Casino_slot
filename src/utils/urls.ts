import { slotAnimateUrlType, tweenType } from "../@types"
import { PIXI } from "../renderer"
import { v4 as uuidv4 } from 'uuid';
import { mobileORdesktop, webpORpng } from "./utils";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL


export const getAssetUrls = (gameId: string) => ([

    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/background.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/back-fore-corner.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-mobile.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-desktop.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/background-footer.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/torch-base.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/torch-base2.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-back.${webpORpng}`,

    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-spin.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-spin-empty.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-empty.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-stop.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-info-bar.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-info-bar-empty.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/fire.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bubble.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/back-bubble.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/candle.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-wild-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-10-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-A-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-bird-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-boy-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-dragon-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-girl-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-J-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-K-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-Q-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-sun-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-triangle-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-setting-empty.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-setting.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-bet.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-wallet.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-wallet-empty.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-up-down.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-A.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-stop.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-chip.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-H.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-i.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-reload.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-setting.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-wallet.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/game-board-mask.${webpORpng}`,




    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-1-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-2-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-3-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-4-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-5-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-6-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-7-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-8-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-9-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-10-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-11-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-12-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-13-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-14-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-15-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-16-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-17-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-18-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-19-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/blood-20-anim.json`,

    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/card-back-fire-anim.json`,




    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/portal1.${webpORpng}`,

    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/button-start.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/portal-logo-anim.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/pot.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/pot2.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/scull.${webpORpng}`,
    //Sound
    `${VITE_API_ASSETS_ELSE_URL}audio/sfx/spin.mp3`,
    `${VITE_API_ASSETS_ELSE_URL}audio/sfx/win.mp3`,
    `${VITE_API_ASSETS_ELSE_URL}audio/bgm/bg-sound-${gameId}.mp3`,
])
export const slotAnimateUrls: { [key: string]: slotAnimateUrlType[] } = {
    jrsl: [
        { title: '10', length: 22, position: { x: -40, y: -30 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'A', length: 30, position: { x: -50, y: 0 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'bird', length: 30, position: { x: 0, y: 20 }, scale: { x: 1, y: 0.9 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'boy', length: 14, position: { x: -47, y: -35 }, scale: { x: 0.45, y: 0.4 }, playback: false, speed: 0.11, hue: 60, saturate: 1, brightness: 1 },
        { title: 'dragon', length: 24, position: { x: 3, y: 33 }, scale: { x: 0.95, y: 0.87 }, playback: true, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'girl', length: 13, position: { x: -80, y: -105 }, scale: { x: 0.52, y: 0.49 }, playback: true, speed: 0.11, hue: -125, saturate: 0.8, brightness: 1.5 },
        { title: 'wild', length: 17, position: { x: -50, y: -50 }, scale: { x: 1.6, y: 1.4 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'J', length: 26, position: { x: -10, y: 0 }, scale: { x: 1.1, y: 1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'K', length: 26, position: { x: -10, y: 0 }, scale: { x: 1.1, y: 1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'Q', length: 28, position: { x: -20, y: 0 }, scale: { x: 1.1, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'sun', length: 29, position: { x: 0, y: 18 }, scale: { x: 1, y: 1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'triangle', length: 18, position: { x: -40, y: -20 }, scale: { x: 1.3, y: 1.2 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
    ],
    vvsl: [
        { title: '10', length: 23, position: { x: -50, y: -35 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'A', length: 23, position: { x: -42, y: -35 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'bird', length: 108, position: { x: -85, y: -75 }, scale: { x: 1.58, y: 1.65 }, playback: false, speed: 0.5, hue: 0, saturate: 1, brightness: 1 },
        { title: 'boy', length: 71, position: { x: -85, y: -57 }, scale: { x: 1.58, y: 1.5 }, playback: false, speed: 0.3, hue: 60, saturate: 1, brightness: 1 },
        { title: 'dragon', length: 109, position: { x: -90, y: -82 }, scale: { x: 1.6, y: 1.65 }, playback: false, speed: 0.5, hue: 0, saturate: 1, brightness: 1 },
        { title: 'girl', length: 71, position: { x: -80, y: -40 }, scale: { x: 1.45, y: 1.35 }, playback: false, speed: 0.3, hue: -125, saturate: 0.8, brightness: 1.5 },
        { title: 'wild', length: 108, position: { x: -67, y: -50 }, scale: { x: 1.45, y: 1.45 }, playback: false, speed: 0.5, hue: 0, saturate: 1, brightness: 1 },
        { title: 'J', length: 23, position: { x: -50, y: -35 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'K', length: 23, position: { x: -50, y: -35 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'Q', length: 23, position: { x: -50, y: -35 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'sun', length: 104, position: { x: -98, y: -70 }, scale: { x: 1.65, y: 1.6 }, playback: false, speed: 0.5, hue: 0, saturate: 1, brightness: 1 },
        { title: 'triangle', length: 108, position: { x: -60, y: -50 }, scale: { x: 1.4, y: 1.4 }, playback: false, speed: 0.5, hue: 0, saturate: 1, brightness: 1 },
    ],
    grsl: [
        { title: '10', length: 20, position: { x: -25, y: -10 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'A', length: 20, position: { x: 10, y: 0 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'bird', length: 14, position: { x: 20, y: -10 }, scale: { x: 1.2, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'boy', length: 30, position: { x: -84, y: -60 }, scale: { x: 1.46, y: 1.35 }, playback: false, speed: 0.3, hue: 60, saturate: 1, brightness: 1 },
        { title: 'dragon', length: 27, position: { x: -160, y: -260 }, scale: { x: 1.45, y: 1.45 }, playback: true, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'girl', length: 54, position: { x: -10, y: -15 }, scale: { x: 1.25, y: 1.12 }, playback: true, speed: 0.3, hue: -125, saturate: 0.8, brightness: 1.5 },
        { title: 'wild', length: 27, position: { x: -75, y: -85 }, scale: { x: 1.83, y: 1.68 }, playback: false, speed: 0.4, hue: 0, saturate: 1, brightness: 1 },
        { title: 'J', length: 20, position: { x: 60, y: 0 }, scale: { x: 1.1, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'K', length: 21, position: { x: 30, y: 0 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'Q', length: 20, position: { x: 20, y: 0 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'sun', length: 27, position: { x: -160, y: -160 }, scale: { x: 2.3, y: 2.3 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'triangle', length: 27, position: { x: -10, y: 0 }, scale: { x: 1.2, y: 1.1 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
    ],
    wwsl: [
        { title: '10', length: 15, position: { x: -70, y: -110 }, scale: { x: 1.4, y: 1.6 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'A', length: 15, position: { x: -100, y: -100 }, scale: { x: 1.6, y: 1.6 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'bird', length: 15, position: { x: -90, y: -80 }, scale: { x: 1.31, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'boy', length: 16, position: { x: -88, y: -79 }, scale: { x: 1.3, y: 1.195 }, playback: false, speed: 0.1, hue: 60, saturate: 1, brightness: 1 },
        { title: 'dragon', length: 15, position: { x: -90, y: -80 }, scale: { x: 1.31, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'girl', length: 16, position: { x: -88, y: -79 }, scale: { x: 1.3, y: 1.195 }, playback: true, speed: 0.1, hue: -125, saturate: 0.8, brightness: 1.5 },
        { title: 'wild', length: 15, position: { x: -90, y: -80 }, scale: { x: 1.31, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'J', length: 15, position: { x: -100, y: -100 }, scale: { x: 1.6, y: 1.6 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'K', length: 15, position: { x: -100, y: -100 }, scale: { x: 1.6, y: 1.6 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'Q', length: 15, position: { x: -100, y: -100 }, scale: { x: 1.6, y: 1.6 }, playback: false, speed: 0.2, hue: 0, saturate: 1, brightness: 1 },
        { title: 'sun', length: 15, position: { x: -90, y: -80 }, scale: { x: 1.31, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
        { title: 'triangle', length: 15, position: { x: -90, y: -80 }, scale: { x: 1.31, y: 1.2 }, playback: false, speed: 0.1, hue: 0, saturate: 1, brightness: 1 },
    ],
    mbsl: [
        { title: '10', length: 27, position: { x: -60, y: 50 }, scale: { x: 1.3, y: 1.3 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'A', length: 27, position: { x: -30, y: 30 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'bird', length: 44, position: { x: -30, y: -60 }, scale: { x: 1.37, y: 1.36 }, playback: false, speed: 0.244, hue: 0, saturate: 1, brightness: 1 },
        { title: 'boy', length: 20, position: { x: -62, y: 20 }, scale: { x: 0.675, y: 0.57 }, playback: false, speed: 0.11, hue: 60, saturate: 1, brightness: 1 },
        { title: 'dragon', length: 27, position: { x: -50, y: 30 }, scale: { x: 1.35, y: 1.2 }, playback: true, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'girl', length: 20, position: { x: -60, y: -10 }, scale: { x: 0.727, y: 0.63 }, playback: true, speed: 0.15, hue: -125, saturate: 0.8, brightness: 1.5 },
        { title: 'wild', length: 57, position: { x: -270, y: -4 }, scale: { x: 1.32, y: 1.12 }, playback: false, speed: 0.306, hue: 0, saturate: 1, brightness: 1 },
        { title: 'J', length: 27, position: { x: -40, y: 30 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'K', length: 27, position: { x: -30, y: 30 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'Q', length: 27, position: { x: -30, y: 30 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },
        { title: 'sun', length: 38, position: { x: -45, y: 0 }, scale: { x: 1.2, y: 1 }, playback: false, speed: 0.21, hue: 0, saturate: 1, brightness: 1 },
        { title: 'triangle', length: 27, position: { x: -60, y: 30 }, scale: { x: 1.3, y: 1.1 }, playback: false, speed: 0.15, hue: 0, saturate: 1, brightness: 1 },

    ],
}
export const slotReels = [
    [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
    ],
    [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        0,
    ],
    [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        0,
        1,
    ],
    [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        0,
        1,
        2,
    ],
    [
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        0,
        1,
        2,
        3,
    ],
]

export const show_dialog = (info_dialog_wrapper: PIXI.Container, close_button_sprite: PIXI.Sprite) => {
    if (info_dialog_wrapper.alpha === 0) {
        info_dialog_wrapper.y = 0
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
    } else if (info_dialog_wrapper.alpha === 1) {
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        tweenTo(info_dialog_wrapper, 'y', 0, 10000, 500, rectout(), null, null)
        close_button_sprite.eventMode = 'none'
    }
}
export const allTweenings: tweenType[] = [];
export const reelTweenings: tweenType[] = [];
export function tweenTo(
    object: Object,
    property: string,
    propertyBeginValue: number,
    target: number,
    time: number,
    easing: (t: number) => number,
    change: (() => Promise<void>) | null,
    complete: (() => Promise<void>) | null,
    willCreateReelTweening: boolean = false
) {
    const tween = {
        object,
        property,
        propertyBeginValue,
        target,
        easing,
        time,
        change,
        complete,
        start: Date.now(),
        uuid: uuidv4(),
        flow: !willCreateReelTweening
    };

    if (willCreateReelTweening) reelTweenings.push(tween);
    allTweenings.push(tween);
    return tween;
}
export function lerp(a1: any, a2: any, t: any) {
    return a1 * (1 - t) + a2 * t;
}
export function backout(b: number) {
    // return (t: any) => (t * t * ((amount + 1) * t + amount));
    return (t: number) => t * b / b //(Math.sin(b * Math.PI * t - Math.PI / 2) + 1) / (Math.sin(b * Math.PI - Math.PI / 2) + 1)
}
export function interpolate(x: number, x1: number, x2: number, y1: number, y2: number) {
    return Math.max(Math.min(y1, y2), Math.min(Math.max(y1, y2), (y2 - y1) * (x - x1) / (x2 - x1) + y1))
}
export function fadeInOut() {
    return (t: number) => 1 - Math.sin(t * Math.PI)
}
export function rectout() {
    return (t: number) => (t < 0.99) ? 1 : 0
}