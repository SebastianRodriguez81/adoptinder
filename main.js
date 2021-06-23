// realmente no se que deberia ir aqui
import { getPort } from './src/config.js'
import { crearServidor } from './src/common/server/server.js'

const port = getPort()
const servidor = crearServidor()

await servidor.conectar(port)