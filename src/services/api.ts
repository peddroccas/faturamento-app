import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { mapKeys } from "lodash";

const db = firestore;
export const lojas = ['São Rafael', "Estrela", "Antunes", "São Rafael 2"]
export const months = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
export const years = [
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

// Faturamento

function percentage(reference: number, compared: number) {

  const percentage = ((reference - compared) / reference) * 100;
  //console.log(percentage)

  return Number(percentage.toFixed(2))
}

export async function getYearsValues(month: string) {
  try {
    if (month === "março") {
      month = "marco";
    }
    const yearsValues: number[] = []
    const yearsGrowth : number[] = []

    for (const year of years) {
      const monthDoc = db.collection(year).doc(month);
      const monthValue: number = (await monthDoc.get()).data()!.value;
      const monthGrowth = percentage(monthValue, yearsValues[yearsValues.length - 1])
      yearsValues.push(monthValue)
      yearsGrowth.push(monthGrowth)
    }
    yearsGrowth.shift()

    return {
      yearsValues: yearsValues,
      yearsGrowth: yearsGrowth
    }

  } catch (error) {
    console.log("Erro no acesso ao banco");
    console.error(error);
  }
}

export function getPreviousThreeMonths(
  month: string,
  year: string
): [string, string][] {

  const monthIndex = months.indexOf(month);

  let result: [string, string][] = [];

  for (let i = 1; i <= 3; i++) {
    let prevMonthIndex = monthIndex - i;
    let prevYear = year;

    if (prevMonthIndex < 0) {
      prevMonthIndex += 12;
      prevYear = (parseInt(year, 10) - 1).toString();
    }

    result.push([months[prevMonthIndex], prevYear]);
  }

  return result;
}



// export async function getValues(month: string, year: string) {
//   try {
//     const [lastMonth, lastMonthYear] = getPreviousMonth(month, year);
//     const lastYear = years[years.indexOf(year) - 1];

//     if (month === "março") {
//       month = "marco";
//     }

//     const monthDoc = db.collection(year).doc(month);
//     const lastMonthDoc = db.collection(lastMonthYear).doc(lastMonth);
//     const lastYearDoc = db.collection(lastYear).doc(month);

//     const monthValue: number = (await monthDoc.get()).data()!.value;
//     const lastMonthValue: number = (await lastMonthDoc.get()).data()!.value;
//     const lastYearValue: number = await (await lastYearDoc.get()).data()!.value;

//     const lastMonthGrowth = percentage(monthValue, lastMonthValue);
//     const lastYearGrowth = percentage(monthValue, lastYearValue);

//     const monthRow = [monthValue, lastMonthValue, lastYearValue];
//     const monthGrowth = ["Crescimento", lastMonthGrowth, lastYearGrowth];

//     return {
//       monthRow: monthRow,
//       monthGrowth: monthGrowth,
//     };
//   } catch (error) {
//     console.log("Erro no acesso ao banco");
//     console.error(error);
//   }
// }

export async function addFaturamentoMonth(
  year: string,
  month: string,
  value: number
) {
  await setDoc(doc(db, year, month), { value: value });
}
