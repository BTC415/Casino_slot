import { Game_Category_Dimension, game_global_vars } from "../config";
import { PIXI } from "../renderer";



export const getReelContainerMask = () => {

    const reelContainerMask = new PIXI.Graphics();
    reelContainerMask.clear();
    reelContainerMask.lineStyle(0);
    reelContainerMask.beginFill(0x8bc5ff, 0.8).drawRect(Game_Category_Dimension[game_global_vars.gameId].mask.x, Game_Category_Dimension[game_global_vars.gameId].mask.y, Game_Category_Dimension[game_global_vars.gameId].mask.width, Game_Category_Dimension[game_global_vars.gameId].mask.height);
    return reelContainerMask
}

// const infoMask = new PIXI.Graphics();
// infoMask.clear();
// infoMask.lineStyle(0);
// infoMask.beginFill(0x8bc5ff, 0.8).drawRect(380, 267, 1140, 685);

// export const getInfoMask = () => infoMask
