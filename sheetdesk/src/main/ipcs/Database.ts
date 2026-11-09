import { dialog, ipcMain } from "electron";
import type { Aluno } from "../../shared/Aluno.ts";

const apiBaseUrl = (process.env.GRIDMANAGER_API_URL ?? "http://127.0.0.1:3000/api").replace(/\/+$/, "");

async function requestApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, init);
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(body?.error ?? `A API retornou HTTP ${response.status}.`);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}


ipcMain.handle("add-aluno", async (_event, _filePath: string, aluno: Aluno) => {
  await requestApi<Aluno>("/aluno", {
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

  await requestApi<Aluno>(`/aluno/${encodeURIComponent(aluno.id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });
});

function formatDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : date;
}
