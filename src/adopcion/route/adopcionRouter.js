import express from 'express'
import crearAltaProcesoAdopcion from '../application/altaProcesoAdopcionFactory.js'

const router = express.Router()

router.post('/mascota/:idMascota/altaProcesoAdopcion', async (req, res) => {
  const altaProcesoAdopcion = crearAltaProcesoAdopcion();
  await altaProcesoAdopcion.realizar(req.body, req.params)
  res.json({ msg: 'ok' })
})


router.put('/usuario/:idUsuario/proceso/:idProceso', async (req, res) => {
  const CU = factoryCUFinalizarTransito()
  try {
    await CU.realizar(req.params.idUsuario, req.params.idProceso)
    res.json({ msg: 'Caso de uso ejecutado OK' })
  } catch (error) {
    res.json({ error: error.toString() })
  }
})

export default router