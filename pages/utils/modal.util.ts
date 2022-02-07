import {useEffect, useState} from "react";
// eslint-disable-next-line import/no-unresolved
import ReactDOM from "react-dom";

const ModalUtil = () => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const modalContent = (
        "trsetetseres"
    )

    // eslint-disable-next-line valid-typeof
    const element = typeof window !== undefined && document.getElementById("modal-root")
    if(isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            // @ts-ignore
            element
        )
    }

    return null
}

export default ModalUtil
