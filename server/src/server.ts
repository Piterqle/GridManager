import app from "./app"

const PORT = 3000
const HOST = "localhost"

app.listen(PORT, HOST, () => {
    console.log(`[SERVER] Servidor está rodando: http://${HOST}:${PORT}`)
})