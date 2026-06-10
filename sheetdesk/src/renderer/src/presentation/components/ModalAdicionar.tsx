import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


const listStatus = ['Matriculado', 'Cancelado', 'Pendente', 'Em Andamento']

function ModalAluno({ open, onClose, Aluno, modalidades }: { open: boolean; onClose: () => void; Aluno: any; modalidades: any[] }): React.JSX.Element {

    if (!open) return <></>;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    const [dataProcura, setDataProcura] = useState("");

    const inFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.id === "nome" && e.target.value != "") {
            setDataProcura(new Date().toISOString().split("T")[0]);
            console.log("Data da procura definida para:", dataProcura);
            return;
        }
        setDataProcura('')
    }

    const formartnumber = (e: React.InputEvent<HTMLInputElement>) => {
        let valor = e.currentTarget.value.replace(/\D/g, "");

        valor = valor
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
        
        e.currentTarget.value = valor;
    }

    return (

        <div className={`bg-white p-6 rounded-lg shadow-lg w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Adicionar Aluno</h2>
                <button onClick={onClose} className="text-gray-700 hover:size-5 hover:text-gray-900">
                    <IoMdClose className="size-5" />
                </button>
            </div>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                        Nome Completo
                    </label>
                    <input type="text" id="nome" onBlur={inFocus} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4 w-full flex flex-row">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataProcura">
                            Modalidade
                        </label>
                        <select id="dataProcura" className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select " >

                            {modalidades.map((modalidade, index) => (
                                <option key={index} value={modalidade} className="text-gray-700">
                                    {modalidade}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Status
                        </label>
                        <select id="dataInicio" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select" > 

                            {
                                listStatus.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))
                            }
                            

                        </select>
                    </div>
                </div>

                <div className="mb-4 w-full flex flex-row">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataProcura">
                            Contato
                        </label>
                        <input type="text" onInput={(e) => {formartnumber(e)}} placeholder="(xx) xxxxx-xxxx" id="dataProcura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Horário
                        </label>
                        <input id="dataInicio" type="time" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="mb-4 flex flex-row w-full">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataProcura">
                            Data da Procura
                        </label>
                        <input type="date" value={dataProcura} onChange={(e) => setDataProcura(e.target.value)} id="dataProcura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Data de Início
                        </label>
                        <input type="date" id="dataInicio" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ModalAluno;