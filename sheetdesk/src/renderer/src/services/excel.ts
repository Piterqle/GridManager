

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