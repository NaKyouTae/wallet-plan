import {AppProps} from "next/app";
import {useRouter} from "next/router";
import {useEffect} from "react";

function MainPage({ Component, pageProps }: AppProps) {

    const router = useRouter()

    useEffect(() => {
        router.beforePopState(({ url, as, options }) => {
            if(url === "main") {
                return true
            }

            return false
        })
    }, [])

    return (
        <div>
            <div>test</div>
        </div>
    )
}

export default MainPage
