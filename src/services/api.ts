import { firestore } from "../services/firebase";
const db = firestore;
export const months = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

// Faturamento



function percentage(reference: number, compared: number) {
    const percentage = ((reference - compared) / reference) * 100
    return Number(percentage.toFixed(2))
}

async function getValues(year: string, month: string) {
    try {
        const lastMonth = months[months.indexOf(month) - 1]
        const lastYear = years[years.indexOf(year) - 1]


        const monthDoc = db.collection(year).doc(month)
        const lastMonthDoc = db.collection(year).doc(lastMonth)
        const lastYearDoc = db.collection(lastYear).doc(month)

        const monthValue: number = (await monthDoc.get()).data()!.value
        const lastMonthValue: number = (await lastMonthDoc.get()).data()!.value
        const lastYearValue: number = await (await lastYearDoc.get()).data()!.value

        const lastMonthGrowth = percentage(monthValue, lastMonthValue)
        const lastYearGrowth = percentage(monthValue, lastYearValue)

        const monthRow = [monthValue, lastMonthGrowth, lastYearGrowth]


        return monthRow;
    }
    catch (error) {
        console.error(error)
    }
}

export const monthRow = await getValues('2022', 'novembro')
