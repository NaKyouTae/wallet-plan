import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ModalUtil from "../../../utils/modal.util";
import styles from "./wallet-plan.module.css"
import {PlanAction, PlanActionType} from "../../../features/wallet/plan/plan.action";
import store from "../../../../store/store";
import {Wallet} from "../../../interfaces/wallet";

const PlanItemModal = ({...pageProps}) => {
    const {plan, clickType, actionType, data} = pageProps.selectedPlanItem
    const [planItem, setPlanItem] = useState(data.planItem)

    useEffect(() => {
        modalBodySizeInit()
    })

    const changeBankName = (e: any) => {
        planItem.bank.bankName = e.target.value
        setPlanItem([...planItem])
    }

    const changeBankNicName = (e: any) => {
        planItem.bank.bankNicName = e.target.value
        setPlanItem([...planItem])
    }

    const changeAccount = (e: any) => {
        planItem.bank.account = e.target.value
        setPlanItem([...planItem])
    }

    const modalBodySizeInit = () => {
        const container = document.querySelector(".portal_container") as HTMLElement
        const header = document.querySelector(".portal_container_header") as HTMLElement
        const body = document.querySelector(".portal_container_body") as HTMLElement
        const footer = document.querySelector(".portal_container_footer") as HTMLElement

        // @ts-ignore
        body.style.height = `${container.clientHeight - header.clientHeight - footer.clientHeight - 20}px`
    }

    const onCloseModal = (e: any) => {
        ModalUtil.onClose(e)
    }

    const onSave = (e: any) => {
        const action: PlanAction = {
            type: PlanActionType.PLAN_UPDATE,
            payload: {
                planItem: data.planItem
            }
        }

        // @ts-ignore
        store.dispatch(action)
    }

    const addEachPlanItem = (e: any) => {
        planItem.amounts.push("")
        planItem.usedPlace.push("")
        planItem.paymentMonth.push("")
        planItem.paid.push(false)

        const newPlanItem = {
            ...planItem,
            amounts: planItem.amounts,
            usedPlace: planItem.usedPlace,
            paymentMonth: planItem.paymentMonth,
            paid: planItem.paid
        }

        setPlanItem(newPlanItem)
    }


    return (
        <div className="portal_container" style={{height: "800px", width: "600px"}}>
            <div className="portal_container_header">
                <div className="portal_container_header_title">
                    ?????????
                </div>
                <div className="portal_container_header_button">
                    <span onClick={(e) => onCloseModal(e)}>X</span>
                </div>
            </div>
            <div className="portal_container_body">
                <div className="input-area-2">
                    <div className="input-area">
                        <label>?????? ???</label>
                        <input defaultValue={planItem.bank.bankName} onChange={(e) => changeBankName(e)}/>
                    </div>
                    <div className="input-area">
                        <label>?????? ??????</label>
                        <input defaultValue={planItem.bank.bankNicName} onChange={(e) => changeBankNicName(e)}/>
                    </div>
                </div>
                <div className="input-area">
                    <label>?????? ??????</label>
                    <input defaultValue={planItem.bank.account} onChange={(e) => changeAccount(e)}/>
                </div>
                <div className={styles.each_plan_container}>
                    <h3>?????? ??????</h3>
                    <div className="modal-inner-btn-area">
                        <button type="button" onClick={(e) => addEachPlanItem(e)}>?????? ?????? ??????</button>
                    </div>
                    <div className={`${styles.individual_used_row} ${styles.individual_used_title_row}`}>
                        <div className={`${styles.individual_used_title} ${styles.individual_used_col} ${styles.col_each_cmd}`}>cmd</div>
                        <div className={`${styles.individual_used_title} ${styles.individual_used_col} ${styles.col_each_amount}`}>?????? ??????</div>
                        <div className={`${styles.individual_used_title} ${styles.individual_used_col} ${styles.col_used_place}`}>?????????</div>
                        <div className={`${styles.individual_used_title} ${styles.individual_used_col} ${styles.col_pay_month}`}>?????? ???</div>
                        <div className={`${styles.individual_used_title} ${styles.individual_used_col} ${styles.col_paid}`}>?????? ??????</div>
                    </div>
                    <div className={styles.each_plan_container_body}>
                        {
                            planItem.amounts.map((_: any, idx: string | number) => (
                                <div className={styles.individual_used_row} key={`pe_${idx}`}>
                                    <div className={`${styles.individual_used_col} ${styles.col_each_cmd}`}>
                                        <span>X</span>
                                    </div>
                                    <div className={`${styles.individual_used_col} ${styles.col_each_amount}`}>
                                        <input type="text" key={`at_${idx}`} defaultValue={planItem.amounts[idx]} />
                                    </div>
                                    <div className={`${styles.individual_used_col} ${styles.col_used_place}`}>
                                        <input type="text" key={`up_${idx}`} defaultValue={planItem.usedPlace[idx]} />
                                    </div>
                                    <div className={`${styles.individual_used_col} ${styles.col_pay_month}`}>
                                        <input type="text" key={`py_${idx}`} defaultValue={planItem.paymentMonth[idx]} />
                                    </div>
                                    <div className={`${styles.individual_used_col} ${styles.col_paid}`}>
                                        <input type="checkbox" key={`pi_${idx}`} defaultValue={planItem.paid[idx]} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="input-area">
                    <label>??????</label>
                    <input />
                </div>
            </div>
            <div className="portal_container_footer">
                <button type="button" onClick={(e) => onSave(e)}>{clickType === "create" ? "??????" : "??????"}</button>
            </div>
        </div>
    )
}

export default PlanItemModal
