import { CheckBox } from "@pixi/ui"
import { PIXI } from "../renderer";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL

export const getCheckSprite = (type: 'music' | 'fx', onChange: (value: number | boolean) => void) => {

    const checkBox = new CheckBox({
        style: {
            unchecked: PIXI.Sprite.from(`${VITE_API_ASSETS_IMAGE_URL}jrsl/${type}-false.png`),
            checked: PIXI.Sprite.from(`${VITE_API_ASSETS_IMAGE_URL}jrsl/${type}-true.png`),
        },
        checked: (localStorage.getItem(`${type}`) || 'true') === 'true'
    });
    checkBox.onChange.connect((val) => {
        localStorage.setItem(`${type}`, val.toString())
    })
    checkBox.onChange.connect(onChange);
    return checkBox
}
