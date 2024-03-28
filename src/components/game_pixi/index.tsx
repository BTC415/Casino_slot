import React, { useEffect, useState } from 'react';
import { PIXI, app, Global_Vars, appStage } from '../../renderer';
import { getAssetUrls, interpolate } from '../../utils/urls';
import { loadStartScreen } from './loadStartScreen';
import { animateFromTweenLoop } from './loops/animateFromTweenLoop';
import { useFullScreen, useGameParams, useSetBalance } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Game_Category_Config, Game_Category_Dimension, game_global_vars, loadingTextStyle } from '../../config';
import PageWrapper from '../PageWrapper';
import AccessDenied from '../AccessDenied';
import { media_stop_desktop_sm, media_stop_mobile, media_stop_tablet, mobileORdesktop, webpORpng } from '../../utils/utils';
import FullscreenButton from '../FullscreenButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SVGs from '../svg';
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const GamePIXI = () => {
    const { setFullScreen } = useFullScreen()
    const { gameId: _gameId } = useParams();
    const gameId = _gameId || ""
    const gameParams = useGameParams()
    const setBalance = useSetBalance()
    // const { pathname } = useLocation()
    if (gameId === "jrsl" || gameId === "vvsl" || gameId === "grsl" || gameId === "wwsl" || gameId === "mbsl") {
        game_global_vars.gameId = gameId
    }
    const [childContent, setChildContent] = useState<JSX.Element>(<></>)
    useEffect(() => {
        if (!(gameId === "jrsl" || gameId === "vvsl" || gameId === "grsl" || gameId === "wwsl" || gameId === "mbsl")) {
            setChildContent(<PageWrapper><AccessDenied /></PageWrapper>)
            return
        }
        if (Global_Vars.loaded) {
            // loadStartScreen()
        } else {
            const background_desktop_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-desktop.${webpORpng}`))
            const background_mobile_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-mobile.${webpORpng}`))
            app.stage.addChild(background_desktop_sprite)
            app.stage.addChild(background_mobile_sprite)
            function resizeApp() {
                const header_bar_height = 100
                app.renderer.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
                // app.renderer.resize(window.innerWidth * Math.max(1,window.devicePixelRatio), Math.max(window.innerHeight * window.devicePixelRatio));
                // app.renderer.resolution = window.devicePixelRatio;
                const scale_x = app.screen.width / Game_Category_Dimension[game_global_vars.gameId].gameBoard.width;
                let APP_SCALE = Math.min(scale_x, (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].footerBar.height * scale_x) / (Game_Category_Dimension[game_global_vars.gameId].gameBoard.height + header_bar_height))
                if (app.screen.width < app.screen.height * media_stop_mobile) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[0]
                    // APP_SCALE *= 1.64
                } else if (app.screen.width < app.screen.height * media_stop_tablet) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[1]
                } else if (app.screen.width < app.screen.height * media_stop_desktop_sm) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[2]
                } else if (app.screen.width < app.screen.height * 1.7) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[3]
                } else {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[4]//interpolate(app.screen.width / app.screen.height, 1.7, 1.97, Game_Category_Config[game_global_vars.gameId].scaleFactor[3], Game_Category_Config[game_global_vars.gameId].scaleFactor[4])
                }

                appStage.x = (app.screen.width - Game_Category_Dimension[game_global_vars.gameId].gameBoard.width * APP_SCALE) / 2
                if (app.screen.width < app.screen.height * media_stop_tablet) {
                    if (game_global_vars.gameId === "vvsl") {
                        const offset_factor = 40
                        const app_stage_offset = interpolate(app.screen.width / app.screen.height, 0.4, media_stop_tablet, app.screen.height / offset_factor, 0)
                        appStage.y = (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].gameBoard.height * APP_SCALE) / 2 - scale_x * 200 + app_stage_offset
                    } else {
                        appStage.y = (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].gameBoard.height * APP_SCALE) / 2 -
                            scale_x * 100 * (app.screen.width < app.screen.height * media_stop_mobile ? 1 : 1.8)
                    }
                } else {
                    appStage.y = app.screen.height - Game_Category_Dimension[game_global_vars.gameId].gameBoard.height * APP_SCALE - Game_Category_Dimension[game_global_vars.gameId].footerBar.height * scale_x
                }

                appStage.scale.set(APP_SCALE)
                if (Global_Vars.info_dialog_wrapper_resize_callback) {
                    Global_Vars.info_dialog_wrapper_resize_callback()
                }
                background_desktop_sprite.scale.set(app.screen.width / Game_Category_Dimension[gameId].bg["desktop"].width)
                background_mobile_sprite.scale.set(app.screen.width / Game_Category_Dimension[gameId].bg["mobile"].width)
                if (app.screen.width >= app.screen.height) {
                    background_desktop_sprite.position.y = 0
                    background_mobile_sprite.position.y = 10000000
                } else {
                    background_desktop_sprite.position.y = 10000000
                    background_mobile_sprite.position.y = app.screen.height / 5 - Game_Category_Dimension[gameId].bg["mobile"].height * app.screen.width / Game_Category_Dimension[gameId].bg["mobile"].width / 5
                }
            };
            window.onresize = resizeApp

            app.stage.addChild(appStage)
            resizeApp();
            // ! Init Splash Start
            const loadingText = new PIXI.Text(`Loading...`, loadingTextStyle);
            loadingText.anchor.set(0.5)
            loadingText.scale.set(app.screen.width > app.screen.height ? 1.5 : 2)
            loadingText.position.set(Game_Category_Config[game_global_vars.gameId].loading.initText.position.x, Game_Category_Config[game_global_vars.gameId].loading.initText.position.y)
            const loadingSpriteBackSprite = new PIXI.Graphics()
            appStage.addChild(loadingSpriteBackSprite)
            loadingSpriteBackSprite.lineStyle(0);
            loadingSpriteBackSprite.beginFill(0x0, 1).drawRect(-4000, -6000, 9000, 13000);
            appStage.addChild(loadingText);
            PIXI.Assets.load([`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/loading.json`]).then(() => {

                if (Global_Vars.initLoaded) return
                const frames = [];
                for (let i = 0; i < 34; i++) {
                    const val = i < 10 ? `0${i}` : i;
                    frames.push(PIXI.Texture.from(`loading-${val}.${webpORpng}`));
                }
                const loadingSprite = new PIXI.AnimatedSprite(frames);
                loadingSprite.animationSpeed = 0.5;
                loadingSprite.anchor.set(0.5)
                loadingSprite.scale.set(app.screen.width > app.screen.height ? 2 : 3)
                loadingSprite.play();
                loadingSprite.position.set(Game_Category_Config[game_global_vars.gameId].loading.icon.position.x, Game_Category_Config[game_global_vars.gameId].loading.icon.position.y)
                appStage.addChild(loadingSprite);
            });

            // ! Init Splash End
            // ! Info Splash Start
            PIXI.Assets.load([`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/loading-bar-anim.json`, `${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/init-bg.${webpORpng}`]).then(() => {
                if (Global_Vars.loaded) return
                Global_Vars.initLoaded = true
                const frames = [];
                for (let i = 1; i <= Game_Category_Config[game_global_vars.gameId].loadingBarLength; i++) {
                    // const val = i < 10 ? `0${i}` : i;
                    frames.push(PIXI.Texture.from(`loading-bar-anim-${i}.${webpORpng}`));
                }
                const splashContainer = new PIXI.Container();
                const back_graphics_sprite = new PIXI.Graphics()
                splashContainer.addChild(back_graphics_sprite)
                back_graphics_sprite.lineStyle(0);
                back_graphics_sprite.beginFill(0x0, 1).drawRect(-4000, -6000, 9000, 9000);

                const splashSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/init-bg.${webpORpng}`))
                const loadingSprite = new PIXI.AnimatedSprite(frames);
                loadingSprite.animationSpeed = 1;
                loadingSprite.play();
                loadingSprite.position.set(Game_Category_Config[game_global_vars.gameId].loadingBarLogo.loadingBar.position.x, Game_Category_Config[game_global_vars.gameId].loadingBarLogo.loadingBar.position.y)
                loadingSprite.anchor.set(0.5)
                loadingSprite.scale.set(Game_Category_Config[game_global_vars.gameId].loadingBarLogo.loadingBar.scale.x, Game_Category_Config[game_global_vars.gameId].loadingBarLogo.loadingBar.scale.y)
                splashContainer.position.set(Game_Category_Config[game_global_vars.gameId].loading.splashContainer.position.x, Game_Category_Config[game_global_vars.gameId].loading.splashContainer.position.y)
                splashSprite.anchor.set(0.5)
                splashSprite.scale.set(Game_Category_Config[game_global_vars.gameId].loadingBarLogo.logo.scale.x, Game_Category_Config[game_global_vars.gameId].loadingBarLogo.logo.scale.y)

                splashSprite.position.set(Game_Category_Config[game_global_vars.gameId].loadingBarLogo.logo.position.x, Game_Category_Config[game_global_vars.gameId].loadingBarLogo.logo.position.y)
                splashContainer.addChild(splashSprite)
                splashContainer.addChild(loadingSprite)
                appStage.removeChildren();
                appStage.addChild(splashContainer);
            });
            // ! Info Splash END

            PIXI.Assets.load(getAssetUrls(gameId)).then(() => loadStartScreen(gameParams, setBalance, setChildContent, setFullScreen));
        }
    }, [])
    // Game Loop.
    app.ticker.add(animateFromTweenLoop);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <SVGs />
            <FullscreenButton setChildContent={setChildContent} />
            {childContent}
        </>
    )
}
export default GamePIXI;