import { crearUsuario } from '../domain/userSchema.js'

export const crearCUIngresoUsuario = (daoUsuarios, encriptatron, mailSender) => {
        
    return {
        ejecutar: async (datos) => {
            // Validar los datos de usuario
            const usuarioNuevo = crearUsuario(datos)

            // Encriptamos la contraseña
            const hash = await encriptatron.encriptar(usuarioNuevo.password)
            usuarioNuevo.password = hash
            console.log('Password encriptada con éxito!!')

            // Valido la unicidad del username y agrego al usuario al dao
            const mensaje = await daoUsuarios.agregarSinRepetirNombre(usuarioNuevo)
            console.log(mensaje)                
                                    
            // Enviar mail de registro satisfactorio
            const mail = {
                to: [`${usuarioNuevo.email}`],
                subject: `Bienvenido a la App, ${usuarioNuevo.username} !!`,
                body: `Bienvenido, ${usuarioNuevo.username}, te registraste exitosamente.
                Ingresá a /login con tus datos y empezá a usar AdopTinder!!`
            }
            
            const mailResult = await mailSender.enviarMail(mail)
            console.log('Mail de bienvenida enviado exitosamente!')
            console.log(mailResult)
        }
    }
}