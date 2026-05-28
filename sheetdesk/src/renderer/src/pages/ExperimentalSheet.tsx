// Import React and necessary hooks
import { useEffect, useState } from "react";
import { readExcel } from "@renderer/services/excel";


// Importing icons
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";

function ExperimentalSheet(): React.JSX.Element {

    // Estado do dropdown de modalidades
    const [listDropdow, setListDrop] = useState<any[]>([]);
    const [selectedModalidade, setSelectedModalidade] = useState<string>("");

    // Arquvio do Excel armazenado no localStorage
    const filePath = localStorage.getItem("excelFilePath");


    const [alunosDados, setAlunosDados] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchSheets = async () => {

            readExcel(filePath || '', "Sheet", "All").then((sheets) => {
                const modalidades: any[] = [];
                for (const sheet of sheets) {
                    const sheetName = sheet[0] + sheet.slice(1).toLowerCase();
                  modalidades.push(sheetName);
                }
                setListDrop(modalidades);
            }) };
            fetchSheets();
        }, [filePath]);
        
    const fetchAlunos = async (modalidade: string) => {

        if (!filePath) {
            console.error("No Excel file path found in localStorage.");
            return [];
        }

        console.log("Fetching alunos with modalidade:", modalidade);

        if (modalidade.trim() === "" && selectedModalidade) 
            {
                modalidade = selectedModalidade.toUpperCase();
                console.log("Modalidade was empty, using selectedModalidade:", modalidade);
                console.log(modalidade);
            }
        const data = await readExcel(filePath || '', "alunos", modalidade.toUpperCase() || "All");
        return data;
    }
    
    useEffect(() => {
        console.log("Selected modalidade changed:", selectedModalidade);
        fetchAlunos(selectedModalidade).then((data) => {
            setAlunosDados(data);
        });
            const alunos = setInterval(async () => {
                console.log("Atualizando dados dos alunos...");
                setAlunosDados(await fetchAlunos(selectedModalidade.toUpperCase()));
            }, 30000); // Atualiza a cada 1 minutos

            return () => clearInterval(alunos);
    }, [filePath, selectedModalidade]);
        
        
        const [paginaAtual, setPaginaAtual] = useState(1);
        const intensPaginacao = 20; // Número de itens por página
        
        const ultimoIndice = paginaAtual * intensPaginacao;
        const primeiroIndice = ultimoIndice - intensPaginacao;
        
        const alunosPagina = alunosDados.slice(primeiroIndice, ultimoIndice); // Substitua por seus dados reais de alunos
    
            
        const totalPaginas = Math.ceil(alunosDados.length / intensPaginacao);

    return (
        
        <article className="flex flex-col p-1 relative pt-0 justify-center h-full w-full">
            <h1 className="text-3xl font-bold text-gray-700">Alunos Experimentais</h1>
            <p className="text-gray-500 mt-2">Esta é uma tabela com as informações dos alunos experimentais.</p>
            <section className="flex flex-col p-2  w-full h-auto border border-gray-300 rounded-xl mt-5 shadow-lg items-start gap-4">
                <div className="flex flex-row items-start justify-between w-full px-4">
                    <div className="flex items-center gap-2 w-1/3 relative mt-1">
                        <FaSearch className="absolute ml-3 my-2 text-gray-500" />
                        <input type="text" placeholder="Pesquisar..." className="flex-1 pl-10 border h-[40px] border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                    </div>
                    <div className="flex items-center gap-2 mt-1"> 
                        <select className="border h-[40px] w-110 border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 " value={selectedModalidade} onChange={async (e) => {
                            setSelectedModalidade(e.target.value);
                            await fetchAlunos(e.target.value).then((data) => { setAlunosDados(data); }
                            )}}>                        
                            
                            <option value="">Todas as modalidades</option>
                            {listDropdow.map((modalidade, index) => (
                                <option key={index} value={modalidade}>
                                    {modalidade}
                                </option>
                            ))}
                        </select>
                        <button className="px-3 py-1 rounded-md border h-[40px] border-gray-300 bg-white hover:bg-gray-200">
                            <FaFilter className="text-gray-500 size-4" />
                        </button>
                    
                    </div>
                </div>
                <div className="rounded-xl overflow-auto w-full border max-h-[55vh] border-gray-300">
                    <table className="w-full table-fixed">
                        <thead className="bg-gray-100 text-sm">
                            <tr>
                                <th className="w-54 border-b border-gray-300 p-3 text-left">
                                    Nome
                                </th>
                                <th className="w-29 border-b border-gray-300 p-3 text-left">
                                    Modalidade
                                </th>
                                <th className="w-21 border-b border-gray-300 p-3 text-left">
                                    Data Procura
                                </th>
                                <th className="w-21 border-b border-gray-300 p-3 text-left">
                                    Data Experiência
                                </th>
                                <th className="w-40 border-b border-gray-300 p-3 text-left">
                                    Semana
                                </th>
                                <th className="w-50 border-b border-gray-300 p-3 text-left">
                                    Contato
                                </th>
                                <th className="w-32 border-b border-gray-300 p-3 text-left">
                                    Status
                                </th>
                                <th className="w-10  border-b border-gray-300 p-3"></th>
                            </tr>
                        </thead>

                        <tbody className="">
                            
                        {
                            alunosPagina.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center p-4 text-gray-500">
                                        Nenhum aluno encontrado.
                                    </td>
                                </tr>
                            ) : (
                                alunosPagina.map((aluno, index) => (
                                    <tr className="hover:bg-gray-50" key={index}>
                                        <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap">
                                            {aluno.nome}
                                        </td>
                                            <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className="px-2 py-1 rounded-md text-[12px] font-medium w-fit text-blue-900 bg-blue-300">
                                                    {aluno.modalidade}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                {aluno.data_procura}
                                            </td>
                                            <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                {aluno.data_inicio}
                                            </td>
                                            <td className="border-b flex flex-col border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className="px-2 py-1 rounded-md text-[14px] font-medium w-fit text-purple-900 bg-purple-300">
                                                    {aluno.semana}
                                                </p>
                                                <p className="px-2 py-1 rounded-md text-[12px] text-center font-medium w-fit text-gray-400">
                                                    <FaRegClock className="size-3 mb-1 inline mr-1" />
                                                    {aluno.horario}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                <BsTelephone className="size-4 inline mr-2" />
                                                {aluno.contato} 
                                            </td>
                                            <td className="border-b border-gray-200 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className={`px-2 py-1 rounded-md text-[14px] font-medium ${aluno.status === "Matriculado" ? 'bg-green-100 text-green-800' : aluno.status === "Inativo" ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {aluno.status}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-200 p-3 text-right">
                                                <button className="hover:underline">
                                                    <BsThreeDotsVertical className="size-4  text-gray-900" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            
                        </tbody>

                    </table>
                </div>
                <div className="flex items-center justify-end gap-2 w-full">
                    <button className={`px-3 py-1 rounded-md ${paginaAtual === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`} onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
                        Anterior
                    </button>
                    <span className="text-sm text-gray-500">
                        Página {paginaAtual} de {totalPaginas}
                    </span>
                    <button className={`px-3 py-1 rounded-md ${paginaAtual === totalPaginas ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`} onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
                        Próxima
                    </button>
                </div>
            </section>
        </article>
    )
}

export default ExperimentalSheet