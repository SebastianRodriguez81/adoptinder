import { crearServidor } from '../../../src/common/server/server.js'
import axios from 'axios'

const servidor = crearServidor();
const port = 3000;
await servidor.conectar(port);

try {
    const { data } = await axios.post(`http://localhost:${port}/adopcion/mascota/777/altaProcesoAdopcion`, { idHumano: '666' })
    console.log(data);
} catch (error) {
    console.log(error.message);
}

await servidor.desconectar();