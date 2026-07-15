import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";




function DashboardPage({ alunosDados }): React.JSX.Element {

  const [taxaMatriculado, setTaxaMatriculado] = useState(0);
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  
  type DadoGraficoItem = {
    mes : string, 
    quantidade : number
  }

  const [dataGrid, setDataGrid] = useState<DadoGraficoItem[]>([])
  
  useEffect(() => {
    var contagem : {[key: string] : number} = {'Jan': 0, 'Fev': 0, 'Mar': 0, 'Abr': 0, 'Mai': 0, 'Jun': 0, 'Jul': 0, 'Ago': 0, 'Set': 0, 'Out': 0, 'Nov': 0, 'Dez': 0}
    const matriculados = alunosDados.filter(aluno => aluno.status === "Matriculado").length
    setTaxaMatriculado(matriculados / alunosDados.length * 100)

    alunosDados.forEach((aluno) => {

      const [dia, mes, ano] = aluno.data_procura.split('/')
      const index = new Date(ano, mes - 1, dia).getMonth();
      const NomeMes = meses[index]

      contagem[NomeMes]++;

    });
    var dado : DadoGraficoItem[] = Object.entries(contagem).map(([mes, quantidade]) => ({
      mes,
      quantidade
    }))

    setDataGrid(dado)
    console.log(dataGrid)
  }, [alunosDados])

  return (
    <>
      <article className="flex flex-col p-1 pt-0 h-full gap-8 w-full">
        <section className="flex flex-row w-full h-auto mt-2 ">
          <div className="flex flex-col w-auto h-auto border py-2 px-4 border-gray-300 rounded-xl shadow-lg items-start gap-2">
            <h1 className="text-3xl font-bold text-gray-700">Visão Geral</h1>
            <p className="text-gray-500 ">Métricas em tempo real dos alunos experimentais.</p>
          </div>
        </section>
        <section className="grid gap-7 grid-cols-2 lg:grid-cols-3 h-auto 2xl:h-[300px] ">
          <div className="flex gap-3 flex-col w-full p-5 h-full border justify-center border-gray-300 rounded-xl shadow-lg items-start ">
            <div className="flex flex-row justify-between text-gray-500 items-center w-full">
              <p className="font-bold text-sm">Total de Alunos Experimentais</p>
              <FaUser className="size-4" />
            </div>
            <h1 className="text-2xl font-bold  text-gray-700">{alunosDados.length}</h1>
          </div>
          <div className="flex gap-2 justify-center flex-col w-full p-5 h-full border border-gray-300 rounded-xl shadow-lg items-start ">
            <div className="flex flex-row justify-between text-gray-500 items-center w-full">
              <p className="font-bold text-sm">Taxa de Conversão (Matrículados)</p>
              <TbActivityHeartbeat className="size-6" />
            </div>
            <h1 className="text-2xl font-bold  text-gray-700">{taxaMatriculado}%</h1>
          </div>

        </section>
        <section className="flex flex-row w-[600px] h-full mb-5">
          <div className="flex border border-gray-300 w-full rounded-xl shadow-lg items-start ">
            <ResponsiveContainer>
              <LineChart data={dataGrid} >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"mes"} />
                <YAxis />
                <Tooltip />
                <Line dataKey={"quantidade"} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </article>
    </>
  )
}

export default DashboardPage