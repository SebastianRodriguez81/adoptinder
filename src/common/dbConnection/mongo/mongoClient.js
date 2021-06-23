import mongodb from 'mongodb'
import { getMongoDBName } from '../../../config.js'

function crearMongoClient(cnxStr) {
  const client = new mongodb.MongoClient(cnxStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return {
    connect: async () => {

      await client.connect()

      const db = client.db(getMongoDBName())
      db.close = async () => {
        await client.close()
      }
      return db
    },
    close: async () => {
      await client.close()
    }
  }
}

export { crearMongoClient }