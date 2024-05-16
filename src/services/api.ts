import { firestore } from "../services/firebase";
import { useState } from "react";


// Faturamento
interface Row {
    month: string;
    value: number,
    lastYear: number,
    lastMonth: number
};

const months = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
const rows: Row[] = [];


const db = firestore;

async function getValueMonthByYear(year: string, months) {
    try {
        const yearRows: Row[] = [];
        for (const mes of months) {
            const monthDoc = db.collection(year).doc(mes)
            const monthData = await monthDoc.get()


            if (monthData.exists) {
                // Extrair dados de cada documento
                const data = monthData.data() as Row
                const month = mes; // Supondo que 'month' é um campo no documento
                const value = data.value; // Supondo que 'value' é um campo no documento
                const lastYear = data.lastYear; // Supondo que 'lastYear' é um campo no documento
                const lastMonth = data.lastMonth; // Supondo que 'lastMonth' é um campo no documento

                // Criar objeto Row com os dados extraídos
                const row: Row = { month, value, lastYear, lastMonth };
                yearRows.push(row);
            }
        }
        return yearRows;
    }
    catch (error) {
        console.error(error)
    }
}

export const yearData = await getValueMonthByYear('2023', months)

async function getYear(year: string) {
    const yearDoc = await db.collection(year)
}


async function readData(year, month) {
    const data = (await firestore.collection(year).doc(month).get()).data()
    return data.value
}

function load_Data(year: '2023', months: string[]) {
    months.forEach(async (month: string) => {
        const data = await readData(year, month)
        rows.push({ month: month, value: data, lastYear: 0, lastMonth: 0 })
    })
}