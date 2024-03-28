import { game_global_vars } from "../../config";
import PageWrapper from "../PageWrapper";
import * as React from "react"
import "../../style/rulestyle.css"
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function RuleDialog({ setChildContent }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>> }) {
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (ref.current)
            ref.current.innerHTML = game_global_vars.rulesHTML.replace('\r\n','<br/>')
    }, [])
    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <img className="w-full max-w-[800px] mx-auto p-8 mt-20" src={`${VITE_API_ASSETS_ELSE_URL}res/${game_global_vars.gameId}/logo.png`} alt="logo" />
                <div className="rule-page text-[#7F7F7F] font-salsa mx-auto max-w-[860px] w-3/4 pb-20 text-justify" ref={ref} />
            </div>
        </PageWrapper>
    )
}