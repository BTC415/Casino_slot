import { Game_Category_Config, game_global_vars } from "../../config";
import { PIXI } from "../../renderer";
import PageWrapper from "../PageWrapper";
import * as React from "react"
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function ChipDialog({ setChildContent, params: { bet_text, total_bet_text, bline_val_text, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down } }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, params: { bet_text: PIXI.Text, total_bet_text: PIXI.Text, bline_val_text: PIXI.Text, mobile_win_hold_spin_text_upper: PIXI.Text, mobile_win_hold_spin_text_down: PIXI.Text } }) {
    const [bet14] = React.useState<string[]>(JSON.parse(localStorage.getItem(`bet14`) || '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]'))
    const handleClose = () => {
        setChildContent(<></>)
    }

    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={handleClose} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <div className="flex flex-col gap-4 justify-center items-center text-white h-full min-h-screen" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle }}>
                    <h1 className="text-2xl">Chips</h1>
                    <h4 className="text-[#888]">Bet</h4>
                    <div className="grid grid-cols-3 gap-y-2 gap-x-4 w-[300px] place-items-center cursor-pointer">
                        {bet14.map((item, i) => (
                            <div key={i} onClick={() => {
                                bet_text.text = bet14[i]
                                total_bet_text.text = String(parseInt(bline_val_text.text) * parseInt(bet14[i]))
                                if (mobile_win_hold_spin_text_upper.text.trim() === 'Total Bet') {
                                    mobile_win_hold_spin_text_down.text = String(parseInt(bline_val_text.text) * parseInt(bet14[i]))
                                }
                                handleClose()
                            }} className={`p-4 border border-[#888] text-center w-full  ${bet_text.text === item ? "bg-gray-600" : "bg-black"}`}>
                                <h1 className="text-xl" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue }}>{item}</h1>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}