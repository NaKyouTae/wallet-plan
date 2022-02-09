import ReactDOM from "react-dom";

// @ts-ignore
const Portal = ({ children }) => {
    const element =
        typeof window !== "undefined" && document.getElementById("modal-root");
    return element !== null && children !== null ? ReactDOM.createPortal(children, element as Element) : null
};

export default Portal;
