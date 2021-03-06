import {useRouter} from "next/router";
import WalletPage from "../contents/wallet/wallet.page";
import ChartPage from "../contents/chart/chart.page";

function DynamicRouter() {
    const router = useRouter()
    const {dynamic} = router.query

    return (
        <div>
            {
                dynamic === "" ? <WalletPage /> :
                dynamic === "main" ? <WalletPage /> :
                dynamic === "chart" ? <ChartPage /> : null
            }
        </div>
    )
}

export default DynamicRouter
