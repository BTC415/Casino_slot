import PageWrapper from "../PageWrapper";
import * as React from "react"
// import { playSound, setVolume, stopSound } from "../../utils/utils";
import { Game_Category_Config, game_global_vars } from "../../config";
import { showToast } from "../../utils/utils";
import axios from "axios";
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function SettingDialog({ setChildContent }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>}) {
    // const [value, setValue] = React.useState<number>(parseInt(localStorage.getItem('slider') || '50'));
    // const [musicChecked, setMusicChecked] = React.useState<boolean>((localStorage.getItem(`music`) || 'true') === 'true')
    // const [fxChecked, setFxChecked] = React.useState<boolean>((localStorage.getItem(`fx`) || 'true') === 'true')
    const [bet14, setBet14] = React.useState<string[]>(JSON.parse(localStorage.getItem(`bet14`) || '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]'))
    const curBet14Index = React.useRef<number>(bet14.indexOf(game_global_vars.bet_text?.text.trim() || "100"))
    // const handleChange = (_: Event, newValue: number | number[]) => {
    //     setValue(newValue as number);
    // };
    // React.useEffect(() => {
    //     localStorage.setItem('slider', Math.round(value).toString())
    //     setVolume(value)

    // }, [value])
    // React.useEffect(() => {
    //     localStorage.setItem(`music`, musicChecked.toString())
    //     localStorage.setItem(`fx`, fxChecked.toString())
    //     if (musicChecked) {
    //         playSound("bg")
    //     } else {
    //         stopSound("bg")
    //     }
    //     if (!fxChecked) {
    //         stopSound("spin")
    //         stopSound("win")
    //     }
    // }, [musicChecked, fxChecked])


    return (
        <PageWrapper>
            <div className="w-full h-full max-h-screen min-h-screen bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-[40px] right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <div className="flex flex-col gap-4 justify-center items-center text-white h-full min-h-screen py-5 pb-20" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceTitle }}>
                    <h1 className="text-2xl">Chips Settings</h1>
                    {/* <div className="flex gap-4">
                        <h2>Volume</h2>
                        <Slider sx={{ width: "200px" }} aria-label="Volume" value={value} max={100} min={0} onChange={handleChange} />
                    </div>
                    <FormGroup style={{ flexDirection: "row", gap: "8px" }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={musicChecked}
                                    onChange={(_, checked) => setMusicChecked(checked)}
                                    size="medium"
                                    sx={{
                                        color: "white",
                                    }}
                                    style={{ transform: "scale(1.5)" }}
                                />
                            }
                            label="Music"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={fxChecked}
                                    onChange={(_, checked) => setFxChecked(checked)}
                                    size="medium"
                                    sx={{
                                        color: "white",
                                    }}
                                    style={{ transform: "scale(1.5)" }}
                                />
                            }
                            label="Sound FX"
                        />
                    </FormGroup> */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-[320px] justify-center items-center">
                        {bet14.map((_, i) =>
                            <ChipItem key={i} id={i} bet14={{ bet14, setBet14 }} />)}

                        <button onClick={() => setChildContent(<></>)} className="w-full px-4 bg-[#787882] rounded-md text-[24px] transition-all ease-in-out hover:bg-[#787882]/80">Cancel</button>
                        <button onClick={() => {
                            if (bet14.some((item) => (parseInt(item) < game_global_vars.stake.min || parseInt(item) > game_global_vars.stake.max))) {
                                showToast(`Bet value should range from ${game_global_vars.stake.min} to ${game_global_vars.stake.max}!`)
                                return
                            }
                            localStorage.setItem('bet14', JSON.stringify(bet14))
                            axios.post('/api/chips/store', {
                                "chips": bet14
                            })
                            game_global_vars.chip_item_text_arr.forEach((item, i) => {
                                item.text = bet14[i]
                            })
                            if (game_global_vars.bet_text && game_global_vars.total_bet_text && game_global_vars.bline_val_text && game_global_vars.mobile_win_hold_spin_text_upper && game_global_vars.mobile_win_hold_spin_text_down) {
                                game_global_vars.bet_text.text = bet14[curBet14Index.current]
                                game_global_vars.total_bet_text.text = parseInt(bet14[curBet14Index.current]) * parseInt(game_global_vars.bline_val_text.text)
                                if (game_global_vars.mobile_win_hold_spin_text_upper.text.trim() === 'Total Bet') {
                                    game_global_vars.mobile_win_hold_spin_text_down.text = parseInt(bet14[curBet14Index.current]) * parseInt(game_global_vars.bline_val_text.text)
                                }
                            }
                            setChildContent(<></>)

                        }} className="w-full px-4 bg-[#FFAE01] rounded-md text-black text-[24px] transition-all ease-in-out hover:bg-[#FFAE01]/80">Save</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
const ChipItem = ({ id, bet14: { bet14, setBet14 } }: { id: number, bet14: { bet14: string[], setBet14: React.Dispatch<React.SetStateAction<string[]>> } }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/^\d+$/.test(e.target.value) && e.target.value) return
        setBet14(prev => {
            const new_var = [...prev]
            const input_value = parseInt(e.target.value || "0")
            const fil_value = Math.min(game_global_vars.stake.max, input_value)
            new_var[id] = fil_value.toString()

            return new_var
        })
    }
    return (
        <div className="flex flex-col gap-[1px] rounded-lg px-2 w-fit py-[2px] border-2 border-white text-center bg-black hover:bg-[#222] transition-all ease-in-out duration-500">
            <h1>Chip Amount</h1>
            <input onChange={handleChange} type="text" value={bet14[id]} className="text-lg bg-transparent w-full text-center focus-within:outline-none" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue }} />
        </div>
    )
}