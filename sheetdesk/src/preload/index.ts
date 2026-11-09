import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Aluno } from '../shared/Aluno'

declare global {
  interface Window {
    electron: typeof electronAPI
    api: {
      openExcel: () => Promise<string | null>
      readDB: (modalidade: string) => Promise<Aluno[]>
      addDB: (filePath: string, aluno: Aluno) => Promise<void>
      editDB: (aluno: Aluno) => Promise<void>
    }
  }
}

// Custom APIs for renderer
const api = {
  openExcel: (): Promise<string | null> => ipcRenderer.invoke("open-excel"),
  readDB: (modalidade: string = "All"): Promise<Aluno[]> => ipcRenderer.invoke("read-aluno", modalidade),
  addDB: (filePath: string, aluno: Aluno): Promise<void> => ipcRenderer.invoke("add-aluno", filePath, aluno),
  editDB: (aluno: Aluno): Promise<void> => ipcRenderer.invoke("edit-aluno", aluno)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
