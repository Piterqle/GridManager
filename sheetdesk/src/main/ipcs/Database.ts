import { dialog, ipcMain } from "electron";
import type { Aluno } from "../../renderer/src/shared/Aluno";

const apiBaseUrl = (process.env.GRIDMANAGER_API_URL ?? "http://127.0.0.1:3000/api").replace(/\/+$/, "");

async function requestApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, init);
  
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    dialog.showErrorBox(
      "Erro",
      body?.error ?? `Houve um erro interno no servidor.`
    )
    throw new Error(body?.error ?? `A API retornou HTTP ${response.status}.`);
  }


  const body = response.json()
  if (response.status === 201) {
    dialog.showMessageBox({
      type: "info",
      title: "Cadastro realizado",
      message: await body.then((res) => res.message)
    })
    console.log("======")
  } else if (response.status == 204){
    dialog.showMessageBox({
      type: "info",
      title: "Atualização concluída",
      message: await body.then((res) => res.message)
    })
    console.log("======")
  }
  return body as Promise<T>;
}


ipcMain.handle("add-aluno", async (_event, aluno: Aluno) => {
  await requestApi("/aluno", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });
});

ipcMain.handle("read-aluno", async (_event, modalidade = "") => {
  const query = modalidade && modalidade !== "All"
    ? `?modalidade=${encodeURIComponent(modalidade)}`
    : "";
  const alunos = await requestApi<Aluno[]>(`/aluno${query}`);
  return alunos.map((aluno) => ({
    ...aluno,
    data_procura: formatDate(aluno.data_procura),
    data_experiencia: formatDate(aluno.data_experiencia)
  }));
});

ipcMain.handle("edit-aluno", async (_event, aluno: Aluno) => {
  if (!aluno.id) {
    throw new Error("O aluno precisa ter um id para ser atualizado.");
  }

  await requestApi(`/aluno/${encodeURIComponent(aluno.id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });
});

function formatDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : date;
}
