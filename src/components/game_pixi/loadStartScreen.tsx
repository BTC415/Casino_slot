import { Global_Vars, PIXI, app, appStage } from "../../renderer";
import { fadeInOut, tweenTo } from "../../utils/urls";
import { gen_portal_logo_animated_sprite, loadSound, media_stop_mobile, media_stop_tablet, mobileORdesktop, webpORpng } from "../../utils/utils";
import loadMainScreen from "./loadMainScreen";
import { gameParamsType } from "../../store/types";
import { Game_Category_Config, game_global_vars } from "../../config";
import { Dispatch, SetStateAction } from "react";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL

export async function loadStartScreen(gameParams: gameParamsType, setBalance: (balanceOrCb: number | ((v: number) => number)) => void, setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, setFullScreen: Dispatch<SetStateAction<boolean>>) {
  Global_Vars.loaded = true;
  loadSound()
  appStage.removeChildren()
  const portalSprite1 = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/portal1.${webpORpng}`))

  const portal_logo_anim_sprite = gen_portal_logo_animated_sprite()

  // const portalSprite2 = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/portal2.png`))
  const buttonStart = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/button-start.${webpORpng}`))
  // const logoJungleSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/logo-jungle.png`))
  appStage.addChild(portalSprite1);
  appStage.addChild(portal_logo_anim_sprite);
  // appStage.addChild(portalSprite2);
  // appStage.addChild(logoJungleSprite);
  appStage.addChild(buttonStart);
  portal_logo_anim_sprite.anchor.set(0.5)
  portalSprite1.anchor.set(0.5)
  buttonStart.anchor.set(0.5)
  // logoJungleSprite.anchor.set(0.5)
  buttonStart.eventMode = 'static'
  buttonStart.cursor = 'pointer'
  buttonStart.on('pointerdown', () => {
    tweenTo(app.stage, 'alpha', 0, 1, 1000, fadeInOut(), null, null)
    setTimeout(() => loadMainScreen(gameParams, setBalance, setChildContent, setFullScreen), 400);
  });
  (Global_Vars.info_dialog_wrapper_resize_callback = function () {
    if (app.screen.width < app.screen.height * media_stop_mobile) {
      // portalSprite2.position.set(600, 360)
      portalSprite1.scale.set(Game_Category_Config[game_global_vars.gameId].portal.scale[0])
      portalSprite1.position.set(Game_Category_Config[game_global_vars.gameId].portal.position[0].x, Game_Category_Config[game_global_vars.gameId].portal.position[0].y)
      buttonStart.position.set(Game_Category_Config[game_global_vars.gameId].start.position[0].x, Game_Category_Config[game_global_vars.gameId].start.position[0].y);
      buttonStart.scale.set(Game_Category_Config[game_global_vars.gameId].start.scale[0])

      portal_logo_anim_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.scale[0])
      portal_logo_anim_sprite.position.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[0].x, Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[0].y);
    } else if (app.screen.width < app.screen.height * media_stop_tablet) {
      // portalSprite2.position.set(600, 360)
      portalSprite1.scale.set(Game_Category_Config[game_global_vars.gameId].portal.scale[1])
      portalSprite1.position.set(Game_Category_Config[game_global_vars.gameId].portal.position[1].x, Game_Category_Config[game_global_vars.gameId].portal.position[1].y)
      buttonStart.position.set(Game_Category_Config[game_global_vars.gameId].start.position[1].x, Game_Category_Config[game_global_vars.gameId].start.position[1].y);
      buttonStart.scale.set(Game_Category_Config[game_global_vars.gameId].start.scale[1])

      portal_logo_anim_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.scale[0])
      portal_logo_anim_sprite.position.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[1].x, Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[0].y);
    }
    else {
      // portalSprite2.position.set(1000, 200)
      portalSprite1.position.set(Game_Category_Config[game_global_vars.gameId].portal.position[2].x, Game_Category_Config[game_global_vars.gameId].portal.position[2].y)
      portalSprite1.scale.set(Game_Category_Config[game_global_vars.gameId].portal.scale[2])
      buttonStart.position.set(Game_Category_Config[game_global_vars.gameId].start.position[2].x, Game_Category_Config[game_global_vars.gameId].start.position[2].y);
      buttonStart.scale.set(Game_Category_Config[game_global_vars.gameId].start.scale[2])

      portal_logo_anim_sprite.scale.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.scale[1])
      portal_logo_anim_sprite.position.set(Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[1].x, Game_Category_Config[game_global_vars.gameId].portal.logoAnim.position[1].y);
    }
  })();

}