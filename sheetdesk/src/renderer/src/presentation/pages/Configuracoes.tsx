import { openExcel } from "../../domain/services/excel";

function Configuration(): React.JSX.Element {
    const excelFilePath = localStorage.getItem("excelFilePath");

    const handleOpenExcel = async () => {
        if (!excelFilePath) {
            const filePath = await openExcel();
            console.log("Selected Excel file path:", filePath);
        } else {
            console.log("Excel file path from localStorage:", excelFilePath);
        }
    };
  ;
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-3xl font-bold text-gray-700">Configuration</h1>
      <p className="text-gray-500 mt-4">This is your configuration page.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleOpenExcel()}>
        Save Configuration
      </button>
    </div>
  );
}

export default Configuration;