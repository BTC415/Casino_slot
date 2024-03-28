import { reelType, slotAnimateUrlType } from "../@types";
import { PIXI, appStage } from "../renderer";
import { sound } from '@pixi/sound';
import { backout, reelTweenings, tweenTo } from "./urls";
import { Game_Category_Config, Game_Category_Dimension, game_global_vars } from "../config";
import { toast } from 'react-toastify';
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export const initialBetItemListString = '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]';
export const media_stop_mobile_xs = 0.51
export const media_stop_mobile = 0.6
export const media_stop_tablet = 0.85
export const media_stop_desktop_sm = 1.2
export const fire_animate = () => {
    const frames = [];
    for (let i = 0; i < Game_Category_Config[game_global_vars.gameId].splash.fire.count; i++) {
        frames.push(PIXI.Texture.from(`fire_image_${i}.${webpORpng}`));
    }
    const fireSprite = new PIXI.AnimatedSprite(frames);
    fireSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.fire.speed;
    fireSprite.play();
    fireSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.fire.position.x, Game_Category_Config[game_global_vars.gameId].splash.fire.position.y)
    fireSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.fire.scale.x, Game_Category_Config[game_global_vars.gameId].splash.fire.scale.y)
    appStage.addChild(fireSprite);
    const new_fireSprite = new PIXI.AnimatedSprite(frames);
    new_fireSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.fire2.speed;
    new_fireSprite.play();
    new_fireSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.fire2.position.x, Game_Category_Config[game_global_vars.gameId].splash.fire2.position.y)
    new_fireSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.fire2.scale.x, Game_Category_Config[game_global_vars.gameId].splash.fire2.scale.y)
    appStage.addChild(new_fireSprite);
    const torch_base_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/torch-base.${webpORpng}`))
    torch_base_sprite.position.set(Game_Category_Dimension[game_global_vars.gameId].torch.position.x, Game_Category_Dimension[game_global_vars.gameId].torch.position.y)
    torch_base_sprite.scale.set(Game_Category_Dimension[game_global_vars.gameId].torch.scale.x, Game_Category_Dimension[game_global_vars.gameId].torch.scale.y)
    appStage.addChild(torch_base_sprite);
    candle_animate()
    const torch_base_sprite_2 = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/torch-base2.${webpORpng}`))
    torch_base_sprite_2.position.set(Game_Category_Dimension[game_global_vars.gameId].torch2.position.x, Game_Category_Dimension[game_global_vars.gameId].torch2.position.y)
    torch_base_sprite_2.scale.set(Game_Category_Dimension[game_global_vars.gameId].torch2.scale.x, Game_Category_Dimension[game_global_vars.gameId].torch2.scale.y)
    appStage.addChild(torch_base_sprite_2);
}
export const candle_animate = () => {
    const frames = [];
    for (let i = 0; i < Game_Category_Config[game_global_vars.gameId].splash.candle.count; i++) {
        frames.push(PIXI.Texture.from(`candle_image_${i}.${webpORpng}`));
    }
    const candleSprite = new PIXI.AnimatedSprite(frames);
    candleSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.candle.speed;
    candleSprite.play();
    candleSprite.anchor.set(0.5)
    candleSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.candle.position.x, Game_Category_Config[game_global_vars.gameId].splash.candle.position.y)
    candleSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.candle.scale.x, Game_Category_Config[game_global_vars.gameId].splash.candle.scale.y)
    appStage.addChild(candleSprite);
    const new_candleSprite = new PIXI.AnimatedSprite(frames);
    new_candleSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.candle2.speed;
    new_candleSprite.play();
    new_candleSprite.anchor.set(0.5)
    new_candleSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.candle2.position.x, Game_Category_Config[game_global_vars.gameId].splash.candle2.position.y)
    new_candleSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.candle2.scale.x, Game_Category_Config[game_global_vars.gameId].splash.candle2.scale.y)
    appStage.addChild(new_candleSprite);
}
export const pot_bubble_animate = (potSprite: PIXI.Sprite, potSprite_2: PIXI.Sprite) => {
    const frames = [];
    for (let i = 0; i < Game_Category_Config[game_global_vars.gameId].splash.bubble.count; i++) {
        frames.push(PIXI.Texture.from(`bubble_image_${i}.${webpORpng}`));
    }
    const bubbleSprite = new PIXI.AnimatedSprite(frames);
    bubbleSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.bubble.speed;
    bubbleSprite.play();
    bubbleSprite.anchor.set(0.5)
    bubbleSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.bubble.position.x, Game_Category_Config[game_global_vars.gameId].splash.bubble.position.y)
    bubbleSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.bubble.scale.x, Game_Category_Config[game_global_vars.gameId].splash.bubble.scale.y)
    potSprite.addChild(bubbleSprite);
    const new_bubbleSprite = new PIXI.AnimatedSprite(frames);
    new_bubbleSprite.animationSpeed = Game_Category_Config[game_global_vars.gameId].splash.bubble.speed;
    new_bubbleSprite.play();
    new_bubbleSprite.anchor.set(0.5)
    new_bubbleSprite.position.set(Game_Category_Config[game_global_vars.gameId].splash.bubble.position.x, Game_Category_Config[game_global_vars.gameId].splash.bubble.position.y)
    new_bubbleSprite.scale.set(Game_Category_Config[game_global_vars.gameId].splash.bubble.scale.x, Game_Category_Config[game_global_vars.gameId].splash.bubble.scale.y)
    potSprite_2.addChild(new_bubbleSprite);
}
export const gen_card_animated_sprite = (item: slotAnimateUrlType) => {
    const frames = [];
    for (let i = 1; i <= (item.playback ? item.length * 2 - 1 : item.length); i++) {
        const j = (i > item.length) ? item.length * 2 - i : i
        frames.push(PIXI.Texture.from(`card-${item.title}-anim-${j}.${webpORpng}`));
    }
    const cardAnimateSprite = new PIXI.AnimatedSprite(frames);
    cardAnimateSprite.animationSpeed = item.speed;
    // cardAnimateSprite.play();
    appStage.addChild(cardAnimateSprite);
    cardAnimateSprite.position.set(item.position.x, item.position.y)
    cardAnimateSprite.scale.set(item.scale.x, item.scale.y)
    return cardAnimateSprite;
}
export const gen_card_back_fire_sprite = () => {
    const frames = [];
    for (let i = 1; i <= Game_Category_Config[game_global_vars.gameId].cardBack.length; i++) {
        frames.push(PIXI.Texture.from(`card-back-fire-anim-${i}.${webpORpng}`));
    }
    const card_back_fire_sprite = new PIXI.AnimatedSprite(frames);
    card_back_fire_sprite.animationSpeed = 0.2
    // gen_card_back_fire_sprite.play()
    card_back_fire_sprite.anchor.set(0.5)
    card_back_fire_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].cardBack.scale.x, Game_Category_Config[game_global_vars.gameId].cardBack.scale.y)
    // gen_card_back_fire_sprite.position.set(0,0)
    return card_back_fire_sprite
}
export const gen_portal_logo_animated_sprite = () => {
    const frames = [];
    for (let i = 1; i <= Game_Category_Config[game_global_vars.gameId].portal.logoAnim.length; i++) {
        frames.push(PIXI.Texture.from(`portal-logo-anim-${i}.${webpORpng}`));
    }
    const portal_logo_anim_sprite = new PIXI.AnimatedSprite(frames);
    portal_logo_anim_sprite.animationSpeed = 0.2
    portal_logo_anim_sprite.play()
    return portal_logo_anim_sprite
}

export const gen_blood_trail = () => {

    const frames = [];
    for (let i = 1; i <= Game_Category_Config[game_global_vars.gameId].bloodTrail.count; i++) {
        frames.push(PIXI.Texture.from(`blood-1-anim-${i}.${webpORpng}`));
    }

    const blood_trail_sprite = new PIXI.AnimatedSprite(frames);
    blood_trail_sprite.animationSpeed = 0.25
    blood_trail_sprite.position.set(Game_Category_Config[game_global_vars.gameId].bloodTrail[mobileORdesktop].position.x, Game_Category_Config[game_global_vars.gameId].bloodTrail[mobileORdesktop].position.y)
    blood_trail_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].bloodTrail[mobileORdesktop].scale.x, Game_Category_Config[game_global_vars.gameId].bloodTrail[mobileORdesktop].scale.y)
    blood_trail_sprite.gotoAndStop(0)

    const blood_trail_mask = new PIXI.Graphics()
    blood_trail_mask.lineStyle(0).beginFill(0x444444, 1).drawRect(Game_Category_Config[game_global_vars.gameId].bloodTrail.mask.x, Game_Category_Config[game_global_vars.gameId].bloodTrail.mask.y, Game_Category_Config[game_global_vars.gameId].bloodTrail.mask.w, Game_Category_Config[game_global_vars.gameId].bloodTrail.mask.h,);
    blood_trail_sprite.addChild(blood_trail_mask)
    blood_trail_sprite.mask = blood_trail_mask

    blood_trail_sprite.alpha = 0
    appStage.addChild(blood_trail_sprite);

    game_global_vars.blood_trail = blood_trail_sprite
}
export const change_blood_trail = (it: number) => {
    // const changer = [0, 1, 4, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    const frames = [];
    for (let i = 1; i <= Game_Category_Config[game_global_vars.gameId].bloodTrail.count; i++) {
        frames.push(PIXI.Texture.from(`blood-${it + 1}-anim-${i}.${webpORpng}`));
    }
    if (game_global_vars.blood_trail) {
        game_global_vars.blood_trail.textures = frames
    }
}
export const gen_autospin_item = (text: string) => {
    const button_auto_spin_item = new PIXI.Graphics()
    button_auto_spin_item.lineStyle(0);
    button_auto_spin_item.beginFill(0x444444, 1).drawRect(0, 0, 70, 50);
    const button_auto_spin_item_static_text = new PIXI.Text(text, { fontFamily: 'Salsa', fontSize: 20, fill: 0xffffff })
    button_auto_spin_item_static_text.anchor.set(0.5)
    button_auto_spin_item_static_text.position.set(button_auto_spin_item.width / 2, button_auto_spin_item.height / 2)
    button_auto_spin_item.addChild(button_auto_spin_item_static_text)
    return button_auto_spin_item
}
export const calculateScale = (sprite: PIXI.DisplayObject): PIXI.ObservablePoint => {
    if (!sprite.parent) {
        const new_point = new PIXI.ObservablePoint(() => { }, null, sprite.scale.x, sprite.scale.y)
        return new_point
    }
    const parentSprite = sprite.parent;
    const new_parentScale = calculateScale(parentSprite);
    const spriteScale = sprite.scale;
    new_parentScale.x *= spriteScale.x
    new_parentScale.y *= spriteScale.y
    return new_parentScale;
}
export const sleep = async (time: number) => await new Promise((resolve) => {
    setTimeout(() => resolve("Go"), time);
});
export const pay_table = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 2],
    [1, 1, 2, 1, 0],
    [2, 2, 2, 2, 2],
    [1, 0, 1, 2, 1],
    [1, 0, 1, 2, 2],
    [1, 0, 0, 1, 2],
    [1, 2, 1, 0, 1],
    [1, 2, 2, 1, 0],
    [1, 2, 1, 0, 0],
    [0, 1, 2, 1, 0],
    [0, 1, 1, 1, 2],
    [0, 0, 1, 2, 2],
    [0, 0, 1, 2, 1],
    [0, 0, 0, 1, 2],
    [2, 1, 0, 1, 2],
    [2, 1, 1, 1, 0],
    [2, 2, 1, 0, 0],
    [2, 2, 1, 0, 1],
]

export const playSound = (type: 'bg' | 'spin' | 'win') => {
    let status = '';
    switch (type) {
        case 'bg':
            status = localStorage.getItem('music') || 'true'
            break;
        case 'spin':
        case 'win':
            status = localStorage.getItem('fx') || 'true'
            break;
    }
    if (status === 'true')
        sound.play(`${type}-sound`, { loop: type === 'bg' });
}
export const stopSound = (type: 'bg' | 'spin' | 'win') => {
    sound.stop(`${type}-sound`)
}

export const loadSound = () => {
    sound.add('bg-sound', `${VITE_API_ASSETS_ELSE_URL}audio/bgm/bg-sound-${game_global_vars.gameId}.mp3`);
    sound.add('spin-sound', `${VITE_API_ASSETS_ELSE_URL}audio/sfx/spin.mp3`);
    sound.add('win-sound', `${VITE_API_ASSETS_ELSE_URL}audio/sfx/win.mp3`);
    sound.volumeAll = 0.5

}
export const setVolume = (val: number) => {
    sound.volumeAll = val / 100
}
export const animateReels = (reels: reelType[], reelsComplete: () => Promise<void>) => {

    reelTweenings.splice(0)
    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        // const extra = Math.floor(Math.random() * 3);
        // const target = r.position + 50 + i * 5 + extra;
        const target = r.animated_symbols.length * 10
        const time = 8000 + i * 500
        tweenTo(r, 'position', r.position % r.animated_symbols.length, target, time, backout(1.01/*1.03*/), null, i === reels.length - 1 ? reelsComplete : null, true);
    }
}
export const getUTCTimefromUTCTime: (timeString: string) => Date = (timeString: string) => {
    // const timeString = '2023-11-08 16:37:44';
    if (!timeString) return new Date()
    const modifiedTimeString = timeString.replace(' ', 'T');

    // Create a new Date object from the modified time string
    const date = new Date(modifiedTimeString);

    // Get the individual components of the date in local time
    // const year = date.getFullYear();
    // const month = date.getMonth();
    // const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    // Apply the GMT offset
    date.setHours(hours - 0);// ! Indian Server Time Zone GMT +5:30
    date.setMinutes(minutes - 0 - date.getTimezoneOffset());

    // Get the UTC time in milliseconds
    // const utcTime = Date.UTC(year, month, day, date.getHours(), date.getMinutes(), seconds);

    // console.log(utcTime);
    return date;

}



/* View in fullscreen */
export const openFullscreen = () => {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    // else if (elem.webkitRequestFullscreen) { /* Safari */
    //     elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { /* IE11 */
    //     elem.msRequestFullscreen();
    // }
}

/* Close fullscreen */
export const closeFullscreen = async () => {
    if (document.exitFullscreen) {
        try {
            await document.exitFullscreen();
        } catch { }

    }
    // else if (document.webkitExitFullscreen) { /* Safari */
    //     document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) { /* IE11 */
    //     document.msExitFullscreen();
    // }
}
export const checkDevice = () => {
    let iPhone = false
    let mobile = false
    if (/Mobi/i.test(navigator.userAgent) || /Macintosh/i.test(navigator.userAgent)) {
        console.log("This is a mobile device");
        mobile = true
        if (/iPhone/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPhone");
        } else if (/iPad/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPad");
        } else if (/Macintosh/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is a Macintosh");
        }
    } else {
        console.log("This is a browser");
    }
    return { iPhone, mobile }
}
export const showToast = (msg:string) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const mobileORdesktop = /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop"
export const webpORpng = PIXI.utils.isWebGLSupported() ? "webp" : "png"