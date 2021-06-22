import altaProcesoAdopcion from './altaProcesoAdopcion.js'
import daoHumano from '../persistence/humanoDAO.js'
import daoMascota from '../persistence/mascotaDAO.js'
import daoUsuario from '../persistence/usuarioDAO.js'
import daoProcesoAdopcion from '../persistence/procesoAdopcionDAO.js'
import { notificacion } from '../../common/notificacion/notiMock/index.js'
import { MailSender } from '../../common/correo/nodeMailer/index.js'
import { mailaccount } from '../../common/correo/mailAccount/index.js'

function crearAltaProcesoAdopcion() {
  const adopcion = altaProcesoAdopcion(daoHumano(), daoMascota(), daoUsuario(), daoProcesoAdopcion(), notificacion(), MailSender(mailaccount()));
  return adopcion;
}

export default crearAltaProcesoAdopcion