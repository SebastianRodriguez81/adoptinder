import axios from 'axios'
import { getPort } from '../../src/config.js'
import { crearServidor } from '../../src/common/server/server.js'

const datos = {
    username: 'sebaprueba',
    password: 'seba1234',
    email: 'srodriguez81@gmail.com'   
}

// const port = getPort()


const servidor = crearServidor()

const port = getPort()

await servidor.conectar(port)

try {
    console.log('probar 1')
    const { data } = await axios.post(`http://localhost:${port}/api/usuarios`, datos)
    console.log(data)
} catch (error) {
    console.log(error.message)
}

