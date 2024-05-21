import { firestore } from "../services/firebase";

const db = firestore;
export const months = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

// Faturamento



function percentage(reference: number, compared: number) {
    const percentage = ((reference - compared) / reference) * 100
    return Number(percentage.toFixed(2))
}

function getPreviousMonth(month: string, year: string): [string, string] {
    let prevMonth: string;
    let prevYear: string;

    const monthIndex = months.indexOf(month);

    if (monthIndex === 0) {
        prevMonth = 'dezembro';
        prevYear = years[years.indexOf(year) - 1];
    } else {
        prevMonth = months[monthIndex - 1];
        prevYear = year;
    }
    
    return [prevMonth, prevYear];
}

export async function getValues(month: string, year: string) {
    try {
        const [lastMonth, lastMonthYear] = getPreviousMonth(month, year);
        const lastYear = years[years.indexOf(year) - 1]

        const monthDoc = db.collection(year).doc(month)
        const lastMonthDoc = db.collection(lastMonthYear).doc(lastMonth)
        const lastYearDoc = db.collection(lastYear).doc(month)

        const monthValue: number = (await monthDoc.get()).data()!.value
        const lastMonthValue: number = (await lastMonthDoc.get()).data()!.value
        const lastYearValue: number = await (await lastYearDoc.get()).data()!.value

        const lastMonthGrowth = percentage(monthValue, lastMonthValue)
        const lastYearGrowth = percentage(monthValue, lastYearValue)


        const monthRow = [monthValue, lastMonthValue, lastYearValue]
        const monthGrowth = ['Crescimento', lastMonthGrowth, lastYearGrowth]

        return {
            monthRow: monthRow,
            monthGrowth: monthGrowth
        };
    }
    catch (error) {
        console.log('Erro no acesso ao banco')
        console.error(error)
    }
}


