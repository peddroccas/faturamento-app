import { doc, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { camelCase } from 'lodash'

export function capitalizeFirstLetters(string: string) {
  return string
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const lojas = ['São Rafael', 'Estrela', 'Antunes', 'São Rafael 2']
export const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]
export const years = [
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
]

// Faturamento

function percentage(reference: number, compared: number) {
  const percentage = ((reference - compared) / reference) * 100
  // console.log(percentage)

  return Number(percentage.toFixed(2))
}

async function getValues(
  lojaUnformatted: string,
  year: string = '',
  month: string = '',
) {
  const loja = camelCase(lojaUnformatted.toLowerCase())
  const databaseRef = db.ref(`${loja}/${year}/${month}`)
  const snapShot = await databaseRef.once('value')
  const data = snapShot.val()
  return data
}

export async function getLastMonthFilled(
  lojaUnformatted: string,
): Promise<number> {
  try {
    const yearData = await getValues(lojaUnformatted, '2024')
    let lastMonth = 0
    for (const month in yearData) {
      if (months.indexOf(month) > lastMonth) {
        lastMonth = months.indexOf(month)
      }
    }

    return lastMonth
  } catch (error) {
    console.error('Erro ao ler mês não preenchido')
    return 11
  }
}

export async function setNewFaturamentoMonth(
  value: number,
  month: string,
  year: string,
) {
  await db.collection(year).doc(month).set({ value })
}

function getLastSixMonths(month: string, monthYear: string) {
  const indexMonth = months.indexOf(month)
  const lastSixMonths = []

  for (let i = 0; i < 6; i++) {
    const monthIndex = (indexMonth - i + 12) % 12
    if ((indexMonth - i + 12) / 12 < 1) {
      lastSixMonths.push({
        month: months[monthIndex],
        year: String(Number(monthYear) - 1),
      })
    } else {
      lastSixMonths.push({ month: months[monthIndex], year: String(monthYear) })
    }
  }

  return lastSixMonths
}

export async function getYearsValues(
  lojaUnformatted: string,
  month: string,
): Promise<
  | {
      values: number[]
      growth: (string | number)[]
      dates: string[]
    }
  | undefined
> {
  try {
    const yearsValues: number[] = []
    const yearsGrowth: (number | string)[] = []
    const dates: string[] = []

    for (const year of years) {
      const monthValue = await getValues(lojaUnformatted, year, month)
      const monthGrowth = percentage(
        monthValue,
        yearsValues[yearsValues.length - 1],
      )
      yearsValues.push(monthValue)
      yearsGrowth.push(monthGrowth)

      dates.push(capitalizeFirstLetters(`${month}/${year}`))
    }
    yearsGrowth.shift()
    yearsGrowth.unshift('Sem valor de referência')

    return {
      dates,
      values: yearsValues,
      growth: yearsGrowth,
    }
  } catch (error) {
    console.log('Erro no acesso ao banco')
    console.error(error)
  }
}

export async function getMonthsValues(
  lojaUnformatted: string,
  month: string,
  year: string,
) {
  try {
    const lastSixMonths = getLastSixMonths(month, year).reverse()

    const monthsValues: number[] = []
    const monthsGrowth: (number | string)[] = []
    const dates: string[] = []

    for (const month of lastSixMonths) {
      const monthValue = await getValues(
        lojaUnformatted,
        month.year,
        month.month,
      )
      const monthGrowth = percentage(
        monthValue,
        monthsValues[monthsValues.length - 1],
      )
      monthsValues.push(monthValue)
      monthsGrowth.push(monthGrowth)

      dates.push(capitalizeFirstLetters(`${month.month}/${month.year}`))
    }
    monthsGrowth.shift()
    monthsGrowth.unshift('Sem valor de referência')

    return {
      dates,
      values: monthsValues,
      growth: monthsGrowth,
    }
  } catch (error) {
    console.log('Erro no acesso ao banco')
    console.error(error)
  }
}

export function getPreviousSixMonths(
  month: string,
  year: string,
): [string, string][] {
  const monthIndex = months.indexOf(month)

  const result: [string, string][] = []

  for (let i = 1; i <= 3; i++) {
    let prevMonthIndex = monthIndex - i
    let prevYear = year

    if (prevMonthIndex < 0) {
      prevMonthIndex += 12
      prevYear = (parseInt(year, 10) - 1).toString()
    }

    result.push([months[prevMonthIndex], prevYear])
  }

  return result
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
  value: number,
) {
  await setDoc(doc(db, year, month), { value })
}
