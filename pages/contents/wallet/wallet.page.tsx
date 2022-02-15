import {useEffect, useState} from "react";
import {Month, Wallet, Plan, Year} from "../../common/interfaces/wallet";

// store
import store from "../../store/store";

// style
import styles from "./wallet.module.css"

// utils
import UuidUtil from "../../common/utils/uuid.util";
import {PlanTabActionType} from "../../common/features/wallet/category/category.actions";

// components
import Portal from "../../common/components/modal/common-portal";
import PlanTabModal from "../../common/components/modal/wallet-category/wallet-category.modal";
import PlanItemModal from "../../common/components/modal/wallet-plan/wallet-plan.modal";
import {PlanActionType} from "../../common/features/wallet/plan/plan.action";
import PlanContent from "./wallet-contents/wallet-contents";
import PlanNoContent from "./wallet-no-contents/wallet-no-contents";

const WalletPage = () => {
    const nowYear = new Date().getFullYear().toString()
    const nowMonth = (new Date().getMonth() + 1).toString()

    const state = store.getState()

    const [plan, setPlan] = useState<Wallet>(state.plan)

    store.subscribe(() => {
        setPlan(store.getState().plan)
        console.log(plan)
    })

    // @ts-ignore
    const [selectedYear, setSelectedYear] = useState<Year>(null)
    // @ts-ignore
    const [selectedMonth, setSelectedMonth] = useState<Month>(null)

    const [tabModalOn, setTabModalOn] = useState(false)
    const [selectedTabItem, setSelectedTabItem] = useState({})

    useEffect(() => {
        const ys = plan?.years

        // setYearItems(ys)

        if(ys?.length > 0) {
            const y = ys?.filter((yearItem) => yearItem.year === nowYear)[0] || ys[0]
            const m = y.months.filter((monthItem: Month) => monthItem.month === nowMonth)[0] || y.months[0]

            setSelectedYear(ys[0])
            // setMonthItems(y.months)
            setSelectedMonth(m)
            // setPlanItems(m.plans)
        }
    }, [])

    const yearTabSelected = (e: any, yearItem: Year, months: Array<Month>) => {
        tabSelectedInitialize(e)
        setSelectedYear(yearItem)
        // setMonthItems(months)
    }

    const monthTabSelected = (e: any, monthItem: Month, items: Array<Plan>) => {
        tabSelectedInitialize(e)
        setSelectedMonth(monthItem)
        // setPlanItems(items)
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

    const destroyYearTab = (yearItem: Year) => {
        const action = {
            type: PlanTabActionType.YEAR_TAB_DESTROY,
            payload: {yearItem}
        }
        store.dispatch(action)
    }

    const updateYearTab = (yearItem: Year) => {
        setTabModalOn(!tabModalOn);
        setSelectedTabItem({
            dataType: "year",
            actionType: PlanTabActionType.YEAR_TAB_UPDATE,
            clickType: "update",
            data: { plan, yearItem }
        })
    }

    const createMonthTab = (e: any, monthItems: Array<Month>) => {
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

    const updateMonthTab = (monthItem: Month) => {
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

    const destroyMonthTab = (monthItem: Month) => {
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

    return (
        <>
            <div className={styles.plan_tab_content}>
                <div className={styles.plan_tab}>
                    {
                        plan.years.map((year, idx) => (
                            <div key={idx} onDoubleClick={(e) => updateYearTab(year)} onClick={(e) => yearTabSelected(e, year, year.months)}
                                 style={{backgroundColor: year.year === nowYear ? '#ffe3e3' : ''}}>
                                <span className={styles.plan_tab_destroy} onClick={(e) => destroyYearTab(year)}>x</span>
                                {year.year}
                            </div>
                        ))
                    }
                    <div onClick={(e) => createYearTab()}>+</div>
                </div>
                <div className={styles.plan_tab}>
                    {
                        selectedYear != null && selectedYear.months.length > 0 ?
                            selectedYear.months.map((month, mIdx) => (
                                <div key={mIdx} onDoubleClick={(e) => updateMonthTab(month)} onClick={(e) => monthTabSelected(e, month, month.plans)}
                                     style={{backgroundColor: month.month === nowMonth ? '#ffe3e3' : ''}}>
                                    <span className={styles.plan_tab_destroy}
                                          onClick={(e) => destroyMonthTab(month)}>x</span>
                                    {month.month}
                                </div>
                            )) : null
                    }
                    {
                        selectedYear == null || selectedYear.months.length >= 12 ? null : <div onClick={(e) => createMonthTab(e, selectedYear.months)}>+</div>
                    }
                </div>
            </div>
            <div>
                {
                    selectedYear == null || selectedMonth == null ? <PlanNoContent /> : <PlanContent selectedMonth={selectedMonth} selectedYear={selectedYear}/>
                }
            </div>
            <Portal>
                { tabModalOn && <PlanTabModal selectedTabItem={selectedTabItem} />}
            </Portal>
        </>
    )
}

export default WalletPage
