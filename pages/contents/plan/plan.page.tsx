import {useEffect, useState} from "react";
import {loadGetInitialProps} from "next/dist/shared/lib/utils";
import LocalStorageUtils from "../../utils/localStorage.utils";
import {MonthItem, Plan, PlanItem, YearItem} from "../../interfaces/plan";
import styles from "./plan.module.css"
import {planSample} from "../../model/plan-sample.model";

const PlanPage = () => {
    const localStorage = LocalStorageUtils
    const nowYear = new Date().getFullYear()
    const nowMonth = new Date().getMonth() + 1

    localStorage.setItem("plan", JSON.stringify(planSample))

    // @ts-ignore
    const plan: Plan = JSON.parse(localStorage.getItem("plan"))

    const [yearItems, setYearItems] = useState(new Array<YearItem>(0))
    const [monthItems, setMonthItems] = useState(new Array<MonthItem>(0))
    const [planItems, setPlanItems] = useState(new Array<PlanItem>(0))

    useEffect(() => {
        const y = plan.years
        const m = y.filter((yearItem) => yearItem.year === nowYear)[0].months
        const p = m.filter((month) => month.month === nowMonth)[0].plans

        setYearItems(y)
        setMonthItems(m)
        setPlanItems(p)
    }, [])

    const yearTabSelected = (e: any, months: Array<MonthItem>) => {
        tabSelectedInitialize(e)
        setMonthItems(months)
    }

    const monthTabSelected = (e: any, items: Array<PlanItem>) => {
        tabSelectedInitialize(e)
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

    const createTab = (e: any, type: Array<YearItem> | Array<MonthItem>) => {
        console.log(e)

        // if(type instanceof Array<YearItem>) {
        //
        // } else (type instanceof Array<MonthItem>) {
        //
        // }

    }

    return (
        <div>
            <div>
                <div className={styles.plan_tab}>
                    {
                        yearItems.map((year, idx) => (
                            <div key={idx} onClick={(e) => yearTabSelected(e, year.months)} style={{ backgroundColor : year.year === nowYear ? '#ffe3e3':''}}>{year.year}</div>
                        ))
                    }
                    <div onClick={(e) => createTab(e, yearItems)}>+</div>
                </div>
                <div className={styles.plan_tab}>
                    {
                        monthItems.length > 0 ?
                            monthItems.map((month, mIdx) => (
                                <div key={mIdx} onClick={(e) => monthTabSelected(e, month.plans)} style={{ backgroundColor : month.month === nowMonth ? '#ffe3e3':''}}>{month.month}</div>
                            )) : null
                    }
                    {
                        monthItems.length >= 12 ? null : <div onClick={(e) => createTab(e, monthItems)}>+</div>
                    }

                </div>
            </div>
            <div className={styles.plan_content}>
                <div className={styles.plan_table}>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_bank}`}>은행</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_totalAmount}`}>최종 금액</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_amounts}`}>개별 금액</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_usedPlace}`}>사용처</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_paymentMonth}`}>결제 월</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_paid}`}>정산 여부</div>
                    <div className={`${styles.plan_table_title} ${styles.plan_table_remark}`}>비고</div>
                </div>
                {
                    planItems.map((planItem, pIdx) => (
                            <div key={pIdx} className={styles.plan_table}>
                                <div className={styles.plan_table_bank}>
                                    <div>{planItem.bank.bankName}</div>
                                    <div>{planItem.bank.bankNicName === "" ? "no nick name":planItem.bank.bankNicName}</div>
                                    <div>{planItem.bank.account}</div>
                                </div>
                                <div className={styles.plan_table_totalAmount}>{planItem.totalAmount}</div>
                                <div className={styles.plan_table_amounts}>
                                    {
                                        planItem.amounts.map((amount, amountIdx) => (
                                            <div key={amountIdx}>{amount}</div>
                                        ))
                                    }
                                </div>
                                <div className={styles.plan_table_usedPlace}>
                                    {
                                        planItem.usedPlace.map((place, placeIdx) => (
                                            <div key={placeIdx}>{place}</div>
                                        ))
                                    }
                                </div>
                                <div className={styles.plan_table_paymentMonth}>
                                    {
                                        planItem.paymentMonth.map((payment, paymentIdx) => (
                                            <div key={paymentIdx}>{payment}</div>
                                        ))
                                    }
                                </div>
                                <div className={styles.plan_table_paid}>
                                    {
                                        planItem.paid.map((pay, payIdx) => (
                                            <div key={payIdx}>{pay === true ? "O":"X"}</div>
                                        ))
                                    }
                                </div>
                                <div className={styles.plan_table_remark}>{planItem.remark}</div>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlanPage
