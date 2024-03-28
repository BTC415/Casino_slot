import { reelType } from "../../@types";
import { Game_Category_Config, Game_Category_Dimension, gameMessageTextStyle, game_global_vars, winTextStyle } from "../../config";
import { Global_Vars, PIXI, app, appStage } from "../../renderer";
import keyboard from "../../utils/keyboard";
import { getReelContainerMask } from "../../utils/mask";
import { backout, slotAnimateUrls, slotReels, tweenTo, allTweenings, reelTweenings, interpolate } from "../../utils/urls";
import { animateReels, calculateScale, media_stop_mobile, fire_animate, gen_autospin_item, gen_card_animated_sprite, playSound, media_stop_tablet, media_stop_desktop_sm, initialBetItemListString, pot_bubble_animate, gen_blood_trail, change_blood_trail, gen_card_back_fire_sprite, webpORpng, mobileORdesktop, showToast, checkDevice } from "../../utils/utils";
import { gameParamsType } from "../../store/types";
import axios from "axios";
import { AdjustmentFilter } from '@pixi/filter-adjustment';
import * as React from "react"
import InfoDialog from "./InfoDialog";
import SettingDialog from "./SettingDialog";
import AutoSpinDialog from "./AutoSpinDialog";
import ChipDialog from "./ChipDialog";
import LineDialog from "./LineDialog";
import BetHistory from "./BetHistory";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL



const loadMainScreen = (gameParams: gameParamsType, setBalance: (balanceOrCb: number | ((v: number) => number)) => void, setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, setFullScreen: React.Dispatch<React.SetStateAction<boolean>>) => {
    const { iPhone } = checkDevice()
    if (!iPhone)
        setFullScreen(true)
    game_global_vars.pf_hash = gameParams.hash
    Global_Vars.loaded = true;
    appStage.removeChildren();
    playSound('bg')

    const potSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/pot.${webpORpng}`))
    const potSprite_2 = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/pot2.${webpORpng}`))
    app.stage.addChild(potSprite);
    app.stage.addChild(potSprite_2);



    const gameBoardSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/background.${webpORpng}`))
    const gameBoardMaskSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/game-board-mask.${webpORpng}`))
    const scullSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/scull.${webpORpng}`))
    scullSprite.scale.set(2.5)
    gameBoardSprite.position.set(Game_Category_Dimension[game_global_vars.gameId].gameBoard.x, Game_Category_Dimension[game_global_vars.gameId].gameBoard.y)

    gameBoardSprite.addChild(gameBoardMaskSprite)
    gameBoardSprite.addChild(scullSprite)
    appStage.addChild(gameBoardSprite);



    const frames = [];

    for (let i = 0; i < Game_Category_Config[game_global_vars.gameId].backBubble.count; i++) {
        frames.push(PIXI.Texture.from(`back_bubble_${i}.${webpORpng}`));
    }
    const back_bubble_sprite = new PIXI.AnimatedSprite(frames);
    const new_back_bubble_sprite = new PIXI.AnimatedSprite(frames);
    back_bubble_sprite.animationSpeed = 0.2;
    back_bubble_sprite.play();
    back_bubble_sprite.anchor.set(0.5, 1)
    back_bubble_sprite.scale.set(1, 1)


    new_back_bubble_sprite.animationSpeed = 0.2;
    new_back_bubble_sprite.play();
    new_back_bubble_sprite.anchor.set(0.5, 1)
    new_back_bubble_sprite.scale.set(1, 1)
    appStage.addChild(back_bubble_sprite);
    appStage.addChild(new_back_bubble_sprite);

    const backgroundFooterSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/background-footer.${webpORpng}`))
    const backgroundFooterSpriteChildrenWrapper = new PIXI.Container()
    backgroundFooterSprite.addChild(backgroundFooterSpriteChildrenWrapper)
    backgroundFooterSpriteChildrenWrapper.position.set(50, 0)
    // backgroundFooterSprite.anchor.set(100 / backgroundFooterSprite.width, 0)
    app.stage.addChild(backgroundFooterSprite);

    const mobile_win_hold_spin_text_wrapper = new PIXI.Container()

    const init_bet_text = JSON.parse(localStorage.getItem(`bet14`) || initialBetItemListString)[0]
    const bet_text = new PIXI.Text(init_bet_text, { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });
    const bet_text_static = new PIXI.Text(' BET ', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2, });
    bet_text.on('pointerdown', () => {
        if (app.screen.width < app.screen.height * media_stop_tablet)
            setChildContent(<ChipDialog setChildContent={setChildContent} params={{ bet_text, total_bet_text, bline_val_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
    })
    bet_text_static.on('pointerdown', () => {
        if (app.screen.width < app.screen.height * media_stop_tablet)
            setChildContent(<ChipDialog setChildContent={setChildContent} params={{ bet_text, total_bet_text, bline_val_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
    })
    const total_bet_text = new PIXI.Text(init_bet_text, { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });
    const total_bet_text_static = new PIXI.Text(' TOTAL BET ', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2 });
    const win_hold_spin_static_text = new PIXI.Text(' HOLD SPIN TO QUICK SPINS ', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2, });
    game_global_vars.bet_text = bet_text
    game_global_vars.total_bet_text = total_bet_text
    total_bet_text.scale.set(1)
    total_bet_text_static.scale.set(1)
    const total_win_text = new PIXI.Text('', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2, });

    const mobile_win_hold_spin_text_upper = new PIXI.Text(' TOTAL BET ', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, stroke: '#000000', strokeThickness: 2, });
    const mobile_win_hold_spin_text_down = new PIXI.Text(init_bet_text, { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xf7d245, stroke: '#000000', strokeThickness: 2, });
    game_global_vars.mobile_win_hold_spin_text_upper = mobile_win_hold_spin_text_upper
    game_global_vars.mobile_win_hold_spin_text_down = mobile_win_hold_spin_text_down
    const mobile_win_line_text = new PIXI.Text('', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });

    const balance_text_static = new PIXI.Text(' BALANCE ', {
        fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2,
    });

    const win_line_text = new PIXI.Text('', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2 });
    win_line_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.x + 140, (Game_Category_Config[game_global_vars.gameId].footerBar.totalBetStatic.position.y + Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.y) / 2)
    mobile_win_line_text.anchor.set(0.5)
    mobile_win_line_text.position.set(150, 85)
    win_line_text.scale.set(0.8)

    const balance_text = new PIXI.Text(gameParams.balance.toLocaleString('en-US', { style: 'currency', currency: 'INR' }).substring(1), { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });
    backgroundFooterSpriteChildrenWrapper.addChild(bet_text_static)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_text)
    backgroundFooterSpriteChildrenWrapper.addChild(balance_text_static)
    backgroundFooterSpriteChildrenWrapper.addChild(balance_text)
    backgroundFooterSpriteChildrenWrapper.addChild(total_bet_text)
    backgroundFooterSpriteChildrenWrapper.addChild(total_bet_text_static)
    backgroundFooterSpriteChildrenWrapper.addChild(win_hold_spin_static_text)
    backgroundFooterSpriteChildrenWrapper.addChild(total_win_text)
    backgroundFooterSpriteChildrenWrapper.addChild(mobile_win_hold_spin_text_wrapper)
    backgroundFooterSpriteChildrenWrapper.addChild(win_line_text)



    const bg_mobile_win_hold_spin_text = new PIXI.Graphics()
    mobile_win_hold_spin_text_wrapper.addChild(bg_mobile_win_hold_spin_text)
    mobile_win_hold_spin_text_wrapper.addChild(mobile_win_hold_spin_text_upper)
    mobile_win_hold_spin_text_wrapper.addChild(mobile_win_hold_spin_text_down)
    mobile_win_hold_spin_text_wrapper.addChild(mobile_win_line_text)


    balance_text_static.anchor.set(0.5)
    balance_text.anchor.set(0.5)
    balance_text.position.set(115, 80)
    balance_text.scale.set(1)
    balance_text_static.position.set(120, 40)
    balance_text_static.scale.set(1)
    bet_text_static.anchor.set(0.5)
    bet_text.anchor.set(0.5)
    win_hold_spin_static_text.anchor.set(0.5)
    total_win_text.anchor.set(0.5)
    total_bet_text.anchor.set(0.5)
    total_bet_text_static.anchor.set(0.5)
    win_line_text.anchor.set(0.5)
    const changeWonLineUI = (isWin: boolean) => {
        if (isWin) {
            win_hold_spin_static_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.x - 80, Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.y)
            total_win_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalWin.position.x - 80, Game_Category_Config[game_global_vars.gameId].footerBar.totalWin.position.y)

            total_bet_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalBet.position.x - 80, Game_Category_Config[game_global_vars.gameId].footerBar.totalBet.position.y)
            total_bet_text_static.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalBetStatic.position.x - 80, Game_Category_Config[game_global_vars.gameId].footerBar.totalBetStatic.position.y)

            mobile_win_hold_spin_text_upper.position.set(100, 40)
            mobile_win_hold_spin_text_down.position.set(230, 40)
        } else {
            win_hold_spin_static_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.holdSpin.position.y)
            total_win_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalWin.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.totalWin.position.y)

            total_bet_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalBet.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.totalBet.position.y)
            total_bet_text_static.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.totalBetStatic.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.totalBetStatic.position.y)

            mobile_win_hold_spin_text_upper.position.set(150, 40)
            mobile_win_hold_spin_text_down.position.set(150, 85)
        }
    }
    changeWonLineUI(false)
    win_hold_spin_static_text.scale.set(1)
    mobile_win_hold_spin_text_upper.anchor.set(0.5)
    mobile_win_hold_spin_text_down.anchor.set(0.5)
    bg_mobile_win_hold_spin_text.lineStyle(2, 0xffffff);
    bg_mobile_win_hold_spin_text.beginFill(0x000000, 0.3)
        .drawRoundedRect(2, 2, 300, 120, 13)

    // const mobile_background_footer_sprite = new PIXI.Container()

    // app.stage.addChild(mobile_background_footer_sprite);
    const button_mobile_A = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-A.${webpORpng}`))
    const button_mobile_chip = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-chip.${webpORpng}`))
    const button_mobile_H = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-H.${webpORpng}`))
    const button_mobile_i = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-i.${webpORpng}`))
    const button_mobile_spin = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-reload.${webpORpng}`))
    const button_mobile_setting = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-setting.${webpORpng}`))
    const button_mobile_wallet = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-wallet.${webpORpng}`))


    const button_mobile_A_bg = new PIXI.Graphics()
    const button_mobile_chip_bg = new PIXI.Graphics()
    const button_mobile_spin_bg = new PIXI.Graphics()
    const button_mobile_H_bg = new PIXI.Graphics()
    const button_mobile_setting_bg = new PIXI.Graphics()
    const button_mobile_wallet_bg = new PIXI.Graphics()
    const button_mobile_i_bg = new PIXI.Graphics()



    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_A_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_chip_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_spin_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_H_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_setting_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_wallet_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_i_bg)

    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_setting)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_A)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_spin)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_chip)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_H)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_i)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_wallet)


    button_mobile_spin.on('pointerdown', () => {
        startPlay()
    })
    button_mobile_i.on('pointerdown', () => {
        setChildContent(
            <InfoDialog setChildContent={setChildContent} />
        )
        // info_content_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/info-content-mobile.${webpORpng}`)
        // display_win_text.alpha = 0
        // info_content_sprite.y = 0
        // scroll_bar_sprite.y = scroll_bar_init_y
        // show_dialog(info_dialog_wrapper, close_button_sprite)
    })
    button_mobile_wallet.on('pointerdown', () => {

        setChildContent(<BetHistory setChildContent={setChildContent} />)
    })
    button_mobile_setting.on('pointerdown', () => {
        setting_sprite_on_pointerdown()
    })
    button_mobile_chip.on('pointerdown', () => {
        button_chip_sprite_on_pointerdown()
    })
    button_mobile_H.on('pointerdown', () => {
        button_bline_sprite_on_pointerdown()
    })
    button_mobile_A.on('pointerdown', () => {
        button_auto_spin_sprite_on_pointerdown()
    })
    // !button_mobile_event_listeners
    fire_animate()
    pot_bubble_animate(potSprite, potSprite_2)


    // bubble_animate()

    const reelContainer = new PIXI.Container();
    reelContainer.scale.set(Game_Category_Dimension[game_global_vars.gameId].reelContainer.scale.x, Game_Category_Dimension[game_global_vars.gameId].reelContainer.scale.y)
    reelContainer.position.set(Game_Category_Dimension[game_global_vars.gameId].reelContainer.x, Game_Category_Dimension[game_global_vars.gameId].reelContainer.y)
    const reelContainerMask = getReelContainerMask()
    reelContainer.addChild(reelContainerMask)
    reelContainer.mask = (reelContainerMask)


    const reels: reelType[] = []

    const floatSymbols = () => {
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            for (let j = 0; j < r.animated_symbols.length; j++) {
                const rel_position = (r.position + j) % r.animated_symbols.length
                if (rel_position > 0.9 && rel_position < 3.1) {
                    const originalChild = reels[i].animated_symbols[j].getChildAt(0);
                    const cardbacksprite = reels[i].card_backs[j]
                    originalChild.alpha = 0
                    if (originalChild instanceof PIXI.AnimatedSprite) {
                        const copiedChild = new PIXI.AnimatedSprite(originalChild.textures);

                        copiedChild.position.copyFrom(floatContainerSprite.toLocal(originalChild.toGlobal(new PIXI.Point())));
                        const calc_scale = calculateScale(originalChild)
                        copiedChild.scale.set(calc_scale.x / appStage.scale.x, calc_scale.y / appStage.scale.y);
                        copiedChild.animationSpeed = originalChild.animationSpeed
                        copiedChild.tint = originalChild.tint;


                        const card_back_fire_sprite = gen_card_back_fire_sprite()
                        const pos: PIXI.IPointData = floatContainerSprite.toLocal(cardbacksprite.toGlobal(new PIXI.Point()))
                        pos.x += Game_Category_Config[game_global_vars.gameId].cardBack.position.x
                        pos.y += Game_Category_Config[game_global_vars.gameId].cardBack.position.y
                        card_back_fire_sprite.position.copyFrom(pos);
                        floatContainerSprite.addChild(card_back_fire_sprite)
                        card_back_fire_sprite.alpha = 0

                        floatContainerSprite.addChild(copiedChild);

                        game_global_vars.floatSymbolStore[i][Math.round(rel_position) - 1] = copiedChild
                        game_global_vars.floatCardBackFireStore[i][Math.round(rel_position) - 1] = card_back_fire_sprite
                    }
                }
            }
        }
    }
    for (let i = 0; i < 5; i++) {
        const reel = new PIXI.Container();
        reel.x = i * Game_Category_Dimension[game_global_vars.gameId].reelContainer.gap
        const animated_symbols: PIXI.Container[] = []
        const cards: PIXI.Container[] = []
        const card_backs: PIXI.Sprite[] = []
        const url_ids: number[] = []
        const reelItem: reelType = {
            reel,
            animated_symbols,
            card_backs,
            cards,
            url_ids,
            position: 0,
            previousPosition: 0,
            blur: new PIXI.BlurFilter(),
        }
        for (let j = 0; j < slotReels[i].length; j++) {
            const cardSprite = new PIXI.Container();
            const cardBackSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/card-back.${webpORpng}`))
            const url_id = slotReels[i][j];//Math.floor(Math.random() * slotAnimateUrls[game_global_vars.gameId].length)
            const colorMatrix = new PIXI.ColorMatrixFilter();
            colorMatrix.brightness(slotAnimateUrls[game_global_vars.gameId][url_id].brightness, true);
            colorMatrix.hue(slotAnimateUrls[game_global_vars.gameId][url_id].hue, true);
            // colorMatrix.saturate(slotAnimateUrls[game_global_vars.gameId][url_id].saturate, true);
            // cardBackSprite.filters = [colorMatrix]



            const adjustmentFilter = new AdjustmentFilter({
                saturation: slotAnimateUrls[game_global_vars.gameId][url_id].saturate,
            });


            cardBackSprite.filters = [adjustmentFilter, colorMatrix];

            const cardSymbolWrapperSprite = new PIXI.Container()
            const cardSymbolSprite = gen_card_animated_sprite(slotAnimateUrls[game_global_vars.gameId][url_id])
            cardSymbolWrapperSprite.addChild(cardSymbolSprite)
            cardSymbolWrapperSprite.position.set(10, 0)
            cardSprite.addChild(cardBackSprite)
            card_backs.push(cardBackSprite)
            cardSprite.addChild(cardSymbolWrapperSprite)
            cardSprite.y = Game_Category_Dimension[game_global_vars.gameId].gameBoard.cardHeight * j
            if (j === 4) cardSprite.alpha = 0
            reel.addChild(cardSprite)








            reelItem.animated_symbols.push(cardSymbolWrapperSprite)
            reelItem.url_ids.push(url_id)
            reelItem.cards.push(cardSprite)
        }
        reels.push(reelItem)
        reelContainer.addChild(reel)
        reelItem.blur.blurX = 0;
        reelItem.blur.blurY = 0;
        reel.filters = [reelItem.blur]
    }
    appStage.addChild(reelContainer)

    gen_blood_trail()

    const floatContainerSprite = new PIXI.Container();
    appStage.addChild(floatContainerSprite)
    floatSymbols()

    const back_fore_corner_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/back-fore-corner.${webpORpng}`))
    back_fore_corner_sprite.position.set(293, 170)
    appStage.addChild(back_fore_corner_sprite)



    const info_at_statusbarSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-info-bar-empty.${webpORpng}`))
    info_at_statusbarSprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.info.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.info.position.y)
    const status_bar_wrapper = new PIXI.Container();

    status_bar_wrapper.addChild(info_at_statusbarSprite)
    // status_bar_wrapper.addChild(info_help_group)
    status_bar_wrapper.position.set(225, 10)
    status_bar_wrapper.pivot.set(0, 80)
    backgroundFooterSpriteChildrenWrapper.addChild(status_bar_wrapper)
    info_at_statusbarSprite.eventMode = status_bar_wrapper.eventMode = 'static';
    info_at_statusbarSprite.cursor = 'pointer';
    // status_bar_wrapper.interactive = false
    info_at_statusbarSprite.on('pointerdown', () => {
        setChildContent(
            <InfoDialog setChildContent={setChildContent} />
        )
        // info_content_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/info-content.${webpORpng}`)
        // display_win_text.alpha = 0
        // info_content_sprite.y = 0
        // scroll_bar_sprite.y = scroll_bar_init_y
        // show_dialog(info_dialog_wrapper, close_button_sprite)
    })
    status_bar_wrapper.on('pointerover', () => {
        info_at_statusbarSprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-info-bar.${webpORpng}`)
        // tweenTo(info_help_group.scale, 'x', 0, 1, 500, backout(1.3), null, null)
        // tweenTo(info_help_group.scale, 'y', 0, 1, 500, backout(1.3), null, null)
    }).on('pointerout', () => {
        info_at_statusbarSprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-info-bar-empty.${webpORpng}`)
        // tweenTo(info_help_group.scale, 'x', 1, 0, 500, backout(1), null, null)
        // tweenTo(info_help_group.scale, 'y', 1, 0, 500, backout(1), null, null)
    })

    let chip_item_text_arr: PIXI.Text[] = []
    game_global_vars.chip_item_text_arr = chip_item_text_arr

    const setting_at_status_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-setting-empty.${webpORpng}`))
    setting_at_status_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.setting.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.setting.position.y)
    backgroundFooterSpriteChildrenWrapper.addChild(setting_at_status_sprite)
    setting_at_status_sprite.eventMode = 'static';
    setting_at_status_sprite.cursor = 'pointer';
    const setting_sprite_on_pointerdown = () => {
        setChildContent(<SettingDialog setChildContent={setChildContent} />)
    }
    setting_at_status_sprite.on('pointerdown', setting_sprite_on_pointerdown).on('pointerover', () => {
        setting_at_status_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-setting.${webpORpng}`)
    }).on('pointerout', () => {
        setting_at_status_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-setting-empty.${webpORpng}`)
    })

    const auto_spin_wrapper = new PIXI.Container()
    auto_spin_wrapper.eventMode = 'static'
    auto_spin_wrapper.position.set(1500, 0)
    auto_spin_wrapper.scale.set(0)
    auto_spin_wrapper.pivot.set(450, 250)
    const outer_bg_auto_spin_wrap = new PIXI.Graphics()
    outer_bg_auto_spin_wrap.lineStyle(0);
    outer_bg_auto_spin_wrap.beginFill(0x222222, 0.01).drawRect(-4000, -4000, 8000, 8000);
    outer_bg_auto_spin_wrap.eventMode = 'static';
    outer_bg_auto_spin_wrap.cursor = 'pointer';
    outer_bg_auto_spin_wrap.on('pointerdown', (event) => {
        if (event.target === outer_bg_auto_spin_wrap) {
            if (auto_spin_wrapper.scale.x !== 0) {
                tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
                tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
            }
        }
    })
    auto_spin_wrapper.addChild(outer_bg_auto_spin_wrap)
    const bg_auto_spin_wrap = new PIXI.Graphics()
    bg_auto_spin_wrap.lineStyle(0);
    bg_auto_spin_wrap.beginFill(0x222222, 1).drawRoundedRect(0, 0, 450, 250, 5);
    auto_spin_wrapper.addChild(bg_auto_spin_wrap)
    const autospin_static_text = new PIXI.Text("Autospin Settings", { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 42, fill: 0xffffff });
    autospin_static_text.position.set(20, 10)
    auto_spin_wrapper.addChild(autospin_static_text)
    const autospin_static_text_2 = new PIXI.Text("Number of Rounds", { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 28, fill: 0x888888 });
    autospin_static_text_2.position.set(20, 64)
    auto_spin_wrapper.addChild(autospin_static_text_2)

    const auto_spin_item_arr_1 = [10, 25, 50, 100, 250]
    auto_spin_item_arr_1.forEach((item, i) => {
        const button_auto_spin_item = gen_autospin_item(String(item))
        button_auto_spin_item.position.set(20 + i * 80, 110)
        button_auto_spin_item.eventMode = 'static';
        button_auto_spin_item.cursor = 'pointer';
        button_auto_spin_item.on('pointerdown', () => {
            game_global_vars.auto_spin_val = item
            startPlay()
            tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
        })
        auto_spin_wrapper.addChild(button_auto_spin_item)
    })
    const auto_spin_item_arr_2 = [500, 750, 1000, -1]
    auto_spin_item_arr_2.forEach((item, i) => {
        const button_auto_spin_item = gen_autospin_item(item > 0 ? String(item) : "∞")
        button_auto_spin_item.position.set(60 + i * 80, 170)
        button_auto_spin_item.eventMode = 'static';
        button_auto_spin_item.cursor = 'pointer';
        button_auto_spin_item.on('pointerdown', () => {
            game_global_vars.auto_spin_val = item
            startPlay()
            tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
        })
        auto_spin_wrapper.addChild(button_auto_spin_item)
    })
    backgroundFooterSpriteChildrenWrapper.addChild(auto_spin_wrapper)
    const button_auto_spin_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-empty.${webpORpng}`))
    button_auto_spin_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.autospin.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.autospin.position.y)
    button_auto_spin_sprite.eventMode = 'static';
    button_auto_spin_sprite.cursor = 'pointer';
    const button_auto_spin_sprite_on_pointerdown = () => {
        if (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1) {
            if (game_global_vars.timeout_id) clearTimeout(game_global_vars.timeout_id)
            game_global_vars.auto_spin_val = 0
            auto_spin_val_text_sprite.text = ""
            button_auto_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-empty.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-A.${webpORpng}`)
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        } else {

            const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
            if (auto_spin_wrapper.scale.x === 0) {
                if (app.screen.width > app.screen.height * media_stop_tablet) {
                    tweenTo(auto_spin_wrapper.scale, 'x', 0, scale, 500, backout(1), null, null)
                    tweenTo(auto_spin_wrapper.scale, 'y', 0, scale, 500, backout(1), null, null)
                } else {
                    setChildContent(<AutoSpinDialog setChildContent={setChildContent} params={{ game_global_vars, startPlay }} />)
                }

            } else //if (auto_spin_wrapper.scale.x === 1)
            {
                tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
                tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
            }
        }
        const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
        if (chip_list_sprite.scale.x !== 0) {
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1.2), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
        }
        if (auto_spin_wrapper.scale.x !== 0) {
            tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
        }

        if (bline_list_sprite.scale.x !== 0) {
            tweenTo(bline_list_sprite.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', scale, 0, 500, backout(1), null, null)
        }
    }
    button_auto_spin_sprite.on('pointerdown', button_auto_spin_sprite_on_pointerdown)
    backgroundFooterSpriteChildrenWrapper.addChild(button_auto_spin_sprite);
    const auto_spin_val_text_sprite = new PIXI.Text("", { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 28, fill: 0xffffff });
    auto_spin_val_text_sprite.anchor.set(0.5)
    backgroundFooterSpriteChildrenWrapper.addChild(auto_spin_val_text_sprite);

    const button_spin_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-spin-empty.${webpORpng}`))
    button_spin_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.spin.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.spin.position.y)
    button_spin_sprite.eventMode = 'static';
    button_spin_sprite.cursor = 'pointer';
    button_spin_sprite.on('pointerdown', () => {
        startPlay()
    }).on('pointerover', () => {
        button_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-spin.${webpORpng}`)
    }).on('pointerout', () => {
        button_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-spin-empty.${webpORpng}`)
    })
    backgroundFooterSpriteChildrenWrapper.addChild(button_spin_sprite);



    const chip_list_sprite = new PIXI.Sprite()

    backgroundFooterSpriteChildrenWrapper.addChild(chip_list_sprite)
    const bg_setting_list_sprite = new PIXI.Graphics()
    bg_setting_list_sprite.eventMode = 'static'
    bg_setting_list_sprite.cursor = 'pointer';
    bg_setting_list_sprite.on('pointerdown', (event) => {
        if (event.target === bg_setting_list_sprite) {
            const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
        }
    });
    chip_list_sprite.addChild(bg_setting_list_sprite)
    bg_setting_list_sprite.lineStyle(0);
    bg_setting_list_sprite.beginFill(0x222222, 0.01).drawRect(-670, -300, 2500, 1260);


    chip_list_sprite.pivot.set(120, 560)
    chip_list_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.chipList.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.chipList.position.y)
    chip_list_sprite.scale.set(0)
    const chip_list_sprite_bg_arr: { chip_item_sprite: PIXI.Container, bg_chip_item: PIXI.Graphics, chip_item_text: string }[] = []
    // { setting_item_sprite: PIXI.Container, bg_setting_item: PIXI.Graphics, setting_item_text: string }
    const init_chip_item_val_arr = JSON.parse(localStorage.getItem(`bet14`) || '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]')
    for (let i = 0; i < 14; i++) {
        const chip_item_sprite = new PIXI.Container()
        chip_list_sprite.addChild(chip_item_sprite)
        const bg_chip_item = new PIXI.Graphics()
        chip_item_sprite.addChild(bg_chip_item)
        chip_list_sprite_bg_arr.push({ chip_item_sprite: chip_item_sprite, bg_chip_item: bg_chip_item, chip_item_text: init_chip_item_val_arr[i] })
        bg_chip_item.lineStyle(0);
        bg_chip_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
        const chip_item_text = new PIXI.Text(init_chip_item_val_arr[i], { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 28, fill: 0xffffff });
        chip_item_text.position.set(100, 20)
        chip_item_text.anchor.set(0.5)
        chip_item_sprite.addChild(chip_item_text)
        chip_item_text_arr.push(chip_item_text)

        chip_item_sprite.eventMode = 'static';
        chip_item_sprite.cursor = 'pointer';
        chip_item_sprite.on('pointerdown', () => {
            bet_text.text = chip_item_text.text
            total_bet_text.text = String(parseInt(bline_val_text.text) * parseInt(chip_item_text.text))

            const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
            for (const item of chip_list_sprite_bg_arr) {
                item.chip_item_sprite.eventMode = 'static';
                item.bg_chip_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
            }

            chip_item_sprite.eventMode = 'none';
            bg_chip_item.beginFill(0x000000, 1).drawRect(0, 0, 200, 40);
        }).on('pointerover', () => {
            bg_chip_item.beginFill(0x333333, 1).drawRect(0, 0, 200, 40);
        }).on('pointerout', () => {
            bg_chip_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
        })

        chip_item_sprite.position.set(0, 40 * (13 - i))
    }











    const display_win_text = new PIXI.Text('', winTextStyle);
    const game_message_text = new PIXI.Text('', gameMessageTextStyle);
    const game_message_text_wrapper = new PIXI.Container()
    appStage.addChild(display_win_text)
    appStage.addChild(game_message_text_wrapper)
    display_win_text.anchor.set(0.5)
    display_win_text.position.set(960, 480)
    display_win_text.alpha = 0

    const game_message_text_back = new PIXI.Graphics()
    game_message_text_wrapper.addChild(game_message_text_back)
    game_message_text_wrapper.addChild(game_message_text)
    // game_message_text_back.filters = [new PIXI.BlurFilter(3, 3)]
    game_message_text_back.lineStyle(0);
    game_message_text_back.beginFill(0x777777, 0.95).drawRoundedRect(400, 420, 1100, 120, 70);
    game_message_text.anchor.set(0.5)
    game_message_text.position.set(960, 480)
    game_message_text_wrapper.alpha = 0

    const button_wallet_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-wallet-empty.${webpORpng}`))
    button_wallet_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.wallet.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.wallet.position.y)

    backgroundFooterSpriteChildrenWrapper.addChild(button_wallet_sprite)
    button_wallet_sprite.eventMode = 'static';
    button_wallet_sprite.cursor = 'pointer';
    button_wallet_sprite.on('pointerdown', () => {
        setChildContent(<BetHistory setChildContent={setChildContent} />)
    }).on('pointerover', () => {
        button_wallet_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-wallet.${webpORpng}`)
    }).on('pointerout', () => {
        button_wallet_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-wallet-empty.${webpORpng}`)
    })

    const button_bet_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-bet.${webpORpng}`))

    button_bet_sprite.position.set(550, 10)
    backgroundFooterSpriteChildrenWrapper.addChild(button_bet_sprite)
    button_bet_sprite.eventMode = 'static';
    button_bet_sprite.cursor = 'pointer';
    const button_chip_sprite_on_pointerdown = () => {
        const itemArr = JSON.parse(localStorage.getItem(`bet14`) || initialBetItemListString)
        chip_item_text_arr.forEach((item, i) => {
            item.text = itemArr[i]
        })
        const scale = app.screen.width > app.screen.height * media_stop_desktop_sm ? 1 : 2
        if (auto_spin_wrapper.scale.x !== 0) {
            tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
        }
        if (bline_list_sprite.scale.x !== 0) {
            tweenTo(bline_list_sprite.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', scale, 0, 500, backout(1), null, null)
        }

        if (chip_list_sprite.scale.x == 0) {
            if (app.screen.width > app.screen.height * media_stop_tablet) {
                tweenTo(chip_list_sprite.scale, 'x', 0, scale, 300, backout(1.3), null, null)
                tweenTo(chip_list_sprite.scale, 'y', 0, scale, 300, backout(1.3), null, null)
                tweenTo(chip_list_sprite, 'alpha', 0, 1, 200, backout(1), null, null)
            } else {
                setChildContent(<ChipDialog setChildContent={setChildContent} params={{ bet_text, total_bet_text, bline_val_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
            }

        } else //if (settings_list_sprite.scale.x == scale) 
        {
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1.2), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
        }
        chip_list_sprite_bg_arr.forEach((item, i) => {
            if (itemArr[i] === bet_text.text) {
                item.chip_item_sprite.eventMode = 'none';
                item.bg_chip_item.beginFill(0x000000, 1).drawRect(0, 0, 200, 40);
            } else {
                item.chip_item_sprite.eventMode = 'static';
                item.bg_chip_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
            }
        })
    }
    button_bet_sprite.on('pointerdown', button_chip_sprite_on_pointerdown)
    const bet_up_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-up-down.${webpORpng}`))
    bet_up_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.betup.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.betup.position.y)
    bet_up_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].footerBar.betup.scale?.x, Game_Category_Config[game_global_vars.gameId].footerBar.betup.scale?.y)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_up_sprite)
    bet_up_sprite.eventMode = 'static';
    bet_up_sprite.cursor = 'pointer';
    bet_up_sprite.on('pointerdown', () => {
        const cur_index = chip_item_text_arr.findIndex((elem) => (elem.text.trim() === bet_text.text.trim()))
        bet_text.text = chip_item_text_arr[Math.min(cur_index + 1, chip_item_text_arr.length - 1)].text;
        total_bet_text.text = String(parseInt(bline_val_text.text) * parseInt(bet_text.text))
    })
    const bet_down_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-up-down.${webpORpng}`))

    bet_down_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.betdown.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.betdown.position.y)
    bet_down_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].footerBar.betdown.scale?.x, Game_Category_Config[game_global_vars.gameId].footerBar.betdown.scale?.y)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_down_sprite)
    bet_down_sprite.eventMode = 'static';
    bet_down_sprite.cursor = 'pointer';
    bet_down_sprite.on('pointerdown', () => {
        const cur_index = chip_item_text_arr.findIndex((elem) => (elem.text.trim() === bet_text.text.trim()))
        bet_text.text = chip_item_text_arr[Math.max(cur_index - 1, 0)].text
        total_bet_text.text = String(parseInt(bline_val_text.text) * parseInt(bet_text.text))
    })
    const bline_wrapper = new PIXI.Container()



    const button_bline_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-bet.${webpORpng}`))
    button_bline_sprite.position.set(-60, -70)
    button_bline_sprite.scale.set(0.8, 1)
    bline_wrapper.addChild(button_bline_sprite)
    button_bline_sprite.eventMode = 'static';
    button_bline_sprite.cursor = 'pointer';
    const button_bline_sprite_on_pointerdown = () => {

        const scale = app.screen.width > app.screen.height * media_stop_desktop_sm ? 1 : 1.5
        if (chip_list_sprite.scale.x !== 0) {
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1.2), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
        }
        if (auto_spin_wrapper.scale.x !== 0) {
            tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
        }

        if (bline_list_sprite.scale.x === 0) {
            if (app.screen.width > app.screen.height * media_stop_tablet) {
                tweenTo(bline_list_sprite.scale, 'x', 0, scale, 200, backout(1.2), null, null)
                tweenTo(bline_list_sprite.scale, 'y', 0, scale, 200, backout(1.2), null, null)
            } else {
                setChildContent(<LineDialog setChildContent={setChildContent} params={{ bline_val_text, total_bet_text, bet_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
            }

        } else {
            tweenTo(bline_list_sprite.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', scale, 0, 500, backout(1), null, null)
        }
        for (const item of bline_list_sprite_bg_arr) {
            if (item.bline_item_text === bline_val_text.text) {
                item.bline_item_sprite.eventMode = 'none';
                item.bg_bline_list_item.beginFill(0x000000, 1).drawRect(0, 0, 200, 40);
            } else {
                item.bline_item_sprite.eventMode = 'static';
                item.bg_bline_list_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
            }
        }
    }
    button_bline_sprite.on('pointerdown', button_bline_sprite_on_pointerdown)




    bline_wrapper.position.set(1730, 80)//1730, 920

    const bline_static_text = new PIXI.Text(' LINE ', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle, fontSize: 32, fill: Game_Category_Config[game_global_vars.gameId].fill, fontStyle: Game_Category_Config[game_global_vars.gameId].style, stroke: '#000000', strokeThickness: 2, });
    bline_static_text.anchor.set(0.5)
    bline_wrapper.addChild(bline_static_text)
    const bline_dec_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-up-down.${webpORpng}`))

    bline_dec_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.blinedown.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.blinedown.position.y)
    bline_dec_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].footerBar.blinedown.scale?.x, Game_Category_Config[game_global_vars.gameId].footerBar.blinedown.scale?.y)

    bline_wrapper.addChild(bline_dec_sprite)
    const bline_inc_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-up-down.${webpORpng}`))
    bline_inc_sprite.position.set(135, -60)

    bline_inc_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.blineup.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.blineup.position.y)
    bline_inc_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].footerBar.blineup.scale?.x, Game_Category_Config[game_global_vars.gameId].footerBar.blineup.scale?.y)

    bline_wrapper.addChild(bline_inc_sprite)


    const bline_val_text = new PIXI.Text('1', { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 32, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });
    game_global_vars.bline_val_text = bline_val_text
    bline_val_text.anchor.set(0.5)
    bline_wrapper.addChild(bline_val_text)
    bline_inc_sprite.eventMode = 'static';
    bline_inc_sprite.cursor = 'pointer';
    bline_inc_sprite.on('pointerdown', () => {
        const cur_bline = parseInt(bline_val_text.text)
        let new_bline = Math.min(cur_bline + 1, 20)
        bline_val_text.text = new_bline
        total_bet_text.text = String(new_bline * parseInt(bet_text.text))
    })
    bline_dec_sprite.eventMode = 'static';
    bline_dec_sprite.cursor = 'pointer';
    bline_dec_sprite.on('pointerdown', () => {
        const cur_bline = parseInt(bline_val_text.text)
        let new_bline = Math.max(cur_bline - 1, 1)
        bline_val_text.text = new_bline
        total_bet_text.text = String(new_bline * parseInt(bet_text.text))
    })
    backgroundFooterSpriteChildrenWrapper.addChild(bline_wrapper);
    // appStage.addChild(bline_wrapper)

    bline_static_text.on('pointerdown', () => {
        if (app.screen.width < app.screen.height * media_stop_tablet) {
            setChildContent(<LineDialog setChildContent={setChildContent} params={{ bline_val_text, total_bet_text, bet_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
        } else {
            button_bline_sprite_on_pointerdown()
        }
    })
    bline_val_text.on('pointerdown', () => {
        if (app.screen.width < app.screen.height * media_stop_tablet) {
            setChildContent(<LineDialog setChildContent={setChildContent} params={{ bline_val_text, total_bet_text, bet_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
        } else {
            button_bline_sprite_on_pointerdown()
        }
    })
    // ! bline mobile list sprite
    const bline_list_sprite = new PIXI.Sprite()
    bline_list_sprite.position.set(1850, 0)
    bline_list_sprite.pivot.set(200, 600)
    bline_list_sprite.scale.set(0)
    backgroundFooterSpriteChildrenWrapper.addChild(bline_list_sprite)
    const bg_bline_list_sprite = new PIXI.Graphics()
    bg_bline_list_sprite.eventMode = 'static'
    bg_bline_list_sprite.cursor = 'pointer';
    bg_bline_list_sprite.on('pointerdown', (event) => {
        if (event.target === bg_bline_list_sprite) {
            tweenTo(bline_list_sprite.scale, 'x', 1, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', 1, 0, 500, backout(1), null, null)
        }
    });
    bline_list_sprite.addChild(bg_bline_list_sprite)
    bg_bline_list_sprite.lineStyle(0);
    bg_bline_list_sprite.beginFill(0x222222, 0.01).drawRect(-670, -300, 2600, 1120);
    const bline_list_sprite_bg_arr: { bline_item_sprite: PIXI.Container, bg_bline_list_item: PIXI.Graphics, bline_item_text: string }[] = []
    for (let i = 0; i < 20; i++) {
        const bline_item_sprite = new PIXI.Container()
        bline_list_sprite.addChild(bline_item_sprite)
        const bg_bline_list_item = new PIXI.Graphics()
        bline_item_sprite.addChild(bg_bline_list_item)
        bline_list_sprite_bg_arr.push({ bline_item_sprite, bg_bline_list_item, bline_item_text: String((i + 1)) })
        bg_bline_list_item.lineStyle(0);
        bg_bline_list_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
        const bline_item_text = new PIXI.Text(String((i + 1)), { fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue, fontSize: 24, fill: 0xffffff });
        bline_item_text.position.set(100, 20)
        bline_item_text.anchor.set(0.5)
        bline_item_sprite.addChild(bline_item_text)

        bline_item_sprite.eventMode = 'static';
        bline_item_sprite.cursor = 'pointer';
        bline_item_sprite.on('pointerdown', () => {
            bline_val_text.text = bline_item_text.text
            total_bet_text.text = String(parseInt(bline_val_text.text) * parseInt(bet_text.text))
            const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 1.5
            tweenTo(bline_list_sprite.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', scale, 0, 500, backout(1), null, null)

            for (const item of bline_list_sprite_bg_arr) {
                item.bline_item_sprite.eventMode = 'static';
                item.bg_bline_list_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
            }

            bline_item_sprite.eventMode = 'none';
            bg_bline_list_item.beginFill(0x000000, 1).drawRect(0, 0, 200, 40);

        }).on('pointerover', () => {
            bg_bline_list_item.beginFill(0x333333, 1).drawRect(0, 0, 200, 40);
        }).on('pointerout', () => {
            bg_bline_list_item.beginFill(0x222222, 1).drawRect(0, 0, 200, 40);
        })

        bline_item_sprite.position.set(0, 30 * (19 - i))
    }
    // ! bline mobile list sprite
    // !button_mobile_event_listeners
    button_mobile_spin.eventMode = button_mobile_wallet.eventMode = button_mobile_i.eventMode = button_mobile_setting.eventMode = button_mobile_chip.eventMode = button_mobile_H.eventMode = button_mobile_A.eventMode = bet_text.eventMode = bet_text_static.eventMode = bline_val_text.eventMode = bline_static_text.eventMode = 'static';
    button_mobile_spin.cursor = button_mobile_wallet.cursor = button_mobile_i.cursor = button_mobile_setting.cursor = button_mobile_chip.cursor = button_mobile_H.cursor = button_mobile_A.cursor = bet_text.cursor = bet_text_static.cursor = bline_val_text.cursor = bline_static_text.cursor = 'pointer';
    (Global_Vars.info_dialog_wrapper_resize_callback = function () {

        const FOOTER_SCALE = app.screen.width / Game_Category_Dimension[game_global_vars.gameId].footerBar.width
        backgroundFooterSprite.scale.set(FOOTER_SCALE)
        const control_pos_web = (app.screen.width < app.screen.height * media_stop_tablet) ? backgroundFooterSprite.height : 0
        backgroundFooterSprite.position.set((app.screen.width - (Game_Category_Dimension[game_global_vars.gameId].footerBar.width + 100) * FOOTER_SCALE) / 2, app.screen.height - backgroundFooterSprite.height + control_pos_web)
        potSprite.scale.set(appStage.scale.x)
        potSprite_2.scale.set(appStage.scale.x, appStage.scale.x)
        potSprite.position.set(Math.min(0, (appStage.position.x - potSprite_2.width / 10)), app.screen.height - backgroundFooterSprite.height - potSprite.height * 0.92 + control_pos_web)
        potSprite_2.position.set(Math.max(app.screen.width - potSprite_2.width, appStage.x + appStage.width - potSprite_2.width * 1.4), app.screen.height - backgroundFooterSprite.height - potSprite.height * 0.92 + control_pos_web)

        // ! ###########################################################################################   2
        if (app.screen.width < app.screen.height * media_stop_mobile) {
            const offset_factor = 4
            const setting_chip_offset = interpolate(app.screen.width / app.screen.height, 0.3, media_stop_mobile, app.screen.height / offset_factor, 0)
            const A_H_offset = interpolate(app.screen.width / app.screen.height, 0.3, media_stop_mobile, app.screen.height / offset_factor / 2, 0)
            auto_spin_val_text_sprite.position.set(380, -400 - A_H_offset)
            auto_spin_val_text_sprite.scale.set(4)
            button_mobile_A_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-100, -480 - A_H_offset)
            button_mobile_chip_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -720 - setting_chip_offset)
            button_mobile_spin_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 520, 520, 260).position.set(730, -770 - A_H_offset)
            button_mobile_H_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -480 - A_H_offset)
            button_mobile_setting_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-100, -720 - setting_chip_offset)
            button_mobile_wallet_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-100, -300 + 10000)
            button_mobile_i_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -300 + 10000)
            button_mobile_setting.scale.set(3)
            button_mobile_A.scale.set(3)
            button_mobile_spin.scale.set(5)
            button_mobile_chip.scale.set(3)
            button_mobile_H.scale.set(3)
            button_mobile_setting.position.set(50, -700 - setting_chip_offset)
            button_mobile_A.position.set(50, -460 - A_H_offset)
            button_mobile_spin.position.set(800, -700 - A_H_offset)
            button_mobile_chip.position.set(1700, -700 - setting_chip_offset)
            button_mobile_H.position.set(1700, -460 - A_H_offset)

            button_mobile_i.scale.set(3)
            button_mobile_wallet.scale.set(3)
            button_mobile_wallet.position.set(50, -280 + 10000)
            button_mobile_i.position.set(1700, -280 + 10000)

            gameBoardMaskSprite.position.set(400, 930)
            gameBoardMaskSprite.scale.set(5, 5)
            scullSprite.position.set(1730, 840)

            back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[0].x, Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[0].y)
            new_back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[1].x, Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[1].y)
        } else if (app.screen.width < app.screen.height * media_stop_tablet) {
            const mobile_button_offset = interpolate(app.screen.width / app.screen.height, media_stop_mobile, media_stop_tablet, 300, 100)


            auto_spin_val_text_sprite.position.set(614, -200 - mobile_button_offset)
            auto_spin_val_text_sprite.scale.set(2)
            button_mobile_A_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(252, -139 - mobile_button_offset)
            button_mobile_chip_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(550, -138 - mobile_button_offset)
            button_mobile_spin_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 220, 220, 110).position.set(840, -175 - mobile_button_offset)
            button_mobile_H_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1200, -138 - mobile_button_offset)
            button_mobile_setting_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1500, -138 - mobile_button_offset)
            button_mobile_wallet_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(-100, 10000)
            button_mobile_i_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(1700, 10000)
            button_mobile_setting.scale.set(2)
            button_mobile_A.scale.set(2)
            button_mobile_spin.scale.set(2)
            button_mobile_chip.scale.set(2)
            button_mobile_H.scale.set(2)
            button_mobile_setting.position.set(270, -120 - mobile_button_offset)
            button_mobile_A.position.set(570, -120 - mobile_button_offset)
            button_mobile_spin.position.set(870, -140 - mobile_button_offset)
            button_mobile_chip.position.set(1220, -120 - mobile_button_offset)
            button_mobile_H.position.set(1520, -120 - mobile_button_offset)


            button_mobile_i.scale.set(2)
            button_mobile_wallet.scale.set(2)
            const f_offset = 150;//game_global_vars.isFullScreen ? 0 : 150
            button_mobile_wallet.position.set(250 - f_offset, -1850 * app.screen.height / app.screen.width + 10000)
            button_mobile_i.position.set(400 - f_offset, -1850 * app.screen.height / app.screen.width + 10000)

            gameBoardMaskSprite.position.set(400, 1890)
            gameBoardMaskSprite.scale.set(5, -5)
            scullSprite.position.set(1450, 8840)

            back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[0].x, Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[0].y)
            new_back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[1].x, Game_Category_Config[game_global_vars.gameId].backBubble.mobile.position[1].y)
        }
        else {

            auto_spin_val_text_sprite.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.autospinText.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.autospinText.position.y)
            auto_spin_val_text_sprite.scale.set(1)
            button_mobile_A_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(255, 188)
            button_mobile_chip_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(550, 188)
            button_mobile_spin_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 220, 220, 110).position.set(840, 225)
            button_mobile_H_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1200, 188)
            button_mobile_setting_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1500, 188)
            button_mobile_wallet_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(-100, 10000)
            button_mobile_i_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(1700, 10000)
            button_mobile_setting.scale.set(2)
            button_mobile_A.scale.set(2)
            button_mobile_spin.scale.set(2)
            button_mobile_chip.scale.set(2)
            button_mobile_H.scale.set(2)
            button_mobile_setting.position.set(270, 170)
            button_mobile_A.position.set(570, 170)
            button_mobile_spin.position.set(870, 190)
            button_mobile_chip.position.set(1220, 170)
            button_mobile_H.position.set(1520, 170)

            button_mobile_i.scale.set(2)
            button_mobile_wallet.scale.set(2)
            button_mobile_wallet.position.set(100, 10000)
            button_mobile_i.position.set(250, 10000)

            gameBoardMaskSprite.position.set(400, 3930)
            gameBoardMaskSprite.scale.set(1, 1)
            scullSprite.position.set(1450, 8840)

            back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.desktop.position[0].x, Game_Category_Config[game_global_vars.gameId].backBubble.desktop.position[0].y)
            new_back_bubble_sprite.position.set(Game_Category_Config[game_global_vars.gameId].backBubble.desktop.position[1].x, Game_Category_Config[game_global_vars.gameId].backBubble.desktop.position[1].y)
        }
        // ! ###########################################################################################   2
        // ! ###########################################################################################   3
        if (app.screen.width < app.screen.height * media_stop_mobile) {
            const compen_for_vvsl = game_global_vars.gameId === "vvsl" ? 100 : 0
            const txt_offset = interpolate(app.screen.width / app.screen.height, 0.46, media_stop_mobile, 0, 150)
            bet_text.position.set(300, 620 - 1800 * app.screen.height / app.screen.width - txt_offset - compen_for_vvsl)
            bet_text.scale.set(3)
            bet_text_static.position.set(300, 500 - 1800 * app.screen.height / app.screen.width - txt_offset - compen_for_vvsl)
            bet_text_static.scale.set(3)
            bline_val_text.position.set(-100, 540 - 1800 * app.screen.height / app.screen.width - txt_offset - compen_for_vvsl)
            bline_val_text.scale.set(3)
            bline_static_text.position.set(-100, 430 - 1800 * app.screen.height / app.screen.width - txt_offset - compen_for_vvsl)
            bline_static_text.scale.set(3)
            mobile_win_hold_spin_text_wrapper.position.set(500, 100 - 1800 * app.screen.height / app.screen.width)
            mobile_win_hold_spin_text_wrapper.scale.set(3)
        } else if (app.screen.width < app.screen.height * media_stop_tablet) {
            const txt_offset = interpolate(app.screen.width / app.screen.height, media_stop_mobile, media_stop_tablet, 350, 100)
            bet_text.position.set(240, -275 - txt_offset)
            bet_text.scale.set(2)
            bet_text_static.position.set(240, -360 - txt_offset)
            bet_text_static.scale.set(2)
            bline_val_text.position.set(-100, -365 - txt_offset)
            bline_val_text.scale.set(2)
            bline_static_text.position.set(-100, -450 - txt_offset)
            bline_static_text.scale.set(2)
            mobile_win_hold_spin_text_wrapper.position.set(690, -430 - txt_offset)
            mobile_win_hold_spin_text_wrapper.scale.set(1.6)
        } else {
            bet_text_static.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.betStatic.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.betStatic.position.y)
            bet_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.bet.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.bet.position.y)
            bet_text_static.scale.set(1)
            bet_text.scale.set(1)
            bline_static_text.position.set(0, -50)
            bline_static_text.scale.set(1)
            bline_val_text.position.set(Game_Category_Config[game_global_vars.gameId].footerBar.bline.position.x, Game_Category_Config[game_global_vars.gameId].footerBar.bline.position.y)
            bline_val_text.scale.set(1)

            mobile_win_hold_spin_text_wrapper.position.set(750, 1650)
            mobile_win_hold_spin_text_wrapper.scale.set(1.5)
        }
        // ! ###########################################################################################   3

    })()

    const spaceKey: any = keyboard(" ")
    spaceKey.press = startPlay;

    let cur_timing_counter = 0
    async function reelsComplete() {

        balance_text.text = (game_global_vars.wonRes.account.balance + game_global_vars.wonRes.win).toLocaleString('en-US', { style: 'currency', currency: 'INR' }).substring(1)
        setBalance(game_global_vars.wonRes.account.balance + game_global_vars.wonRes.win); game_global_vars.balance = game_global_vars.wonRes.account.balance + game_global_vars.wonRes.win

        floatContainerSprite.removeChildren();
        if (game_global_vars.auto_spin_val === 0) {
            // setTimeout(floatSymbols, 100)
            floatSymbols()
        } else if (game_global_vars.wonRes.win > 0) {
            floatSymbols()
        }

        if (game_global_vars.wonRes.win > 0) {
            playSound('win')
            win_hold_spin_static_text.text = "TOTAL WIN           "
            total_win_text.text = game_global_vars.wonRes.win
            mobile_win_hold_spin_text_upper.text = "TOTAL WIN"
            mobile_win_hold_spin_text_down.text = String(game_global_vars.wonRes.win)
            tweenTo(display_win_text, 'alpha', 0, 1, 500, backout(1), null, null)


            if (game_global_vars.blood_trail) {
                game_global_vars.blood_trail.alpha = 1
            }
            changeWonLineUI(true)
        } else {
            changeWonLineUI(false)
        }
        game_global_vars.last_win = game_global_vars.wonRes.win

        cur_timing_counter = 0
        game_global_vars.running = false;
        if (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1) {
            if (game_global_vars.wonRes.win > 0) {
                const won_line_count = Object.keys(game_global_vars.wonRes.gameable.wins.lines).length
                const timeout_id = setTimeout(() => {
                    startPlay()
                }, won_line_count * 3000)
                game_global_vars.timeout_id = timeout_id
            } else {
                startPlay()
            }
        }
        if (game_global_vars.auto_spin_val === 0) {

            auto_spin_val_text_sprite.text = ""
            button_auto_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-empty.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-A.${webpORpng}`)
            //! adjust eventmode
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        }

    }
    async function startPlay() {

        if (game_global_vars.balance - parseInt(bet_text.text) < 0) {
            showToast(`Insufficent balance!`)
            return
        }
        if (game_global_vars.running) return;
        game_global_vars.timeout_id = null
        game_global_vars.running = true;
        game_global_vars.prev_won_line_index = -1
        game_global_vars.wonRes = null
        if (game_global_vars.blood_trail) {
            game_global_vars.blood_trail.alpha = 0
        }
        floatContainerSprite.removeChildren()
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < slotReels[i].length; j++) {
                const animated_sprite = reels[i].animated_symbols[j].getChildAt(0) as PIXI.AnimatedSprite
                // animated_sprite.stop();
                animated_sprite.alpha = 1
                reels[i].card_backs[j].alpha = 1;
                reels[i].cards[j].alpha = 1
            }
        }
        game_global_vars.blood_trail?.gotoAndStop(0)
        changeWonLineUI(false)
        win_line_text.text = ""
        mobile_win_line_text.text = ""


        if (game_global_vars.auto_spin_val > 0) {
            auto_spin_val_text_sprite.text = String(game_global_vars.auto_spin_val)
            button_auto_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-stop.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-stop.${webpORpng}`)
        } else if (game_global_vars.auto_spin_val === -1) {
            auto_spin_val_text_sprite.text = "∞"
            button_auto_spin_sprite.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-auto-spin-stop.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-mobile-stop.${webpORpng}`)
        }
        setBalance(v => {
            const new_v = v - parseInt(bline_val_text.text) * parseInt(bet_text.text)
            balance_text.text = new_v.toLocaleString('en-US', { style: 'currency', currency: 'INR' }).substring(1)
            return new_v
        }); game_global_vars.balance -= parseInt(bline_val_text.text) * parseInt(bet_text.text)

        playSound('spin')






        if (game_global_vars.last_win > 0) {
            win_hold_spin_static_text.text = "LAST WIN           "
            total_win_text.text = String(game_global_vars.last_win)
            mobile_win_hold_spin_text_upper.text = "LAST WIN"
            mobile_win_hold_spin_text_down.text = String(game_global_vars.last_win)
        } else {
            win_hold_spin_static_text.text = "HOLD SPIN TO QUICK SPINS"
            mobile_win_hold_spin_text_upper.text = " TOTAL BET "
            mobile_win_hold_spin_text_down.text = String(parseInt(bline_val_text.text) * parseInt(bet_text.text))
            total_win_text.text = ""
        }
        //! adjust eventmode
        adjust_eventmode_arr.forEach(item => item.eventMode = ((item === button_mobile_A || item === button_auto_spin_sprite) && (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1)) ? 'static' : 'none')
        const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
        if (display_win_text.alpha === 1) {
            tweenTo(display_win_text, 'alpha', 1, 0, 500, backout(1), null, null)
        }
        if (game_message_text_wrapper.alpha === 1) {
            tweenTo(game_message_text_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        }

        if (auto_spin_wrapper.scale.x !== 0) {
            tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
        }
        if (chip_list_sprite.scale.x !== 0) {
            tweenTo(chip_list_sprite.scale, 'x', scale, 0, 200, backout(1.2), null, null)
            tweenTo(chip_list_sprite.scale, 'y', scale, 0, 200, backout(1), null, null)
            tweenTo(chip_list_sprite, 'alpha', 1, 0, 200, backout(1), null, null)
        }

        if (bline_list_sprite.scale.x !== 0) {
            tweenTo(bline_list_sprite.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(bline_list_sprite.scale, 'y', scale, 0, 500, backout(1), null, null)
        }

        animateReels(reels, reelsComplete)
        // const { data: { hash } } = await axios.post('/api/user/games/create', {
        //     game_package_id: "slots",
        //     client_seed: Math.ceil(Math.random() * 99999999)
        // })
        try {
            let hash = game_global_vars.pf_hash
            let { data: { status, message } } = await axios.post('/api/games/slots/play/verify', {
                "hash": hash,//hash,//
                "bet": parseInt(bet_text.text),
                "lines": parseInt(bline_val_text.text),
                "variation": Game_Category_Config[game_global_vars.gameId].api.variation,
                "slot_type": Game_Category_Config[game_global_vars.gameId].api.slot_type
            })
            if (!status) {
                const { data: { hash: _hash } } = await axios.post('/api/user/games/create', {
                    game_package_id: "slots",
                    client_seed: Math.ceil(Math.random() * 99999999)
                })
                let { data: { status: _status, message: _message } } = await axios.post('/api/games/slots/play/verify', {
                    "hash": _hash,
                    "bet": parseInt(bet_text.text),
                    "lines": parseInt(bline_val_text.text),
                    "variation": Game_Category_Config[game_global_vars.gameId].api.variation,
                    "slot_type": Game_Category_Config[game_global_vars.gameId].api.slot_type
                })
                status = _status
                message = _message
                hash = _hash
            }
            if (!status) {
                // game_message_text.text = message
                showToast(message)
                allTweenings.splice(0)
                // tweenTo(game_message_text_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
                game_global_vars.running = false;
                game_global_vars.wonRes = null;
                adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
                // reelsComplete()
                return
            } else {
                // setBalance(v => v - parseInt(bline_val_text.text) * parseInt(bet_text.text))
            }
            const { data: wonRes } = await axios.post('/api/games/slots/play', {
                "hash": hash,//gameParams.hash,//hash,//
                "bet": parseInt(bet_text.text),
                "lines": parseInt(bline_val_text.text),
                "variation": 10,
            })
            game_global_vars.wonRes = wonRes
            game_global_vars.pf_hash = wonRes.pf_game.hash

            if (game_global_vars.auto_spin_val > 0) game_global_vars.auto_spin_val--;
            console.log(wonRes)


            for (let i = 0; i < reels.length; i++) {
                const index = allTweenings.findIndex((item) => item.uuid === reelTweenings[i].uuid)
                allTweenings[index].target += -wonRes.gameable.reels[i] + 1
                allTweenings[index].flow = true


                const now = Date.now();
                allTweenings[index].time = now - allTweenings[index].start + 100 + i * 100
            }
            // game_global_vars.won_lines = []
        } catch (error) {
            // game_message_text.text = "Oops! Please try again."
            showToast('Oops! Please try again.')
            allTweenings.splice(0)
            // tweenTo(game_message_text_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
            game_global_vars.running = false;
            game_global_vars.wonRes = null;
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        }

    }
    const adjust_eventmode_arr = [button_bet_sprite, bline_inc_sprite, bline_dec_sprite, bet_up_sprite, bet_down_sprite, info_at_statusbarSprite, setting_at_status_sprite, button_wallet_sprite, button_mobile_chip, button_mobile_H, button_bline_sprite, button_mobile_setting, button_mobile_i, button_mobile_wallet, button_mobile_A, button_auto_spin_sprite, bet_text, bet_text_static, bline_val_text, bline_static_text]
    app.ticker.add(() => {
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // r.blur.blurX = (r.position - r.previousPosition) * 1;
            // r.blur.blurY = (r.position - r.previousPosition) * 0;
            for (let j = 0; j < r.animated_symbols.length; j++) {
                // const s = r.animated_symbols[j];
                const c = r.cards[j];
                const rel_position = (r.position + j) % r.animated_symbols.length
                const relativePositionY = rel_position * Game_Category_Dimension[game_global_vars.gameId].gameBoard.cardHeight;
                const globalPosition = c.toGlobal(new PIXI.Point(0, relativePositionY));
                c.position = (c.toLocal(globalPosition))
                if (game_global_vars.running) {
                    if (rel_position >= 4) {
                        c.alpha = 0
                    } else {
                        c.alpha = 1
                    }
                }
                // if (rel_position < 1 && (r.previousPosition + j) % r.animated_symbols.length > 3) {
                //     const url_id = Math.floor(Math.random() * slotAnimateUrls[game_global_vars.gameId].length)

                //     s.removeChildren()
                //     s.addChild(gen_card_animated_sprite(slotAnimateUrls[game_global_vars.gameId][url_id]))
                //     r.url_ids[j] = url_id
                // }
            }
            r.previousPosition = r.position;
        }
    });
    app.ticker.add((delta) => {

        const count = 2
        cur_timing_counter += delta / 30

        if (game_global_vars.running || game_global_vars.wonRes === null || Object.keys(game_global_vars.wonRes.gameable.win_lines).length === 0) {
            return
        }


        for (let i = 0; i < reels.length; i++) {
            for (let j = 0; j < slotReels[i].length; j++) {
                reels[i].cards[j].alpha = 0.2;
                reels[i].card_backs[j].alpha = 1;
                (reels[i].animated_symbols[j].getChildAt(0) as PIXI.AnimatedSprite).alpha = 1
            }
        }
        const won_line_index = Math.floor(cur_timing_counter / Math.PI / 2) % Object.keys(game_global_vars.wonRes.gameable.win_lines).length
        const won_line_key = Object.keys(game_global_vars.wonRes.gameable.win_lines)[won_line_index]
        const won_line = game_global_vars.wonRes.gameable.win_lines[won_line_key]


        const prev_won_line_key = Object.keys(game_global_vars.wonRes.gameable.win_lines)[game_global_vars.prev_won_line_index]
        const prev_won_line = game_global_vars.wonRes.gameable.win_lines[prev_won_line_key]


        if (game_global_vars.prev_won_line_index !== won_line_index) {
            change_blood_trail(parseInt(won_line_key))
            game_global_vars.blood_trail?.gotoAndStop(0)
            win_line_text.text = `LINE ${parseInt(won_line_key) + 1} PAYS`
            mobile_win_line_text.text = `LINE ${parseInt(won_line_key) + 1} PAYS`
        }
        game_global_vars.blood_trail?.play()

        // display_win_text.text = game_global_vars.wonRes.gameable.wins.lines[won_line_key].win
        if (won_line_index !== game_global_vars.prev_won_line_index) {
            // floatContainerSprite.removeChildren()
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 3; y++) {
                    const fl_symbol = game_global_vars.floatSymbolStore[x][y]
                    if (fl_symbol instanceof PIXI.AnimatedSprite) {
                        fl_symbol.alpha = 0.2
                    }
                }
            }
            if (!game_global_vars.running) {
                for (let j = 0; j < game_global_vars.prev_won_line_length; j++) {
                    const prev_floatedSymbol = !prev_won_line ? null : game_global_vars.floatSymbolStore[j][(reels[j].position + prev_won_line[j]) % reels[j].animated_symbols.length - 1]
                    const floatedCardBackFireSymbol = !prev_won_line ? null : game_global_vars.floatCardBackFireStore[j][(reels[j].position + prev_won_line[j]) % reels[j].animated_symbols.length - 1]

                    if (prev_floatedSymbol instanceof PIXI.AnimatedSprite && floatedCardBackFireSymbol instanceof PIXI.AnimatedSprite) {
                        prev_floatedSymbol.gotoAndStop(0)
                        floatedCardBackFireSymbol.gotoAndStop(0)
                        floatedCardBackFireSymbol.alpha = 0
                    }
                }
            }
        }
        for (let j = 0; j < won_line.length; j++) {
            if (won_line[j] === null) continue
            reels[j].cards[won_line[j]].alpha = 1;//(Math.sin(cur_timing_counter) + 4) / 5 + 0.5
            const symbol = reels[j].animated_symbols[won_line[j]].getChildAt(0) as PIXI.AnimatedSprite
            // if (!symbol.playing) {
            //   symbol.play()
            // }
            symbol.alpha = 0
            reels[j].card_backs[won_line[j]].alpha = (Math.sin(cur_timing_counter * count) + 4) / 5


            if (!game_global_vars.running && won_line_index !== game_global_vars.prev_won_line_index) {
                const floatedSymbol = game_global_vars.floatSymbolStore[j][(reels[j].position + won_line[j]) % reels[j].animated_symbols.length - 1]
                const floatedCardBackFireSymbol = game_global_vars.floatCardBackFireStore[j][(reels[j].position + won_line[j]) % reels[j].animated_symbols.length - 1]
                if (floatedSymbol instanceof PIXI.AnimatedSprite && floatedCardBackFireSymbol instanceof PIXI.AnimatedSprite) {
                    floatedSymbol.alpha = 1
                    floatedSymbol.play()
                    floatedCardBackFireSymbol.alpha = 1
                    floatedCardBackFireSymbol.play()
                }

            }
        }
        game_global_vars.prev_won_line_index = won_line_index
        game_global_vars.prev_won_line_length = won_line.length
        // })
    });

}
export default loadMainScreen