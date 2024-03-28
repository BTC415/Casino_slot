
import { game_global_vars_type } from "../../@types";
import { Game_Category_Config } from "../../config";
import PageWrapper from "../PageWrapper";
import * as React from "react"
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function AutoSpinDialog({ setChildContent, params: { game_global_vars, startPlay } }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, params: { game_global_vars: game_global_vars_type, startPlay: () => Promise<void> } }) {
    const handleClose = () => {
        setChildContent(<></>)
    }

    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={handleClose} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <div className="flex flex-col gap-4 justify-center items-center text-white h-full min-h-screen" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle }}>
                    <h1 className="text-2xl">Autospin Settings</h1>
                    <h4 className="text-[#888]">Number of rounds</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-[200px] place-items-center cursor-pointer">
                        {[10, 25, 50, 75, 100, 125, 200, -1].map((item,i) => (
                            <div key={i} onClick={() => {
                                game_global_vars.auto_spin_val = item;
                                startPlay()
                                handleClose()
                            }} className="p-8 border border-[#888] text-center w-full bg-black">
                                <h1 className="text-xl" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue }}>{item > 0 ? item : "∞"}</h1>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}