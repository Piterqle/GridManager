

export async function openExcel(): Promise<string | null> {
    try {
        const filePath = await window.api.openExcel();
        localStorage.setItem("excelFilePath", String(filePath) || '');

        return String(filePath) || null;
    } catch (error) {
        console.error("Error opening Excel file:", error);
        return null;
    }
}  

export async function readExcel(filePath: string, tipoReturn: string, modalidade: string = "All"): Promise<any[]> {
    try {
        const alunos = await window.api.readExcel(filePath, tipoReturn, modalidade);
        return alunos;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        return [];
    }
}