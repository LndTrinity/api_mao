import express from 'express'
import cors from 'cors'

import avaliacaoRoutes from './src/routes/avaliacao'
import clientesRoutes from './src/routes/clientes'
import prestadorRoutes from './src/routes/prestador'
import reservaRoutes from './src/routes/reserva'
import propostasRoutes from './src/routes/servico'
import usuarioRoutes from './src/routes/usuario'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/avaliacao", avaliacaoRoutes)
app.use("/clientes", clientesRoutes)
app.use("/prestador", prestadorRoutes)
app.use("/reserva", reservaRoutes)
app.use("/propostas", propostasRoutes)
app.use("/usuarios", usuarioRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema Mão na Roda')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})