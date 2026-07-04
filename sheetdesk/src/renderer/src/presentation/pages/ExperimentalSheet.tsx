// Import React and necessary hooks
import { useEffect, useState } from "react";
import ModalAdicionar from "@renderer/presentation/components/ModalAdicionar";


// Importing icons
import { FaUserPlus, FaSearch, FaRegClock, FaFilter } from "react-icons/fa";
import { BsThreeDotsVertical, BsTelephone } from "react-icons/bs";


// Importing Container Controller
import {alunoController} from "@renderer/shared/DependecyServices";

function ExperimentalSheet(): React.JSX.Element {
    
    enum alunoStatus {
        Matriculado = "bg-green-100 text-green-800",
        Cancelado = "bg-red-100 text-red-800",
        Pendente = "bg-yellow-100 text-yellow-800",
        "Em Andamento" = "bg-blue-100 text-blue-800"
    }

    // Estado do dropdown de modalidades
    const [listDropdow, setListDrop] = useState<any[]>([]);
    const [selectedModalidade, setSelectedModalidade] = useState<string>("");

    // Arquvio do Excel armazenado no localStorage
    const filePath = localStorage.getItem("excelFilePath");

    // Estado de carregamento dos dados
    const [loading, setLoading] = useState<boolean>(true);


    // Manipular os Estado do modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [alunoEdit, setAlunoEdit] = useState<any | null>(null);

    const [alunosDados, setAlunosDados] = useState<any[]>([]);

    useEffect(() => {
        const modalidades = ["Ballet", "Castanholas", "Dança do Ventre", "Dança de Salão", "Dança Cigana", "Flamenco", "Forró", "Funk", "Jazz Funk", "Jazz", "Pole", "Rytmus", "Rytmus Sênior", "Samba de Gafieira"];
        setListDrop(modalidades);
    });
    
    

    useEffect(() => {
        alunoController.ReadAlunos(selectedModalidade, setLoading).then((data) => {
            setAlunosDados(data || []);
        });
        const alunos = setInterval(async () => {
            setAlunosDados(await alunoController.ReadAlunos(selectedModalidade, setLoading) || []);
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
        <article className="flex flex-col p-1 relative pt-0  h-full w-full">
            { 
               (isModalOpen) &&
                <section className="fixed inset-0 scale-110 rounded-xl bg-tranparent z-30 ">
                    <div className="w-full h-full blur-3xl opacity-50  bg-black"/>
                    <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
                        <ModalAdicionar open={isModalOpen} onClose={() => {setIsModalOpen(false), alunoController.ReadAlunos(selectedModalidade, setLoading), setAlunoEdit(null)}} Aluno={alunoEdit} modalidades={listDropdow}  />
                    </div>
                </section> 
            }
            <section className="flex flex-row w-full h-auto mt-2">
                <div className="flex flex-col w-auto h-auto border py-2 px-4 border-gray-300 rounded-xl shadow-lg items-start gap-2">
                    <h1 className="text-3xl font-bold text-gray-700">Alunos Experimentais</h1>
                    <p className="text-gray-500 ">Esta é uma tabela com as informações dos alunos experimentais.</p>
                </div>
                <div className="flex items-end gap-2 ml-auto">
                    <button onClick={() => setIsModalOpen(true)} className="ml-auto px-4 py-2 rounded-md border h-[40px] text-center border-gray-300 bg-gradient-to-r from-pink-400 to-purple-800 text-white hover:from-pink-500 hover:to-purple-900 flex items-center gap-2">
                        <FaUserPlus className="" />
                        <p className="text-sm font-medium">Adicionar Aluno</p>
                    </button>
                </div>
            </section>
            <section className="flex flex-col p-2  w-full h-auto border bg-gray-100 border-gray-300 rounded-xl mt-2 shadow-xl items-start gap-4">
                <div className="flex flex-row items-start justify-between w-full px-4">
                    <div className="flex items-center gap-2 w-1/3 relative mt-1">
                        <FaSearch className="absolute ml-3 my-2 text-gray-500" />
                        <input type="text" placeholder="Pesquisar..." className="flex-1 pl-10 border h-[40px] border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <select className="border h-[40px] w-110 border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 " value={selectedModalidade} onChange={async (e) => {
                            setSelectedModalidade(e.target.value);
                            console.log("Modalidade selecionada:", e.target.value);
                            await alunoController.ReadAlunos(e.target.value, setLoading).then((data) => { setAlunosDados(data || []) ; }
                            )
                        }}>

                            <option value="All">Todas as modalidades</option>
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
                <div className="rounded-xl  overflow-auto w-full border max-h-[55vh] border-gray-300">
                    <table className="w-full table-fixed">
                        <thead className="bg-gray-200 text-sm sticky top-0">
                            <tr>
                                <th className="w-55 border-b border-gray-400 p-3 text-left">
                                    Nome
                                </th>
                                <th className="w-29 border-b border-gray-400 p-3 text-left">
                                    Modalidade
                                </th>
                                <th className="w-21 border-b border-gray-400 p-3 text-left">
                                    Data Procura
                                </th>
                                <th className="w-21 border-b border-gray-400 p-3 text-left">
                                    Data Experiência
                                </th>
                                <th className="w-40 border-b border-gray-400 p-3 text-left">
                                    Semana
                                </th>
                                <th className="w-50 border-b border-gray-400 p-3 text-left">
                                    Contato
                                </th>
                                <th className="w-32 border-b border-gray-400 p-3 text-left">
                                    Status
                                </th>
                                <th className="w-10  border-b border-gray-400 p-3"></th>
                            </tr>
                        </thead>

                        <tbody className="">

                            {
                                (alunosDados.length === 0 && loading) ? (
                                    <tr>
                                        <td colSpan={8} className="text-right p-4 px-auto align-middle text-gray-500">
                                            <div className="flex items-center justify-center w-full">
                                                <div className="flex items-center justify-center z-40  animate-spin w-10 h-10 rounded-full border-4 border-t-blue-900 border-gray-300 top-1/2 left-1/2 "/>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    
                                alunosPagina.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center p-4 text-gray-500">
                                            Nenhum aluno encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    alunosPagina.map((aluno, index) => (
                                        <tr className="hover:bg-gray-50" key={index}>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap">
                                                {aluno.nome}
                                            </td>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className="px-2 py-1 rounded-md text-[12px] font-medium w-fit text-blue-900 bg-blue-300">
                                                    {aluno.modalidade}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                {aluno.data_procura}
                                            </td>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                {aluno.data_experiencia}
                                            </td>
                                            <td className="border-b flex flex-col border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className="px-2 py-1 rounded-md text-[14px] font-medium w-fit text-purple-900 bg-purple-300">
                                                    {aluno.semana}
                                                </p>
                                                <p className="px-2 py-1 rounded-md text-[12px] text-center font-medium w-fit text-gray-400">
                                                    <FaRegClock className="size-3 mb-1 inline mr-1" />
                                                    {aluno.horario}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap text-gray-400">
                                                <BsTelephone className="size-4 inline mr-2" />
                                                {aluno.contato}
                                            </td>
                                            <td className="border-b border-gray-300 p-3 truncate overflow-hidden whitespace-nowrap">
                                                <p className={`px-2 py-1 rounded-md text-[14px] text-center font-medium ${alunoStatus[aluno.status as keyof typeof alunoStatus]}`}>
                                                    {aluno.status}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-300 p-3 text-right">
                                                <button className="hover:underline" onClick={() => {  setAlunoEdit(aluno); setIsModalOpen(true);}}>
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