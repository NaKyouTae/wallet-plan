import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document";

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root" />
                </body>
            </Html>
        )
    }
}

export default CustomDocument
