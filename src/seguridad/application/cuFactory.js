import { crearCUIngresoUsuario } from './crearIngresoUsuario.js'
import { crearEncriptatron } from '../../common/encriptatron/encriptatron.js'
import { MailSender } from '../../common/correo/nodemailer/index.js'
import { getGmailCred } from '../../config.js'
import getDaoUsuarios from '../persistence/daoUsuarioFactory.js'

const credentials = getGmailCred()
const daoUsuarios = await getDaoUsuarios()
const encriptatron = crearEncriptatron()
const mailSender = MailSender(credentials)

const crearCURegistracion = () => {    
    return crearCUIngresoUsuario(daoUsuarios, encriptatron, mailSender)
}

export { crearCURegistracion }