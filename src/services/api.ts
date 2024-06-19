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

export const stores = ['São Rafael', 'Estrela', 'Antunes', 'São Rafael 2']
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

export async function getValues(
  lojaUnformatted: string,
  year: string = '',
  month: string = '',
) {
  try {
    const loja = camelCase(lojaUnformatted.toLowerCase())
    const databaseRef = db.ref(`${loja}/faturamento/${year}/${month}`)
    const snapShot = await databaseRef.once('value')
    const data = snapShot.val()
    // console.log(data)
    if (data) {
      return data
    }
  } catch (error) {}
}

export async function setValues(
  value: number,
  lojaUnformatted: string,
  year: string,
  month: string,
) {
  try {
    const loja = camelCase(lojaUnformatted.toLowerCase())
    const databaseRef = db.ref(`${loja}/faturamento/${year}/${month}`)
    await databaseRef.set(value, (error) => {
      if (error) {
        console.error('Erro ao adicionar ao banco de dados: ', error)
      } else {
        console.log('Dados adicionados com sucesso!')
      }
    })
  } catch (error) {}
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

export async function setFaturamentoMonth(
  value: number,
  lojaUnformatted: string,
  month: string,
  year: string,
) {
  try {
    await setValues(value, lojaUnformatted, year, month)
  } catch (error) {
    console.log(error)
  }
}

function getLastMonths(month: string, monthYear: string, last: number) {
  const indexMonth = months.indexOf(month)
  const lastMonths = []

  for (let i = 0; i < last; i++) {
    const monthIndex = (indexMonth - i + 12) % 12
    if ((indexMonth - i + 12) / 12 < 1) {
      lastMonths.push({
        month: months[monthIndex],
        year: String(Number(monthYear) - 1),
      })
    } else {
      lastMonths.push({ month: months[monthIndex], year: String(monthYear) })
    }
  }

  return lastMonths
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
      const monthValue: number = await getValues(lojaUnformatted, year, month)
      const monthGrowth = percentage(
        monthValue,
        yearsValues[yearsValues.length - 1],
      )
      if (monthValue) {
        yearsValues.push(monthValue)
        yearsGrowth.push(monthGrowth)
        dates.push(capitalizeFirstLetters(`${month}/${year}`))
      }
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
    const lastSixMonths = getLastMonths(month, year, 6).reverse()

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

      if (monthValue) {
        monthsValues.push(monthValue)
        monthsGrowth.push(monthGrowth)

        dates.push(capitalizeFirstLetters(`${month.month}/${month.year}`))
      }
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

// Ticket Médio

export function daysPerMonth(month: string, year: string) {
  switch (month) {
    case 'janeiro':
      return 31
    case 'fevereiro':
      if (Number(year) % 4 === 0) {
        return 29
      } else {
        return 28
      }
    case 'março':
      return 31
    case 'abril':
      return 30
    case 'maio':
      return 31
    case 'junho':
      return 30
    case 'julho':
      return 31
    case 'agosto':
      return 31
    case 'setembro':
      return 30
    case 'outubro':
      return 31
    case 'novembro':
      return 30
    case 'dezembro':
      return 31
  }
}

export async function getMonthsDailyValueValues(
  lojaUnformatted: string,
  month: string,
  year: string,
) {
  try {
    const lastSixMonths = getLastMonths(month, year, 6).reverse()

    const monthsDailyValueValues: number[] = []
    const monthsDailyValueGrowth: (number | string)[] = []
    const dates: string[] = []

    for (const month of lastSixMonths) {
      const monthValue = await getValues(
        lojaUnformatted,
        month.year,
        month.month,
      )
      const monthDailyValueValue =
        monthValue / daysPerMonth(month.month, month.year)!
      const monthDailyValueGrowth = percentage(
        monthDailyValueValue,
        monthsDailyValueValues[monthsDailyValueValues.length - 1],
      )

      if (monthDailyValueValue) {
        monthsDailyValueValues.push(monthDailyValueValue)
        monthsDailyValueGrowth.push(monthDailyValueGrowth)

        dates.push(capitalizeFirstLetters(`${month.month}/${month.year}`))
      }
    }
    monthsDailyValueGrowth.shift()
    monthsDailyValueGrowth.unshift('Sem valor de referência')

    return {
      dates,
      values: monthsDailyValueValues,
      growth: monthsDailyValueGrowth,
    }
  } catch (error) {
    console.log('Erro no acesso ao banco')
    console.error(error)
  }
}

export async function getYearsDailyValueValues(
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
    const yearsDailyValueValues: number[] = []
    const yearsDailyValueGrowth: (number | string)[] = []
    const dates: string[] = []

    for (const year of years) {
      const monthValue: number = await getValues(lojaUnformatted, year, month)
      const monthDailyValueValue: number =
        monthValue / daysPerMonth(month, year)!
      const monthDailyValueGrowth = percentage(
        monthDailyValueValue,
        yearsDailyValueValues[yearsDailyValueValues.length - 1],
      )
      if (monthDailyValueValue) {
        yearsDailyValueValues.push(monthDailyValueValue)
        yearsDailyValueGrowth.push(monthDailyValueGrowth)
        dates.push(capitalizeFirstLetters(`${month}/${year}`))
      }
    }
    yearsDailyValueGrowth.shift()
    yearsDailyValueGrowth.unshift('Sem valor de referência')

    return {
      dates,
      values: yearsDailyValueValues,
      growth: yearsDailyValueGrowth,
    }
  } catch (error) {
    console.log('Erro no acesso ao banco')
    console.error(error)
  }
}
