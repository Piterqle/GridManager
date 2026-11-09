import { ElectronAPI } from '@electron-toolkit/preload'
import { Aluno } from '../shared/Aluno'

declare global {
  interface Window {
    electron: ElectronAPI 
    api: {
      readDB: (modalidade: string) => Promise<Aluno[]>
      addDB: (Aluno: Aluno) => Promise<void>
      editDB: (Aluno: Aluno) => Promise<void>
    }
  }
}
