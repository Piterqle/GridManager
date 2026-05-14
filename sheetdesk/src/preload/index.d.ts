import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI 
    api: {
      openExcel: () => Promise<string[]>,
      readExcel: (filePath: string) => Promise<void>
    }
  }
}
