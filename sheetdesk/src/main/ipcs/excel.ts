import { ipcMain, dialog } from "electron";

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