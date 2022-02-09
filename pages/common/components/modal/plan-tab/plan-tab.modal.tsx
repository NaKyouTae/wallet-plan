import {useEffect, useState} from "react";
import {PlanTabAction} from "../../../features/plan/plan-tab/plan-tab.actions";
import UuidUtil from "../../../utils/uuid.util";
import store from "../../../../store";

const planTabModal = ({...pageProps}) => {
    const {dataType, actionType, clickType, data} = pageProps.selectedTabItem

    let prevNextItem = ""

    if(clickType === "update") {
        if(dataType === "year" ) {
            prevNextItem = data.yearItem.year
        }else if(dataType === "month") {
            prevNextItem = data.monthItem.month
        }
    }

    const [nextItem, setNextItem] = useState(prevNextItem)

    const changeNextItem = (e: any) => {
        setNextItem(e.target.value)
    }

    useEffect(() => {
        modalBodySizeInit()
    })

    const modalBodySizeInit = () => {
        const container = document.querySelector(".portal_container") as HTMLElement
        const header = document.querySelector(".portal_container_header") as HTMLElement
        const body = document.querySelector(".portal_container_body") as HTMLElement
        const footer = document.querySelector(".portal_container_footer") as HTMLElement

        // @ts-ignore
        body.style.height = `${container.clientHeight - header.clientHeight - footer.clientHeight - 20}px`
    }

    const onSave = (e: any) => {
        // @ts-ignore
        const action: PlanTabAction = { type: actionType, payload: {}}
        const {userId} = data.plan
        const nextId = UuidUtil.getUUID()

        switch(dataType) {
            case "year" :
                action.payload.yearItem = {
                        id: nextId,
                        userId,
                        year: nextItem,
                        months: []
                }

                if(clickType === "destroy") {
                    action.payload.yearItem = data.yearItem
                }else if(clickType === "update") {
                    data.yearItem.year = nextItem

                    action.payload.yearItem = data.yearItem
                }

                break
            case "month" :
                action.payload.monthItem = {
                    id: nextId,
                    userId,
                    yearId: data.yearId,
                    year: data.year,
                    month: nextItem,
                    salary: 0,
                    usedAmount: 0,
                    useAbleAmount: 0,
                    plans: [],
                }

                if(clickType === "destroy") {
                    action.payload.monthItem = data.monthItem
                }else if(clickType === "update") {
                    data.monthItem.month = nextItem
                    action.payload.monthItem = data.monthItem
                }

                break
            default: break
        }

        store.dispatch(action)
    }

    const onCloseModal = (e: any) => {

    }

    return (
        <div className="portal_container" style={{height: "200px", width: "250px"}}>
            <div className="portal_container_header">
                <div className="portal_container_header_title">
                    {
                        dataType === "year" ? <div>년도 {clickType === "create" ? "생성" : "수정"}</div> : <div>월 {clickType === "create" ? "생성" : "수정"}</div>
                    }
                </div>
                <div className="portal_container_header_button">
                    <span onClick={(e) => onCloseModal(e)}>X</span>
                </div>
            </div>
            <div className="portal_container_body">
                <div className="input-area">
                    <label>새로운 { dataType === "year" ? "년도" : "월" }</label>
                    <input type="text" defaultValue={nextItem} onChange={(e) => changeNextItem(e)}/>
                </div>
            </div>
            <div className="portal_container_footer">
                <button type="button" onClick={(e) => onSave(e)}>{clickType === "create" ? "저장" : "수정"}</button>
            </div>
        </div>
    )
}
export default planTabModal
