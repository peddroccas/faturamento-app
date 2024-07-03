import { db } from '../services/firebase'
import { camelCase } from 'lodash'

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

export interface MonthlyData {
  [key: string]: number | string // month: value
}

export interface Data {
  values: MonthlyData[] | undefined
  yearsAvailable: (string | number)[]
}

export function capitalizeFirstLetters(string: string) {
  return string
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

// Faturamento
export class FaturamentoClass {
  static percentage(reference: number, compared: number) {
    const percentage = ((reference - compared) / reference) * 100
    // console.log(percentage)

    return Number(percentage.toFixed(2))
  }

  static async getValues(
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

  static async setValues(
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

  static async getLastMonthFilled(lojaUnformatted: string): Promise<number> {
    try {
      const yearData = await this.getValues(lojaUnformatted, '2024')
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

  static async setFaturamentoMonth(
    value: number,
    lojaUnformatted: string,
    month: string,
    year: string,
  ) {
    try {
      await this.setValues(value, lojaUnformatted, year, month)
    } catch (error) {
      console.log(error)
    }
  }

  static getLastMonths(month: string, monthYear: string, last: number) {
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

  /**
  @returns Lista de objetos com os dados separados por anos e por meses */
  static async getStoreFaturamento(
    lojaUnformatted: string,
  ): Promise<Data | undefined> {
    try {
      const yearsValues: MonthlyData[] = []
      const yearsAvailable = []
      // const yearsGrowth: (number | string)[] = []

      for (const year of years) {
        const monthValue: MonthlyData = await this.getValues(
          lojaUnformatted,
          year,
        )
        // const monthGrowth = this.percentage(
        //   monthValue,
        //   yearsValues[yearsValues.length - 1],
        // )
        if (monthValue) {
          yearsValues.push(monthValue)
          yearsAvailable.push(year)
          // yearsGrowth.push(monthGrowth)
        }
      }
      // yearsGrowth.shift()
      // yearsGrowth.unshift('Sem valor de referência')

      return {
        values: yearsValues,
        yearsAvailable,
        // growth: yearsGrowth,
      }
    } catch (error) {
      console.log('Erro no acesso ao banco')
      console.error(error)
    }
  }

  static async getYearsValues(
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
        const monthValue: number = await this.getValues(
          lojaUnformatted,
          year,
          month,
        )
        const monthGrowth = this.percentage(
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

  static async getMonthsValues(
    lojaUnformatted: string,
    month: string,
    year: string,
  ) {
    try {
      const lastSixMonths = this.getLastMonths(month, year, 6).reverse()

      const monthsValues: number[] = []
      const monthsGrowth: (number | string)[] = []
      const dates: string[] = []

      for (const month of lastSixMonths) {
        const monthValue = await this.getValues(
          lojaUnformatted,
          month.year,
          month.month,
        )
        const monthGrowth = this.percentage(
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

  // Valor Médio

  static daysPerMonth(month: string, year: string) {
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

  static async getMonthsDailyValueValues(
    lojaUnformatted: string,
    month: string,
    year: string,
  ) {
    try {
      const lastSixMonths = this.getLastMonths(month, year, 6).reverse()

      const monthsDailyValueValues: number[] = []
      const monthsDailyValueGrowth: (number | string)[] = []
      const dates: string[] = []

      for (const month of lastSixMonths) {
        const monthValue = await this.getValues(
          lojaUnformatted,
          month.year,
          month.month,
        )
        const monthDailyValueValue =
          monthValue / this.daysPerMonth(month.month, month.year)!
        const monthDailyValueGrowth = this.percentage(
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

  static async getYearsDailyValueValues(
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
        const monthValue: number = await this.getValues(
          lojaUnformatted,
          year,
          month,
        )
        const monthDailyValueValue: number =
          monthValue / this.daysPerMonth(month, year)!
        const monthDailyValueGrowth = this.percentage(
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
}

// Perdas
export class PerdasClass {
  // static percentage(reference: number, compared: number) {
  //   const percentage = ((reference - compared) / reference) * 100
  //   // console.log(percentage)

  //   return Number(percentage.toFixed(2))
  // }

  static async getValues(
    lojaUnformatted: string,
    year: string = '',
    month: string = '',
  ) {
    try {
      const loja = camelCase(lojaUnformatted.toLowerCase())
      const databaseRef = db.ref(`${loja}/perdas/${year}/${month}`)
      const snapShot = await databaseRef.once('value')
      const data = snapShot.val()
      // console.log(data)
      if (data) {
        return data
      }
    } catch (error) {}
  }

  static async setValues(
    value: number,
    lojaUnformatted: string,
    year: string,
    month: string,
  ) {
    try {
      const loja = camelCase(lojaUnformatted.toLowerCase())
      const databaseRef = db.ref(`${loja}/perdas/${year}/${month}`)
      await databaseRef.set(value, (error) => {
        if (error) {
          console.error('Erro ao adicionar ao banco de dados: ', error)
        } else {
          console.log('Dados adicionados com sucesso!')
        }
      })
    } catch (error) {}
  }

  static async getLastMonthFilled(lojaUnformatted: string): Promise<number> {
    try {
      const yearData = await this.getValues(lojaUnformatted, '2024')
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

  static async setPerdaMonth(
    value: number,
    lojaUnformatted: string,
    month: string,
    year: string,
  ) {
    try {
      await this.setValues(value, lojaUnformatted, year, month)
    } catch (error) {
      console.log(error)
    }
  }

  static getLastMonths(month: string, monthYear: string, last: number) {
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

  static async getYearsValues(
    lojaUnformatted: string,
    month: string,
  ): Promise<
    | {
        values: number[]
        dates: string[]
      }
    | undefined
  > {
    try {
      const yearsValues: number[] = []

      const dates: string[] = []

      for (const year of years) {
        const monthValue: number = await this.getValues(
          lojaUnformatted,
          year,
          month,
        )

        if (monthValue) {
          yearsValues.push(monthValue)

          dates.push(capitalizeFirstLetters(`${month}/${year}`))
        }
      }

      return {
        dates,
        values: yearsValues,
      }
    } catch (error) {
      console.log('Erro no acesso ao banco')
      console.error(error)
    }
  }

  static async getMonthsValues(
    lojaUnformatted: string,
    month: string,
    year: string,
  ) {
    try {
      const lastSixMonths = this.getLastMonths(month, year, 6).reverse()

      const monthsValues: number[] = []

      const dates: string[] = []

      for (const month of lastSixMonths) {
        const monthValue = await this.getValues(
          lojaUnformatted,
          month.year,
          month.month,
        )

        if (monthValue) {
          monthsValues.push(monthValue)

          dates.push(capitalizeFirstLetters(`${month.month}/${month.year}`))
        }
      }

      return {
        dates,
        values: monthsValues,
      }
    } catch (error) {
      console.log('Erro no acesso ao banco')
      console.error(error)
    }
  }
}
