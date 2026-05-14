import { ipcMain, dialog } from "electron";
import * as xlsx from "xlsx";

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
        const workbook = xlsx.readFile(filePath);
        console.log(`Workbook loaded: ${workbook.SheetNames.length} sheets found.`);
        for (const sheetName of workbook.SheetNames) {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(`Data from sheet "${sheetName}":`, jsonData);
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    });