import { ipcMain, dialog } from "electron";
import * as xlsx from "xlsx";
import Aluno from "../../renderer/src/domain/entidades/alunoClass"
import { json } from "stream/consumers";
import ExcelJs from "exceljs"

ipcMain.handle("open-excel", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      {
        name: "Excel",
        extensions: ["xlsx", "xls"],
      },
    ],
  });

  return result.filePaths[0] || null;
});

ipcMain.handle("add-excel", async (_, filePath: string, Aluno: Aluno) => {
  try{
    const wb = new ExcelJs.Workbook();
    await wb.xlsx.readFile(filePath)

    const ws = wb.getWorksheet(Aluno.modalidade.toUpperCase())

    if (ws) {
      ws.addRow([
        Aluno.nome,
        formatDate(Aluno.data_procura),
        formatDate(Aluno.data_experiencia),
        Aluno.semana.toUpperCase(),
        Aluno.horario, 
        Aluno.contato,
        Aluno.status,
      ])
    }
    await wb.xlsx.writeFile(filePath)
    
  } catch (e) {
    console.log("Error to add Aluno" + e)
    return;
  }
})

ipcMain.handle("read-excel", async (_, filePath: string, tipoReturn: string, modalidade: string = "All") => {
  try {
    const cabecalhoEsperado = ["Nome", "Data da Procura", "Data de Experiência", "Semana", "Horário", "Contato", "Status"];
    const workbook = xlsx.readFile(filePath);
    const alunos: Aluno[] = [];
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });


      if (tipoReturn === "Sheet") {
        return workbook.SheetNames;
      }

      if (modalidade !== "All" && sheetName !== modalidade) {
        continue;
      }
      if (!jsonData || JSON.stringify(jsonData[0]) !== JSON.stringify(cabecalhoEsperado)) {
        continue;
      }



      alunos.push(...jsonData.slice(1).map((row: any[]) =>
        new Aluno(
          row[0] || "",
          sheetName || "",
          transformExcelDate(row[1]) == "Invalid Date" ? row[1] : transformExcelDate(row[1]) || "",
          transformExcelDate(row[2]) == "Invalid Date" ? row[2] : transformExcelDate(row[2]) || "",
          row[3] || "",
          transformHours(row[4]) == "NaN:NaN" ? row[4] : transformHours(row[4]) || "--:--",
          row[5] || "",
          row[6] || ""
        )));
    }
    return alunos;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
});


function transformExcelDate(excelDate: number): string {
  try {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    return date.toLocaleDateString("pt-BR");

  } catch (error) {
    console.error("Error transforming Excel date:", error);
    return "Invalid Date";
  }
}


const formatDate = (date: string) => {
    const [YYYY, MM, dd] = date.split("-")
    
    const foramtedDate = `${dd}/${MM}/${YYYY}`
    return foramtedDate
}

function transformHours(hours: number): string {

  const totalMinutes = Math.round(hours * 24 * 60);
  const hoursInt = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hoursInt).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}