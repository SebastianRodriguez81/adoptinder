import axios from 'axios'
import { getPort } from '../../src/config.js'
//import { crearServidor } from '../../src/common/server/server.js'

const datos = {
    id: 123456789,
    username: 'sebaprueba1',
    password: 'seba1234',
    email: 'srodriguez81@gmail.com'
}

//const servidor = crearServidor()
const port = getPort()
//await servidor.conectar(port)

try {
    const { data } = await axios.post(`http://localhost:${port}/api/usuarios`, datos)
    console.log(data)    
} catch (error) {
    console.log(error.message)
}