import {useRouter} from "next/router";
import PlanPage from "../contents/plan/plan.page";
import ChartPage from "../contents/chart/chart.page";

function DynamicRouter() {
    const router = useRouter()
    const {dynamic} = router.query

    return (
        <div>
            {
                dynamic === "main" ? <PlanPage /> :
                dynamic === "chart" ? <ChartPage /> : null
            }
        </div>
    )
}

export default DynamicRouter
