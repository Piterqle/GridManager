import { ElectronAPI } from '@electron-toolkit/preload'
import Aluno from '../main/models/alunoClass'

declare global {
  interface Window {
    electron: ElectronAPI 
    api: {
      openExcel: () => Promise<string[]>,
      readExcel: (filePath: string) => Promise<Aluno[]>
    }
  }
}
