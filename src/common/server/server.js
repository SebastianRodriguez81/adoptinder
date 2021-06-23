import adopcionRouter from '../../adopcion/route/adopcionRouter.js'
import userRouter from '../../seguridad/route/userRouter.js'
import express from 'express'

function crearServidor() {
  const app = express()
  app.use(express.json())

  app.use('/adopcion', adopcionRouter)
  app.use('/api/usuarios', userRouter)

  let server = null

  return {
    conectar: (port) => {
      return new Promise((resolve, reject) => {
        if (server) {
          reject(new Error('servidor ya conectado'))
        } else {
          server = app.listen(port, () => {
            console.log(`conectado en puerto ${server.address().port}`)
            resolve()
          })
          server.on('error', (err) => {           
            reject(err)
          })
        }
      })
    },

    desconectar: () => {
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            reject(err)
          } else {
            server = null
            console.log('desconectado!')
            resolve()
          }
        })
      })
    }
  }
}

export { crearServidor }
