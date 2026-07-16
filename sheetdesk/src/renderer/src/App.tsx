import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGear } from "react-icons/fa6";

// Importando as páginas
import DashboardPage from "./presentation/pages/DashboardPage";
import ExperimentalSheet from "./presentation/pages/ExperimentalSheet";

// Importando estilos
import "./index.css"
import { alunoController, usuarioController } from "./shared/container";


function App(): React.JSX.Element {

  const [isLogged, setLogin] = useState(false)

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [screenSelected, setScreenSelected] = React.useState("dashboard");

  const fetchAlunos = async (modalidade: string) => {
    const data = await alunoController.lerDados(modalidade == "All" ? "" : modalidade);
    return data;
  }

  const verifAuth = async () => {
    usuarioController.authUser().then((value) => {
      return value ? setLogin(true) : setLogin(false)
    })
  }

  const [alunosDados, setAlunosDados] = useState<any[]>([]);
  const [selectedModalidade, setSelectedModalidade] = useState<string>("");
  useEffect(() => {

    if (!isLogged) return
    fetchAlunos(selectedModalidade).then((data) => {
      setAlunosDados(data || []);
    });
    const alunos = setInterval(async () => {
      (await fetchAlunos(selectedModalidade) || []);
    }, 30000); // Atualiza a cada 1 minutos

    return () => clearInterval(alunos);
  }, [selectedModalidade, isLogged]);

  useEffect(() => {
    usuarioController.authUser().then((value) => {
      return value ? setLogin(true) : setLogin(false)
    })
  }, [])

  useEffect(() => {
    if (!isLogged) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [isLogged]);

  const handleScreenSelect = (screen: string) => {
    setScreenSelected(screen);
  }

  var [formLogin, setFormLogin] = useState({
    email: "",
    senha: ""
  })

  var onLogin = async () => {
    await usuarioController.LoginUser(formLogin.email, formLogin.senha)

    setLogin(true)
  }

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-start relative overflow-hidden bg-white">
        {
          
          !isLogged ?
            <section className="fixed inset-0 scale-110 rounded-xl bg-tranparent z-30 ">
              <div className="w-full h-full blur-3xl opacity-50  bg-black" />
              <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
                <div className={`bg-gray-200 p-6 rounded-lg shadow-lg w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out`}>
                  <div className="flex justify-center items-center mb-4">
                    <h2 className="text-3xl text-center font-bold">Login</h2>
                  </div>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input type="text" value={formLogin.email} onChange={(e) => {setFormLogin({...formLogin, email: e.target.value})}} id="email" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                        Senha
                      </label>
                      <input type="text" value={formLogin.senha} onChange={(e) => {setFormLogin({...formLogin, senha: e.target.value})}} id="senha" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="button" onClick={() => onLogin()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mx-auto px-4 rounded">
                      Entrar
                    </button>
                  </form>
                </div>
              </div>
            </section> :
            <div></div>
        }
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
            {/* <button className="text-gray-300 hover:bg-gray-600 w-full h-12" onClick={() => handleScreenSelect("settings")}>
              Settings
            </button>*/ }
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
          {screenSelected === "dashboard" && <DashboardPage alunosDados={alunosDados} />}
          {screenSelected === "spreadsheets" && <ExperimentalSheet
            fetchAlunos={fetchAlunos}
            alunosDados={alunosDados}
            setAlunosDados={setAlunosDados}
            selectedModalidade={selectedModalidade}
            setSelectedModalidade={setSelectedModalidade} />}
        </div>
      </main>
    </>
  )
}

export default App
