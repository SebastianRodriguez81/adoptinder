import express from 'express'
import { crearCURegistracion } from '../application/cuFactory.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const CURegistracion = crearCURegistracion()
  try {
    console.log('stop 2')
    await CURegistracion.ejecutar(req.body)
    res.json({ msg: 'ok' })
  } catch (error) {    
    next(error)
  }
})

router.use((err, req, res, next) => {
  // if (err.type == 'ERR_CLI_NOT_FOUND') { // Cambiar por tipos propios
  //   res.status(404)
  // } else {
  //   res.status(500)
  // }
  res.status(400)
  res.json({ msg: err.message })
})


export default router