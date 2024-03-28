import { game_global_vars } from "../../config";
import { mobileORdesktop, webpORpng } from "../../utils/utils";
import PageWrapper from "../PageWrapper";
import * as React from "react"
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function InfoDialog({ setChildContent }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>> }) {
    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen pt-10 pb-20 bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <img className="w-full hidden lg:block" alt="info" src={`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/info-content.${webpORpng}`} />
                <img className="w-full block lg:hidden" alt="info" src={`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/info-content-mobile.${webpORpng}`} />
            </div>
        </PageWrapper>
    )
}