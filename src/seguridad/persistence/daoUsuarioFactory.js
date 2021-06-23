import { getMode } from '../../config.js'

let daoUsuarios

switch (getMode()) {
  case 'PROD':


    break;

  default:

    const { crearMongoClient } = await import('../../common/dbConnection/mongo/mongoClient.js')
    const { getCnxStr } = await import('../../config.js')
    const { crearDaoUsuarios } = await import('./daoUsuarios.js')

    const mongoClient = crearMongoClient(getCnxStr())
    const db = await mongoClient.connect()
    daoUsuarios = crearDaoUsuarios(db)

}

function getDaoUsuarios() {
  return daoUsuarios
}

export default getDaoUsuarios

