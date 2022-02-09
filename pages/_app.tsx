import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import {RoutesModel} from "./common/models/routes.model";
import Portal from "./common/components/modal/common-portal";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()

    const routes = RoutesModel

    return (
        <div className="main-container">
            <div className="logo">Wallet Plan</div>
            <div className="dynamic-router">
                {routes.map((route, idx) => (
                    <a key={idx} onClick={() => router.push(route.url)} >{route.title}</a>
                ))}
            </div>
            <div className="main-content">
                <Component />
            </div>
        </div>

    )
}

export default MyApp
