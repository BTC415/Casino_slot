import axios from 'axios';
import * as React from 'react';
import PageWrapper from '../PageWrapper';
import BetHistory from './BetHistory';
import { Game_Category_Config, game_global_vars } from '../../config';
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
const BetHistoryDetails = ({ setChildContent, id }: { setChildContent: React.Dispatch<React.SetStateAction<React.JSX.Element>>, id: number }) => {

    const [data, setData] = React.useState<any>(null)
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get(`/api/history/games/${id}/details`).then(({ data: { game } }) => {
                setData(game)
            })
            setLoading(false)
        })()
    }, [])
    // const slotInfo = JSON.parse(localStorage.getItem('slotinfo') || '[]').filter((item: any) => item.id == id) || []
    return (
        <PageWrapper>

            <div className="user-history w-50" style={{ fontFamily: Game_Category_Config[game_global_vars.gameId].fontFaceValue }}>
                <div className="user-data">
                    <div className="data-header">
                        <img src={`${VITE_API_ASSETS_ELSE_URL}res/back.png`} alt="back" className='float-left cursor-pointer align-middle mx-4' onClick={() => setChildContent(<BetHistory setChildContent={setChildContent} />)} />
                        Game {data?.id}
                    </div>
                    <div className="data-body relative">
                        <div className={`${loading ? "flex" : "hidden"} justify-center items-center absolute top-0 w-full h-full z-10 bg-black/50`}>
                            <img src={`${VITE_API_ASSETS_ELSE_URL}res/loading.gif`} alt="loading..." width={120} height={120} />
                        </div>
                        <div className="table-responsive">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Round Id</td>
                                        <td>{data?.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Game	</td>
                                        <td>{data?.title}</td>
                                    </tr>
                                    {
                                        (data?.title as string)?.toLowerCase() === "crash" ?
                                            <>
                                                <tr>
                                                    <td>Bet	</td>
                                                    <td>{data?.bet}</td>
                                                </tr>
                                                <tr>
                                                    <td>Win</td>
                                                    <td>{data?.win}</td>
                                                </tr>
                                                <tr>
                                                    <td>Profit</td>
                                                    <td>{data?.profit}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cashout</td>
                                                    <td>{data?.gameable.cashout}</td>
                                                </tr>
                                                <tr>
                                                    <td>Crashed at</td>
                                                    <td>{data?.gameable.max_payout}</td>
                                                </tr>
                                                <tr>
                                                    <td>Played</td>
                                                    <td>{data?.created_at}</td>
                                                </tr>
                                            </> :
                                            <>
                                                <tr>
                                                    <td>Lines	</td>
                                                    <td>{data?.gameable.lines}</td>
                                                </tr>
                                                <tr>
                                                    <td>Win</td>
                                                    <td>{data?.win}</td>
                                                </tr>
                                                <tr>
                                                    <td>Created at</td>
                                                    <td>{data?.created_at}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated at</td>
                                                    <td>{data?.updated_at}</td>
                                                </tr>
                                            </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}
export default BetHistoryDetails;


