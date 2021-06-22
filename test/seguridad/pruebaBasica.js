import axios from 'axios'
import { getPort } from '../src/config.js'

const datos = {
    username: 'sebaprueba',
    password: 'seba1234',
    email: 'srodriguez81@gmail.com'   
}

const port = getPort()

try {
    const { data } = await axios.post(`http://localhost:${port}/api/usuarios`, datos)
    console.log(data)
} catch (error) {
    console.log(error.message)
}

