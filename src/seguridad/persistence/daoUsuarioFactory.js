import { getMode } from '../../config.js'

let daoUsuarios

switch (getMode()) {
  case 'PROD':
    console.log('ejecutando en modo PROD')

    const { crearMongoClient } = await import('../../common/dbConnection/mongo/mongoClient.js')
    const { getCnxStr } = await import('../../config.js')
    const { crearDaoUsuariosMongo } = await import('./daoUsuariosMongo.js')

    const mongoClient = crearMongoClient(getCnxStr())
    const db = await mongoClient.connect()
    daoUsuarios = crearDaoUsuariosMongo(db)
    break;

  default:
    console.log('ejecutando en modo TEST')
    
    const { crearDaoUsuariosCache } = await import('./daoUsuariosCache.js')
    daoUsuarios = crearDaoUsuariosCache()

}

function getDaoUsuarios() {
  return daoUsuarios
}

export default getDaoUsuarios

