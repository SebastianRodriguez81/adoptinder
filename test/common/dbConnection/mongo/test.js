
import { crearMongoClient } from '../../../../src/common/dbConnection/mongo/mongoClient.js'
import { getCnxStr } from '../../../../src/config.js'
import { crearServidor } from '../../../../src/common/server/server.js'



async function f1() {


    const servidor = crearServidor()

    const port = 7896

    await servidor.conectar(port)


    console.log('fase 1')
    const mongoClient = crearMongoClient(getCnxStr())
    console.log('fase 2')
    console.log(getCnxStr())
    console.log(mongoClient)
    const db = await mongoClient.connect()
    console.log('fase 3')
    console.log(db)

}

f1();







