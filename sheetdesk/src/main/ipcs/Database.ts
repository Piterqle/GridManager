import { ipcMain, dialog } from "electron";
import * as xlsx from "xlsx";
import Aluno from "../../renderer/src/domain/entidades/alunoClass"
import { FirebaseService } from "../services/Firebase"



const Firebase = new FirebaseService
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

ipcMain.handle("add-aluno", async (_, filePath: string, Aluno: Aluno) => {
  try {
  
    await Firebase.addAluno(Aluno)

  } catch (e) {
    console.log("Error to add Aluno" + e)
    return;
  }
})

ipcMain.handle("read-aluno", async (_, filePath: string, tipoReturn: string, modalidade: string = "") => {
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

    }
    const res =  await Firebase.readAluno(modalidade);
    
    for(var index in res){
      console.log(res[index].data)

      alunos.push(new Aluno(res[index].data.Nome, 
        res[index].data.Modalidade, 
        formatDate(res[index].data.DataDaProcura), 
        formatDate(res[index].data.DataDaExperiencia), 
        res[index].data.Semana, 
        res[index].data.Horario, 
        res[index].data.Contato, 
        res[index].data.Status))
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
  console.log(date)
  const [YYYY, MM, dd] = date.split("-")

  const foramtedDate = `${dd}/${MM}/${YYYY}`
  return foramtedDate
}
