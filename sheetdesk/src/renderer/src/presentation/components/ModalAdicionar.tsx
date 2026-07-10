import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { alunoController, formatDateToInput } from "@renderer/shared/container";


function ModalAluno({ open, onClose, Aluno, modalidades }: { open: boolean; onClose: () => void; Aluno: any; modalidades: any[] }): React.JSX.Element {
    
    if (!open) return <></>;
    
    var [modalidadesLocal, setModalidadeLocal] = useState(modalidades)
    var [listStatus, setlistStatus] = useState(['Matriculado', 'Cancelado', 'Pendente', 'Em Andamento'])
    
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
        modalidade: "",
        data_procura: "",
        data_experiencia: "",
        semana: "",
        horario: "",
        contato: "",
        status: ""
    })

    useEffect(() => {

        if (Aluno) {

            
            
            setForm({
                ...form,
                nome: Aluno.nome,
                modalidade: Aluno.modalidade,
                data_procura: formatDateToInput(Aluno.data_procura),
                data_experiencia: formatDateToInput(Aluno.data_experiencia),
                semana: Aluno.semana,
                horario: Aluno.horario,
                contato: Aluno.contato,
                status: Aluno.status
            })
            modalidades = [`${Aluno.modalidade}`, ...modalidades.filter(item => item !== Aluno.modalidade)]
            setModalidadeLocal(modalidades)
            setlistStatus([`${Aluno.status}`, ...listStatus.filter(item => item !== Aluno.status)])
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

    const onReady = async (type: string) => {
        const pussuirValorVazio = Object.values(form).some(valor => valor.trim() === "")
        if (pussuirValorVazio) {
            alert("Preencha os campos")
            return
        }

        if (form.data_procura > form.data_experiencia) {
            alert("Data da Procura é antes da Experiência")
            return
        }


        if (type === "adicionar") { await alunoController.adicionar(form) }
        else if (type === "atualizar") { await alunoController.atualizar(Aluno.id, form) }
        onClose()
    }

    return (

        <div className={`bg-white p-6 rounded-lg shadow-lg w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="flex justify-between items-center mb-4">
                {Aluno && Aluno.nome ? <h2 className="text-xl font-bold">Editar Aluno</h2> : <h2 className="text-xl font-bold">Adicionar Aluno</h2>}
                <button onClick={onClose} className="text-gray-700 hover:size-5 hover:text-gray-900">
                    <IoMdClose className="size-5" />
                </button>
            </div>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                        Nome Completo
                    </label>
                    <input type="text" id="nome" value={form.nome} onChange={(e) => { setForm({ ...form, nome: e.target.value }) }} onBlur={inFocus} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4 w-full flex flex-row">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data_procura">
                            Modalidade
                        </label>
                        <select id="data_procura" onChange={(e) => setForm({ ...form, modalidade: e.target.value })} className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select " >

                            {
                            modalidadesLocal.map((modalidade, index) => (
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
                        <select id="dataInicio" onChange={(e) => setForm({ ...form, status: e.target.value })} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select" >

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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data_procura">
                            Contato
                        </label>
                        <input type="text" value={form.contato} onInput={(e) => { formartnumber(e) }} onChange={(e) => setForm({ ...form, contato: e.target.value })} placeholder="(xx) xxxxx-xxxx" id="data_procura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Horário
                        </label>
                        <input id="dataInicio" type="time" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="mb-4 flex flex-row w-full">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data_procura">
                            Data da Procura
                        </label>
                        <input type="date" value={form.data_procura} onChange={(e) => setForm({ ...form, data_procura: e.target.value })} id="data_procura" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 ml-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicio">
                            Data da Experiencia
                        </label>
                        <input type="date" value={form.data_experiencia} onChange={(e) => { setForm({ ...form, data_experiencia: e.target.value, semana: new Date(e.target.value).toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' }).replace(/^\w/, (c) => c.toUpperCase()) }) }}
                            id="dataInicio" className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
                <div className="flex justify-end">
                    {
                        Aluno && Aluno.nome ?
                            <button type="button" onClick={() => onReady("atualizar")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Salvar
                            </button>
                            :
                            <button type="button" onClick={() => onReady("adicionar")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Adicionar
                            </button>
                    }
                </div>
            </form>
        </div>
    )
}


export default ModalAluno;