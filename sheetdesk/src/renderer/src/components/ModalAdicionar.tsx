import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";



function ModalAdicionar({ open, onClose, Aluno }: { open: boolean; onClose: () => void; Aluno: any }): React.JSX.Element {

    if (!open) return <></>;


    return (

        <div className={`bg-white p-6 rounded-lg shadow-lg w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-100': 'opacity-0 scale-95 pointer-events-none' }`}>
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
                    <input type="text" id="nome" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4 w-full flex flex-row">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataProcura">
                            Modalidade
                        </label>
                        <input type="date" id="dataProcura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Data de Início
                        </label>
                        <input type="date" id="dataInicio" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="mb-4 flex flex-row w-full">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataProcura">
                            Data da Procura
                        </label>
                        <input type="date" id="dataProcura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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


export default ModalAdicionar;