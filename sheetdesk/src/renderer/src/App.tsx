import React, { useEffect } from "react";
import "reflect-metadata";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGear } from "react-icons/fa6";

// Importando as páginas
import DashboardPage from "./presentation/pages/DashboardPage";
import ExperimentalSheet from "./presentation/pages/ExperimentalSheet";
import Configuration from "./presentation/pages/Configuration";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, []);

  const handleScreenSelect = (screen: string) => {
    setScreenSelected(screen);
  }

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-start relative overflow-hidden bg-white">
        <header className="top-0 left-0 w-full p-4 border-b border-gray-300 flex items-center gap-4">
          <button className="p-1 rounded-md hover:bg-gray-200 hover:size-7 hover:text-size-5 z-20" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <GiHamburgerMenu className="text-black size-5" />
          </button>
          <h1 className="text-xl font-bold text-black"> SheetDesk</h1>
        </header>
        <nav className={`flex absolute w-70 top-0 left-0 h-full z-10 pt-16 bg-gradient-to-b from-slate-700 to-gray-900 flex-col items-center gap-4 border-r-2 rounded-r-md border-gray-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform translate-x-[-100%]'} transition-transform duration-300`}>
          <h2 className="text-2xl font-bold mx-4 text-gray-500">Bem-vindo ao SheetDesk</h2>
          <p className="text-gray-600 mx-4">Seu ferramenta de gestão de planilhas</p>
          <div className="flex flex-col items-start gap-3 mt-4 px-5 w-full">
            <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("dashboard")}>
              Dashboard
            </button>
            <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("spreadsheets")}>
              Tabela Experimental
            </button>
            <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("settings")}>
              Settings
            </button>
          </div>
          <div className="flex flex-row text-center items-center border-t border-gray-600 gap-3 mt-auto h-20 w-full">
            <div className="w-10 h-10 ml-4 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
            </div>
            <div className="flex flex-col items-start mx-2">
              <h2 className="text-gray-300 text-lg font-semibold text-ellipsis">Pedro Henrique</h2>
              <p className="text-gray-500 text-sm text-ellipsis">pedro.henrique@example.com</p>
            </div>
            <FaGear className="text-gray-500 size-5 ml-auto mr-4 hover:text-gray-300 cursor-pointer duration-300 hover:transform hover:rotate-90" />
          </div>
        </nav>
        <div className="flex w-full h-full px-8">
          {screenSelected === "dashboard" && <DashboardPage />}
          {screenSelected === "spreadsheets" && <ExperimentalSheet />}
          {screenSelected === "settings" && <Configuration />}
        </div>
      </main>
    </>
  )
}

export default App
