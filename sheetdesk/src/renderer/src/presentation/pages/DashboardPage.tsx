import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";



function DashboardPage({ alunosDados }): React.JSX.Element {

  const [taxaMatriculado, setTaxaMatriculado] = useState(0);

  useEffect(() => {

    const matriculados = alunosDados.filter(aluno => aluno.status === "Matriculado").length
    setTaxaMatriculado(matriculados / alunosDados.length * 100)
    
  }, [alunosDados])
  
  return (
    <>
      <article className="flex flex-col p-1 pt-0 h-full gap-8 w-full">
        <section className="flex flex-row w-full h-auto mt-2">
          <div className="flex flex-col w-auto h-auto border py-2 px-4 border-gray-300 rounded-xl shadow-lg items-start gap-2">
                    <h1 className="text-3xl font-bold text-gray-700">Visão Geral</h1>
                    <p className="text-gray-500 ">Métricas em tempo real dos alunos experimentais.</p>
          </div>
        </section>
        <section className="grid gap-7 grid-cols-2 md:grid-cols-4 h-auto ">
          <div className="flex gap-3 flex-col w-full p-5 h-full border border-gray-300 rounded-xl shadow-lg items-start ">
              <div className="flex flex-row justify-between items-center w-full">
                <p className="font-bold text-sm text-gray-500">Total de Alunos Experimentais</p>
                <FaUser className="size-4" />
              </div>
              <h1 className="text-2xl font-bold  text-gray-700">{alunosDados.length}</h1>
          </div>
          <div className="flex gap-2 flex-col w-full p-5 h-full border border-gray-300 rounded-xl shadow-lg items-start ">
              <div className="flex flex-row justify-between items-center w-full">
                <p className="font-bold text-sm text-gray-500">Taxa de Conversão</p>
                <TbActivityHeartbeat className="size-6"  />
              </div>
              <h1 className="text-2xl font-bold  text-gray-700">{taxaMatriculado}%</h1>
          </div>
        </section>
      </article>
    </>
  )
}

export default DashboardPage