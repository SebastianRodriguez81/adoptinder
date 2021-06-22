import { crearServidor } from '../src/common/server/servidor.js'
import axios from 'axios'

const servidor = crearServidor()

const port = 3000

await servidor.conectar(port)

const { data } = await axios.put(`http://localhost:${port}/adopcion/usuario/123456789/proceso/1`)

console.log(data)

await servidor.desconectar()