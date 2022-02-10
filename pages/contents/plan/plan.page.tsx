import {useEffect, useState} from "react";
import {MonthItem, Plan, PlanItem, YearItem} from "../../common/interfaces/plan";

// store
import store from "../../store";

// style
import styles from "./plan.module.css"

// utils
import UuidUtil from "../../common/utils/uuid.util";
import {PlanTabAction, PlanTabActionType} from "../../common/features/plan/plan-tab/plan-tab.actions";

// components
import Portal from "../../common/components/modal/common-portal";
import PlanTabModal from "../../common/components/modal/plan-tab/plan-tab.modal";
import PlanItemModal from "../../common/components/modal/plan-item/plan-item.modal";
import {PlanItemActionType} from "../../common/features/plan/plan-item/plan-item.action";

const PlanPage = () => {
    const nowYear = new Date().getFullYear().toString()
    const nowMonth = (new Date().getMonth() + 1).toString()

    const state = store.getState()

    const [plan, setPlan] = useState<Plan>(state.plan)

    store.subscribe(() => {
        setPlan(store.getState().plan)
        console.log(plan)
    })

    const {userId} = plan
    const [yearItems, setYearItems] = useState<Array<YearItem>>(new Array<YearItem>(0))
    const [selectedYear, setSelectedYear] = useState<YearItem>({
        id: "",
        userId: "",
        year: "",
        months: []
    })
    const [monthItems, setMonthItems] = useState<Array<MonthItem>>(new Array<MonthItem>(0))
    const [selectedMonth, setSelectedMonth] = useState<MonthItem>({
        id: "",
        userId: "",
        yearId: "",
        year: "",
        month: "",
        salary: 0,
        usedAmount: 0,
        useAbleAmount: 0,
        plans: []
    })
    const [planItems, setPlanItems] = useState<Array<PlanItem>>(new Array<PlanItem>(0))

    const [tabModalOn, setTabModalOn] = useState(false)
    const [selectedTabItem, setSelectedTabItem] = useState({})

    const [planItemModalOn, setPlanItemModalOn] = useState(false)
    const [selectedPlanItem, setSelectedPlanItem] = useState({})

    useEffect(() => {
        const ys = plan?.years

        setYearItems(ys)

        if(ys?.length > 0) {
            const y = ys?.filter((yearItem) => yearItem.year === nowYear)[0] || ys[0]
            const m = y.months.filter((monthItem: MonthItem) => monthItem.month === nowMonth)[0] || y.months[0]

            setSelectedYear(ys[0])
            setMonthItems(y.months)
            setSelectedMonth(m)
            setPlanItems(m.plans)
        }
    }, [])

    const yearTabSelected = (e: any, yearItem: YearItem, months: Array<MonthItem>) => {
        tabSelectedInitialize(e)
        setSelectedYear(yearItem)
        setMonthItems(months)
    }

    const monthTabSelected = (e: any, monthItem: MonthItem, items: Array<PlanItem>) => {
        tabSelectedInitialize(e)
        setSelectedMonth(monthItem)
        setPlanItems(items)
    }

    const tabSelectedInitialize = (e: any) => {
        const {target} = e
        const parents = target.parentElement
        const {innerText} = e.target

        // eslint-disable-next-line no-return-assign
        Array.from(parents.children).map((parent: any) => (
            // eslint-disable-next-line no-param-reassign
            parent.innerText !== innerText && parent.style.backgroundColor !== ""  ? parent.style = "" : null
        ))

        target.style.backgroundColor = "#ffe3e3"
    }



    const createYearTab = () => {
        setTabModalOn(!tabModalOn);
        setSelectedTabItem({
            dataType: "year",
            actionType: PlanTabActionType.YEAR_TAB_CREATE,
            clickType: "create",
            data: { plan }
        })
    }

    const destroyYearTab = (yearItem: YearItem) => {
        const action = {
            type: PlanTabActionType.YEAR_TAB_DESTROY,
            payload: {yearItem}
        }
        store.dispatch(action)
    }

    const updateYearTab = (yearItem: YearItem) => {
        setTabModalOn(!tabModalOn);
        setSelectedTabItem({
            dataType: "year",
            actionType: PlanTabActionType.YEAR_TAB_UPDATE,
            clickType: "update",
            data: { plan, yearItem }
        })
    }

    const createMonthTab = (e: any, monthItems: Array<MonthItem>) => {
        if(selectedYear.id === null || selectedYear.id === "") {
            alert("년도를 선택하세요!")
            return false
        }

        setTabModalOn(!tabModalOn);
        setSelectedTabItem({
            dataType: "month",
            actionType: PlanTabActionType.MONTH_TAB_CREATE,
            clickType: "create",
            data: {
                plan,
                yearId: selectedYear.id,
                year: selectedYear.year,
                monthItems
            }
        })
    }

    const updateMonthTab = (monthItem: MonthItem) => {
        if(selectedYear.id === null || selectedYear.id === "") {
            alert("년도를 선택하세요!")
            return false
        }

        setTabModalOn(!tabModalOn);
        setSelectedTabItem({
            dataType: "month",
            actionType: PlanTabActionType.MONTH_TAB_UPDATE,
            clickType: "update",
            data: {
                plan,
                monthItem
            }
        })
    }

    const destroyMonthTab = (monthItem: MonthItem) => {
        if(selectedYear.id === null || selectedYear.id === "") {
            alert("년도를 선택하세요!")
            return false
        }

        const action = {
            type: PlanTabActionType.MONTH_TAB_DESTROY,
            payload: {monthItem}
        }
        store.dispatch(action)
    }

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

        const updatePlanItems = [ ...planItems]

        const planItemId = UuidUtil.getUUID()
        const newPlanItem: PlanItem = {
            id: planItemId,
            userId: plan.userId,
            monthId: selectedMonth.id,
            bank: {
                id: UuidUtil.getUUID(),
                planItemId,
                account: "12432534-5324234-12312",
                bankName: "TOSS"
            },
            totalAmount: 1000000,
            amounts: [200000, 100000, 200000, 500000],
            usedPlace: ["헬스", "경조사", "닌텐도 구입", "편의점"],
            paymentMonth: [],
            paid: [true, true, true, true],
            remark: "추가 테스트"
        }
        updatePlanItems.push(newPlanItem)

        setPlanItems(updatePlanItems)

        const action = {
            type: PlanItemActionType.PLAN_ITEM_CREATE,
            payload: {
                planItemId: updatePlanItems
            }
        }

        // @ts-ignore
        store.dispatch(action)
    }

    const updatePlanItem = (planItem: PlanItem) => {
        if(selectedYear.id === "" && selectedMonth.id === "") {
            alert("년도와 월을 선택하세요!")
            return false
        }

        setPlanItemModalOn(!planItemModalOn)
        setSelectedPlanItem({
            actionType: PlanItemActionType.PLAN_ITEM_UPDATE,
            clickType: "update",
            data: {
                plan,
                planItem
            }
        })
    }

    return (
        <>
            <div>
                <div className={styles.plan_tab_content}>
                    <div className={styles.plan_tab}>

                        {yearItems.map((year, idx) => (
                            <div key={idx} onDoubleClick={(e) => updateYearTab(year)} onClick={(e) => yearTabSelected(e, year, year.months)}
                                 style={{backgroundColor: year.year === nowYear ? '#ffe3e3' : ''}}>
                                <span className={styles.plan_tab_destroy} onClick={(e) => destroyYearTab(year)}>x</span>
                                {year.year}
                            </div>
                        ))}
                        <div onClick={(e) => createYearTab()}>+</div>
                    </div>
                    <div className={styles.plan_tab}>

                        {monthItems.length > 0 ?
                            monthItems.map((month, mIdx) => (
                                <div key={mIdx} onDoubleClick={(e) => updateMonthTab(month)} onClick={(e) => monthTabSelected(e, month, month.plans)}
                                     style={{backgroundColor: month.month === nowMonth ? '#ffe3e3' : ''}}>
                                    <span className={styles.plan_tab_destroy}
                                          onClick={(e) => destroyMonthTab(month)}>x</span>
                                    {month.month}
                                </div>
                            )) : null}
                        {monthItems.length >= 12 ? null : <div onClick={(e) => createMonthTab(e, monthItems)}>+</div>}
                    </div>
                </div>
                <div className={styles.plan_content}>
                    <h2>{selectedMonth.year} {selectedMonth.month}</h2>
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
                        {planItems.length > 0 ? planItems.map((planItem, pIdx) => (
                            <div key={pIdx} className={styles.plan_table} onDoubleClick={(e) => updatePlanItem(planItem)}>
                                <div className={styles.plan_table_bank}>
                                    <div>{planItem.bank.bankName}</div>
                                    <div>{planItem.bank.bankNicName === "" ? "no nick name" : planItem.bank.bankNicName}</div>
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
            </div>
            <Portal>
                { tabModalOn && <PlanTabModal selectedTabItem={selectedTabItem} />}
                { planItemModalOn && <PlanItemModal selectedPlanItem={selectedPlanItem} />}
            </Portal>
        </>
    )
}

export default PlanPage
