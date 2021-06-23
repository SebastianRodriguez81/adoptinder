// CU Registración de usuario
import { crearCUIngresoUsuario } from './crearIngresoUsuario.js'

// Módulos creados x el equipo
import { crearEncriptatron } from '../../common/encriptatron/encriptatron.js'
import {MailSender}  from '../../common/correo/nodemailer/index.js'

// Dao, cuenta SMTP, userSchema 
//import { crearDaoUsuarios } from '../persistence/daoUsuarios.js'
import { getGmailCred } from '../../config.js'
import getDaoUsuarios from '../persistence/daoUsuarioFactory.js'
//import { accountGmail } from '../../common/correo/nodemailer/mailAccounts.js' // config.js

const credentials = getGmailCred()
const daoUsuarios = await getDaoUsuarios()

const encriptatron = crearEncriptatron()
const mailSender = MailSender(credentials)

const crearCURegistracion = () => {
    console.log(getDaoUsuarios())
    return crearCUIngresoUsuario(daoUsuarios, encriptatron, mailSender)
}

export { crearCURegistracion } 
