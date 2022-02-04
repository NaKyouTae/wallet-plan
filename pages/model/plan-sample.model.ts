import {Plan} from "../interfaces/plan";

export const planItemSample = {
    bank : {
        account : "1234-5678-90123",
        bankName : "TOSS",
        bankNicName : "TADA"
    },
    totalAmount : 20000,
    amounts : [
        1000, 2000, 4000, 5000,
    ],
    usedPlace : ["사탕", "사탕1", "사탕2", "사탕3"],
    paymentMonth : ["", "", "", ""],
    paid : [true, true, true, false],
    remark : "비고닷"
}

const monthSample = (year: number, month: number) => {
    return {
        year,
        month,
        plans: [planItemSample, planItemSample, planItemSample]
    }
}

const yearSample = (year: number) => {
    return {
        year,
        months : [
            monthSample(year, 1), monthSample(year, 2), monthSample(year, 3), monthSample(year, 4), monthSample(year, 5),
            monthSample(year, 6), monthSample(year, 7), monthSample(year, 8), monthSample(year, 9), monthSample(year, 10),
            monthSample(year, 11), monthSample(year, 12),

        ]
    }
}

// @ts-ignore
export const planSample: Plan = {
    years : [
        {
            year: 2017,
            months : [
                {
                    year: 2017,
                    month: 1,
                    plans: [planItemSample, planItemSample, planItemSample]
                }
            ]
        }
        , yearSample(2018), yearSample(2019), yearSample(2020), yearSample(2021), yearSample(2022)
        ,yearSample(2023), yearSample(2024), yearSample(2025), yearSample(2026), yearSample(2027), yearSample(2028)
        ,yearSample(2029), yearSample(2030), yearSample(2031), yearSample(2032), yearSample(2033), yearSample(2034)
        ,yearSample(2035), yearSample(2036), yearSample(2037), yearSample(2038), yearSample(2039), yearSample(2040)
    ]
}

