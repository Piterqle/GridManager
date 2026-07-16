import { autoUpdater } from "electron-updater";

export function updater() {

    autoUpdater.on("checking-for-update", () => {
        console.log("Verificando...");
    });

    autoUpdater.on("update-available", () => {
        console.log("Atualização encontrada");
    });

    autoUpdater.on("update-not-available", () => {
        console.log("Sem atualização");
    });

    autoUpdater.on("download-progress", (progress) => {
        console.log(progress.percent);
    });

    autoUpdater.on("update-downloaded", () => {
        autoUpdater.quitAndInstall();
    });

    autoUpdater.checkForUpdates();

}