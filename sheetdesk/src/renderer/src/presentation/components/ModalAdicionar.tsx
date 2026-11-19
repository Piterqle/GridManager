import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { formatDate, formatCalendar } from "@renderer/services/DependecyServices";
import { enumStatus } from "@renderer/shared/statusEnum";
import { FiUserPlus } from "react-icons/fi";
import { LuSquareUserRound, LuUser } from "react-icons/lu";

const listStatus = ['Matriculado', 'Desistente', 'Realizado', 'Agendado']

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


    const [form, setForm] = useState({
        nome: "",
        modalidade: "Ballet",
        data_procura: "",
        data_experiencia: "",
        semana: "Domingo",
        horario: "",
        contato: "",
        status: "Matriculado"
    })

    useEffect(() => {
        if (Aluno) {
            setForm({
                ...form,
                nome: Aluno.nome,
                modalidade: Aluno.modalidade,
                data_procura: formatCalendar(Aluno.data_procura),
                data_experiencia: formatCalendar(Aluno.data_experiencia),
                semana: Aluno.semana,
                horario: Aluno.horario,
                contato: Aluno.contato,
                status: enumStatus[Aluno.status] ? enumStatus[Aluno.status] : "Matriculado"
            })
            
        }
    }, [Aluno]);

    const inFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.id === "nome" && e.target.value != "") {
            setForm({ ...form, data_procura: (new Date().toISOString().split("T")[0]) });

            return;
        }
        setForm({ ...form, data_procura: "" })
    }

    const formartnumber = (e: React.InputEvent<HTMLInputElement>) => {
        let valor = e.currentTarget.value.replace(/\D/g, "");

        valor = valor
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")

        e.currentTarget.value = valor;
    }

    const onReady = () => {
        const valorVazio = Object.values(form).some(valor => typeof valor === "string" && valor.trim() === "")
        if (valorVazio) {
            alert("Preencha os campos")
            return
        }

        if (form.data_procura > form.data_experiencia) {
            alert("Data da Procura é antes da Experiência")
            return
        }

        const data_procura = formatDate(form.data_procura)
        setForm({ ...form, data_procura: data_procura })

        const data_experiencia = formatDate(form.data_experiencia)
        setForm({ ...form, data_experiencia: data_experiencia })

        const semana = new Date(form.data_experiencia).toLocaleDateString('pt-BR', { weekday: 'long' })
        setForm({ ...form, semana: semana })


        Aluno ? window.api.editDB({ ...Aluno, ...form }) : window.api.addDB(form)
        onClose()
    }

    return (

        <div className={`bg-white p-6 rounded-lg shadow-lg w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <header className="flex justify-between flex-col mb-4">
                <nav className="flex items-center text-xs justify-between flex-row w-full">
                    <div className="flex items-center gap-2 text-blue-800">
                        <FiUserPlus />
                        <p className=" font-semibold text-center"> ALUNOS EXPERIMENTAIS</p>
                    </div>
                    <button onClick={onClose} className="text-gray-700 hover:size-5 hover:text-gray-900">
                        <IoMdClose className="size-5" />
                    </button>
                </nav>
                {Aluno && Aluno.nome ? <h2 className="text-xl font-bold">Editar aluno</h2> : <h2 className="text-xl font-bold">Adicionar aluno</h2>}
            </header>
            
            <form>
                <p className="text-sm flex flex-row items-center gap-2 font-semibold mb-3"><span className="text-blue-800"><LuUser /></span> Dados do Aluno</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-xs mb-2" htmlFor="nome">
                        Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="nome" value={form.nome} onChange={(e) => { setForm({ ...form, nome: e.target.value }) }} onBlur={inFocus} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <p className="text-sm flex flex-row items-center gap-2 font-semibold mb-3"><span className="text-blue-800 text-base"><LuSquareUserRound /></span> Dados da Procura</p>
                <div className="mb-2 w-full grid grid-cols-2 gap-4">
                    <div className="mb-2 w-full">
                        <label className="block text-gray-700 text-xs mb-2" htmlFor="data_procura">
                            Modalidade
                        </label>
                        <select id="data_procura" onChange={(e) => setForm({ ...form, modalidade: e.target.value })} className="shadow-md border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select " >

                            {modalidades.map((modalidade, index) => (
                                <option key={index} value={modalidade} className="text-gray-700">
                                    {modalidade}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-xs mb-2" htmlFor="data_procura">
                            Contato
                        </label>
                        <input type="text" value={form.contato} maxLength={15} onInput={(e) => { formartnumber(e) }} onChange={(e) => setForm({ ...form, contato: e.target.value })} placeholder="(xx) xxxxx-xxxx" id="data_procura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                

                
                    <div className="mb-2 w-full">
                        <label className="block text-gray-700 text-xs mb-2" htmlFor="data_procura">
                            Data da Procura
                        </label>
                        <input type="date" value={form.data_procura} onChange={(e) => setForm({ ...form, data_procura: e.target.value })} id="data_procura" className="shadow-md appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-2 w-full">
                        <label className="block text-gray-700 text-xs mb-2" htmlFor="dataInicio">
                            Data da Experiencia
                        </label>
                        <input type="date" value={form.data_experiencia} onChange={(e) => setForm({ ...form, data_experiencia: e.target.value })} id="dataInicio" className="shadow-md appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                

                
                    
                    <div className="mb-2 w-full">
                        <label className="block text-gray-700 text-xs mb-2" htmlFor="dataInicio">
                            Horário
                        </label>
                        <input id="dataInicio" type="time" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} className="shadow-md appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                
                </div>
                <p className="text-xs text-gray-600 mb-2">
                    Status
                </p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {listStatus.map((status, index) => {
                        return <button 
                            key={index} 
                            type="button" 
                            onClick={() => 
                            setForm({ ...form, status: status })} 
                            className={`h-8 rounded-lg text-xs text-center font-semibold ${form.status === status ? status : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                                {status}
                        </button>
                    })}
                </div>
                <div className="flex justify-end">
                    {
                        Aluno && Aluno.nome ?
                            <button type="button" onClick={() => onReady()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Salvar
                            </button>
                            :
                            <button type="button" onClick={() => onReady()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                                Adicionar
                            </button>
                    }
                </div>
            </form>
        </div>
    )
}


export default ModalAluno;