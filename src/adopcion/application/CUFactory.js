import confirmarFinProcesoAdopcion from './FinalizarTransito.js'
import daoUsuario from '../persistence/usuarioDAO.js'
import daoProcesoAdopcion from '../persistence/procesoAdopcionDAO.js'
import { notificacion } from '../../common/notificacion/notiMock/index.js'
import { MailSender } from '../../common/correo/nodeMailer/index.js'
import { mailaccount } from '../../common/correo/mailAccount/index.js'

function factoryCUFinalizarTransito() {
  const transitoFinalizado = confirmarFinProcesoAdopcion(daoUsuario(), daoProcesoAdopcion(), notificacion(), MailSender(mailaccount()))
  return transitoFinalizado
}

export default factoryCUFinalizarTransito