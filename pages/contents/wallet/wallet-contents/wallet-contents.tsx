import {useEffect, useState} from "react";
import styles from "../wallet.module.css";
import store from "../../../store/store";
import {Month, Wallet, Plan, Year} from "../../../common/interfaces/wallet";
import UuidUtil from "../../../common/utils/uuid.util";
import {PlanActionType} from "../../../common/features/wallet/plan/plan.action";
import PlanItemModal from "../../../common/components/modal/wallet-plan/wallet-plan.modal";
import Portal from "../../../common/components/modal/common-portal";

const PlanContent = ({...pageProps}) => {
    const state = store.getState()
    const [plan, setPlan] = useState<Wallet>(state.plan)

    store.subscribe(() => {
        setPlan(store.getState().plan)
        console.log(plan)
    })

    const [selectedYear, setSelectedYear] = useState<Year>(pageProps.selectedYear)
    const [selectedMonth, setSelectedMonth] = useState<Month>(pageProps.selectedMonth)
    const [selectedModalPlanItem, setSelectedModalPlanItem] = useState({})

    const [planItemModalOn, setPlanItemModalOn] = useState(false)

    useEffect(() => {
        const ys = plan?.years

        if(ys?.length > 0) {
            const nowYear = new Date().getFullYear().toString()
            const nowMonth = (new Date().getMonth() + 1).toString()

            const y = ys?.filter((yearItem) => yearItem.year === nowYear)[0] || ys[0]
            const m = y.months.filter((monthItem: Month) => monthItem.month === nowMonth)[0] || y.months[0]

            setSelectedYear(ys[0])
            setSelectedMonth(m)
        }
    }, [])

    const changeSalary = (e: any) => {
        const val = e.target.value
        const changeSelectedMonth = selectedMonth

        changeSelectedMonth.salary = val
        changeSelectedMonth.useAbleAmount = val - changeSelectedMonth.usedAmount

        setSelectedMonth(changeSelectedMonth)
    }

    const createPlanItem = (e: any) => {
        if(selectedYear.id === "" && selectedMonth.id === "") {
            alert("년도와 월을 선택하세요!")
            return false
        }

        const updatePlanItems = [ ...selectedMonth.plans]

        const planItemId = UuidUtil.getUUID()
        const newPlanItem: Plan = {
            id: planItemId,
            monthId: selectedMonth.id,
            bank: {
                id: UuidUtil.getUUID(),
                planItemId,
                account: "12432534-5324234-12312",
                name: "TOSS"
            },
            totalAmount: 1000000,
            amounts: [200000, 100000, 200000, 500000],
            usedPlace: ["헬스", "경조사", "닌텐도 구입", "편의점"],
            paymentMonth: [],
            paid: [true, true, true, true],
            remark: "추가 테스트"
        }

        updatePlanItems.push(newPlanItem)

        const action = {
            type: PlanActionType.PLAN_CREATE,
            payload: {
                planItemId: updatePlanItems
            }
        }

        // @ts-ignore
        store.dispatch(action)
    }

    const updatePlanItem = (planItem: Plan) => {
        if(selectedYear.id === "" && selectedMonth.id === "") {
            alert("년도와 월을 선택하세요!")
            return false
        }

        setPlanItemModalOn(!planItemModalOn)
        setSelectedModalPlanItem({
            actionType: PlanActionType.PLAN_UPDATE,
            clickType: "update",
            data: {
                plan,
                planItem
            }
        })
    }

    return (
        <div>
            <div className={styles.plan_content}>
                {
                    selectedMonth != null ? <h2>{selectedMonth.year} {selectedMonth.month}</h2> : null
                }
                <div>
                    {selectedMonth !== null ?
                        <div className={styles.plan_summary}>
                            <div>
                                <div className={styles.plan_summary_title}>총 금액</div>
                                <input type="number" value={selectedMonth.salary || 0}
                                       onChange={(e) => changeSalary(e)}/>
                            </div>
                            <div>
                                <div className={styles.plan_summary_title}>사용 금액</div>
                                <div
                                    className={styles.plan_summary_used}>{selectedMonth.usedAmount?.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className={styles.plan_summary_title}>사용 가능 금액</div>
                                <div
                                    className={styles.plan_summary_used}>{selectedMonth.useAbleAmount?.toLocaleString()}</div>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="plan-table-btn-area">
                    <button type="button" onClick={(e) => createPlanItem(e)}>ADD</button>
                </div>
                <div className={styles.plan_table}>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_bank}`}>은행</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_totalAmount}`}>최종 금액</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_amounts}`}>개별 금액</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_usedPlace}`}>사용처</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_paymentMonth}`}>결제 월</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_paid}`}>정산 여부</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_remark}`}>비고</div>
                </div>
                <div className={styles.plan_table_content}>
                    {selectedMonth.plans.length > 0 ? selectedMonth.plans.map((planItem, pIdx) => (
                        <div key={pIdx} className={styles.plan_table} onDoubleClick={(e) => updatePlanItem(planItem)}>
                            <div className={styles.plan_table_bank}>
                                <div>{planItem.bank.name}</div>
                                <div>{planItem.bank.nicName === "" ? "no nick name" : planItem.bank.nicName}</div>
                                <div>{planItem.bank.account}</div>
                            </div>
                            <div
                                className={styles.plan_table_totalAmount}>{planItem.totalAmount.toLocaleString()}</div>
                            <div className={styles.plan_table_amounts}>
                                {planItem.amounts.map((amount, amountIdx) => (
                                    <div key={amountIdx}>{amount.toLocaleString()}</div>
                                ))}
                            </div>
                            <div className={styles.plan_table_usedPlace}>
                                {planItem.usedPlace.map((place, placeIdx) => (
                                    <div key={placeIdx}>{place}</div>
                                ))}
                            </div>
                            <div className={styles.plan_table_paymentMonth}>
                                {planItem.paymentMonth.map((payment, paymentIdx) => (
                                    <div key={paymentIdx}>{payment}</div>
                                ))}
                            </div>
                            <div className={styles.plan_table_paid}>
                                {planItem.paid.map((pay, payIdx) => (
                                    <div key={payIdx}>{pay === true ? "O" : "X"}</div>
                                ))}
                            </div>
                            <div className={styles.plan_table_remark}>{planItem.remark}</div>
                        </div>
                    )) : <div>플랜이 없습니다.</div>}
                </div>
            </div>
            <Portal>
                { planItemModalOn && <PlanItemModal selectedPlanItem={selectedModalPlanItem} />}
            </Portal>
        </div>
    )
}

export default PlanContent
