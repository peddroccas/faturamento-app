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
  [key: string]: number // month: value
}

export interface Data {
  [key: string]: MonthlyData // year: month: value
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

  /**
  @returns Lista de objetos com os dados separados por anos e por meses */
  static async getStoreFaturamento(
    lojaUnformatted: string,
  ): Promise<Data | undefined> {
    try {
      const yearsValues: Data = {}

      for (const year of years) {
        const monthValue: MonthlyData = await this.getValues(
          lojaUnformatted,
          year,
        )
        if (monthValue) {
          yearsValues[year] = monthValue
        }
      }

      return yearsValues
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

  static getStoreDailyFaturamento(data: Data | undefined): Data | undefined {
    try {
      const dailyValues: Data | undefined = {}

      for (const year in data) {
        const yearsValues: MonthlyData = {}
        for (const month of months) {
          if (data[year][month]) {
            yearsValues[month] =
              data[year][month] / this.daysPerMonth(month, year)!
          }
        }
        dailyValues[year] = yearsValues
      }

      return dailyValues
      // growth: yearsGrowth,
    } catch (error) {
      console.log('Erro ao construir faturamento diário')
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

  static async getStorePerda(lojaUnformatted: string) {
    try {
      const yearsValues: Data = {}

      for (const year of years) {
        const monthValue: MonthlyData = await this.getValues(
          lojaUnformatted,
          year,
        )

        if (monthValue) {
          yearsValues[year] = monthValue
        }
      }

      return yearsValues
    } catch (error) {
      console.log('Erro no acesso ao banco')
      console.error(error)
    }
  }
}
