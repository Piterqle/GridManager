import { ElectronAPI } from '@electron-toolkit/preload'
import Aluno from '../renderer/src/domain/entidades/alunoClass'

declare global {
  interface Window {
    electron: ElectronAPI 
    api: {
      openExcel: () => Promise<string[]>,
      readDB: (modalidade: string) => Promise<Aluno[]>
      addDB: (filePath: string, Aluno: Aluno) => Promise<void>
      editDB: (Aluno: Aluno) => Promise<void>
    }
  }
}
