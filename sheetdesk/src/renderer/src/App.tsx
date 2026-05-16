import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

// Importando as páginas
import DashboardPage from "./pages/DashboardPage";
import ExperimentalSheet from "./pages/ExperimentalSheet";
import Configuration from "./pages/Configuration";

// Importando estilos
import "./index.css"


function App(): React.JSX.Element {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const excelFilePath = localStorage.getItem("excelFilePath");
  const [screenSelected, setScreenSelected] = React.useState("dashboard");


  useEffect(() => {
    if (excelFilePath) {
      console.log("Excel file path from localStorage:", excelFilePath);
    }
  }, [excelFilePath]);
  
  

  const handleScreenSelect = (screen: string) => {
    setScreenSelected(screen);
  }

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-start relative bg-white">
          <header className="top-0 left-0 w-full p-4 border-b border-gray-300 flex items-center gap-4">
            <button className="p-1 rounded-md hover:bg-gray-200 hover:size-7 hover:text-size-5 z-20" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <GiHamburgerMenu className="text-black size-5" />
            </button>
            <h1 className="text-xl font-bold text-black"> SheetDesk</h1>
          </header>
          <nav className={`flex absolute w-70 top-0 left-0 h-screen z-10 pt-16 px-5 bg-gray-800 flex-col items-center gap-4 border-r-2 rounded-r-md border-gray-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform translate-x-[-100%]'} transition-transform duration-300`}>
            <h2 className="text-2xl font-bold text-gray-500">Welcome to SheetDesk</h2>
            <p className="text-gray-600">Your spreadsheet management tool</p>
            <div className="flex flex-col items-start gap-3 mt-4 w-full">
              <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("dashboard")}>
                Dashboard
              </button>
              <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("spreadsheets")}>
                Spreadsheets
              </button>
              <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("settings")}>
                Settings
              </button>
            </div>
          </nav>
          <div className="flex-1 h-full w-full p-8">
            {screenSelected === "dashboard" && <DashboardPage />}
            {screenSelected === "spreadsheets" && <ExperimentalSheet />}
            {screenSelected === "settings" && <Configuration />}
          </div>
      </main>           
    </>
  )
}

export default App
