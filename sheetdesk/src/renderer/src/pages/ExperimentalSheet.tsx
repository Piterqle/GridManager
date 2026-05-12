import { FaSearch } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

function ExperimentalSheet(): React.JSX.Element {

    return (
        <article className="flex flex-col items-start p-1 pt-0 justify-center h-full w-full">
            <h1 className="text-3xl font-bold text-gray-700">Alunos Experimentais</h1>
            <p className="text-gray-500 mt-2">Esta é uma tabela com as informações dos alunos experimentais.</p>
            <section className="flex flex-col  w-full h-full p-4 border border-gray-300 rounded-xl mt-5 shadow-lg items-start gap-4">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex items-center gap-2 ">
                        <FaSearch className="absolute ml-3 my-2 text-gray-500" />
                        <input type="text" placeholder="Pesquisar..." className="flex-1 pl-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-300">
                    <table className="w-full table-fixed">
                        <thead className="bg-gray-100 text-sm">
                            <tr>
                                <th className="w-50 border-b border-gray-300 p-3 text-left">
                                    Nome
                                </th>
                                <th className="w-29 border-b border-gray-300 p-3 text-left">
                                    Modalidade
                                </th>
                                <th className="w-40 border-b border-gray-300 p-3 text-left">
                                    Data Procura
                                </th>
                                <th className="w-40 border-b border-gray-300 p-3 text-left">
                                    Data Experiência
                                </th>
                                <th className="w-28 border-b border-gray-300 p-3 text-left">
                                    Semana
                                </th>
                                <th className="w-28 border-b border-gray-300 p-3 text-left">
                                    Horário
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

                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="border-b border-gray-200 p-3">
                                    João Silva
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    Rytmus
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    2023-10-01
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    2023-10-15
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    Segunda
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    14:00
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    (37) 99999-9999
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    Aprovado
                                </td>
                                <td className="border-b border-gray-200 p-3 text-right">
                                    <button className="hover:underline">
                                        <FaUserEdit className="size-4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </section>
        </article>
    )
}

export default ExperimentalSheet