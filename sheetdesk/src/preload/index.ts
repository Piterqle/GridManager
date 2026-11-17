import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Aluno } from "../renderer/src/shared/Aluno"

declare global {
  interface Window {
    electron: typeof electronAPI
    api: {
      readDB: (modalidade: string) => Promise<Aluno[]>
      addDB: (Aluno: Aluno) => Promise<void>
      editDB: (Aluno: Aluno) => Promise<void>
    }
  }
}

// Custom APIs for renderer
const api = {
  readDB: (modalidade: string = "All"): Promise<Aluno[]> => ipcRenderer.invoke("read-aluno", modalidade),
  addDB: (Aluno: Aluno): Promise<void> => ipcRenderer.invoke("add-aluno", Aluno),
  editDB: (Aluno: Aluno): Promise<void> => ipcRenderer.invoke("edit-aluno", Aluno)
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
