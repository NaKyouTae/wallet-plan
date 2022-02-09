export default class ModalUtil {
    static onClose(e: any) {
        const {parent} = e.target

        console.log(parent)
    }
}
