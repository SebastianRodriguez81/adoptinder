import { getPort } from './config.js'
import { crearServidor } from './common/server/server.js'

const port = getPort()
const servidor = crearServidor()

await servidor.conectar(port)