import confirmarFinProcesoAdopcion from '../src/adopcion/app/FinalizarTransito.js'
import daoUsuario from '../src/adopcion/persistence/usuarioDAO.js'
import daoProcesoAdopcion from '../src/adopcion/persistence/procesoAdopcionDAO.js'
import { notificacion } from '../src/common/notificacion/notiMock/index.js'
import { MailSender } from '../src/common/correo/nodeMailer/index.js'
import { mailaccount } from '../src/common/correo/mailAccount/index.js'

const CU = confirmarFinProcesoAdopcion(daoUsuario(), daoProcesoAdopcion(), notificacion(), MailSender(mailaccount()))

await CU.realizar(123456789, 1)