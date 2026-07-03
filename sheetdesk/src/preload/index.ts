import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import Aluno from '../renderer/src/domain/entidades/alunoClass'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
        openExcel: () => {
          return ipcRenderer.invoke("open-excel")
        },
        readDB: (modalidade: string = "All") => {
          return ipcRenderer.invoke("read-aluno", modalidade)
        },
        addDB: (filePath: string, Aluno: Aluno) => {
          return ipcRenderer.invoke("add-aluno", filePath, Aluno)
        },
        editDB: (Aluno: Aluno) => {
          return ipcRenderer.invoke("edit-aluno", Aluno)
        }
      })

  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
