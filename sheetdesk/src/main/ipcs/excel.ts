import { ipcMain, dialog } from "electron";
import * as xlsx from "xlsx";
import Aluno  from "../models/alunoClass"

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

ipcMain.handle("read-excel", async (_, filePath: string) => {
    try {
        const cabecalhoEsperado = ["Nome", "Data da Procura", "Data de Experiência", "Semana", "Horário", "Contato", "Status"];
        const workbook = xlsx.readFile(filePath);
        console.log(`Workbook loaded: ${workbook.SheetNames.length} sheets found.`);
        const alunos: Aluno[] = [];
        for (const sheetName of workbook.SheetNames) {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
           
            
            if (!jsonData || JSON.stringify(jsonData[0]) !== JSON.stringify(cabecalhoEsperado)) {
                console.warn(`Sheet "${sheetName}" skipped: header does not match expected format.`);
                continue;
            }
            
          
            alunos.push(...jsonData.slice(1).map((row: any[]) => ({
                nome: row[0] || "",
                modalidade: sheetName || "",
                data_procura: row[1] || "",
                data_inicio: row[2] || "",
                semana: row[3] || "",
                horario: row[4] || "",
                contato: row[5] || "",
                status: row[6] || ""
            })));
          }
          return alunos;
      } catch (error) {
        console.error("Error reading Excel file:", error);
        return [];
      }
    });