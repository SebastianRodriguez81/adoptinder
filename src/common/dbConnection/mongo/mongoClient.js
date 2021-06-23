import mongodb from 'mongodb'
import { getMongoDBName } from '../../../config.js'


 function crearMongoClient(cnxStr) {
  
  //const uri = "mongodb+srv://sebastian:sebowi0510@cluster1.lc14u.mongodb.net/tp2db?retryWrites=true&w=majority"
  const client = new mongodb.MongoClient(cnxStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return {
    connect: async () => {

      await client.connect()
      const db = client.db(getMongoDBName())      
      return db
    },
    close: async () => {
      await client.close()
    }
  }
}

export { crearMongoClient }