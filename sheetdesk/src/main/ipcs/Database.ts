import { ipcMain, dialog } from "electron";
import * as xlsx from "xlsx";
import Aluno from "../../renderer/src/domain/entities/alunoClass"
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

ipcMain.handle("read-aluno", async (_, modalidade: string = "") => {
  try {
    const alunos: Aluno[] = [];
    
    const res =  await Firebase.readAluno(modalidade);
    
    for(var index in res){

      alunos.push(new Aluno(res[index].id.toString(),
        res[index].data.Nome, 
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

ipcMain.handle("edit-aluno", async (_, Aluno: Aluno) => {
  try {
      await Firebase.editAluno(Aluno)
  } catch (e) {
    console.log("Error to edit Aluno" + e)
    return;
  }

})

const formatDate = (date: string) => {
  const [YYYY, MM, dd] = date.split("-")

  const foramtedDate = `${dd}/${MM}/${YYYY}`
  return foramtedDate
}
