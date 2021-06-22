// CU Registración de usuario
import { crearCUIngresoUsuario } from './crearIngresoUsuario.js'

// Módulos creados x el equipo
import { crearEncriptatron } from '../../common/encriptatron/encriptatron.js'
import crearMailSender  from '../../common/correo/nodemailer/mailSender.js'

// Dao, cuenta SMTP, userSchema 
import { crearDaoUsuarios } from '../persistence/daoUsuarios.js'
import { getGmailCred } from '../../config.js'
//import { accountGmail } from '../../common/correo/nodemailer/mailAccounts.js' // config.js

const credentials = getGmailCred()
const daoUsuarios = crearDaoUsuarios()
const encriptatron = crearEncriptatron()
const mailSender = crearMailSender(credentials)

const crearCURegistracion = () => {
    return crearCUIngresoUsuario(daoUsuarios, encriptatron, mailSender)
}

export { crearCURegistracion } 
