import { GiHamburgerMenu } from "react-icons/gi";
function App(): React.JSX.Element {


  return (
    <>
      <main className="flex h-screen w-screen items-center justify-start relative bg-white">
          <nav className="absolute top-0 left-0 w-full p-4 border-b border-gray-300 flex items-center gap-4">
            <button className="p-1 rounded-md hover:bg-gray-200 hover:size-7 hover:text-size-5 z-20">
              <GiHamburgerMenu className="text-black size-5" />
            </button>
            <h1 className="text-xl font-bold text-black"> SheetDesk</h1>
          </nav>
          <div className="flex absolute w-70 left-20 h-screen z-10 pt-16 bg-gray-800 flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-500">Welcome to SheetDesk</h2>
            <p className="text-gray-600">Your spreadsheet management tool</p>
          </div>
      </main>           
    </>
  )
}

export default App
