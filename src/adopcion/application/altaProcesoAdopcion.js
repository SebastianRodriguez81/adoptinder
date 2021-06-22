import procesoAdopcion from '../domain/procesoAdopcion.js'
import armarMensajeInicioAdopcion from './crearMensajeInicioAdopcion.js'

function altaProcesoAdopcion(daoHumano, daoMascota, daoUsuario, daoProcesoAdopcion, enviadorNotificacion, enviadorCorreo) {
    return {
        async realizar(idHumano, idMascota) {
            const dtoHumano = await daoHumano.getById(idHumano);
            const dtoMascota = await daoMascota.getById(idMascota);
            const procAdop = procesoAdopcion({ humano: dtoHumano, mascota: dtoMascota });
            await daoProcesoAdopcion.add(procAdop);
            const usuarioHumano = await daoUsuario.getById(procAdop.humano.idUsuario);
            const mensaje = armarMensajeInicioAdopcion(procAdop);
            enviadorNotificacion.nuevaNotificacion(usuarioHumano, mensaje);
            await enviadorCorreo.enviarMail({ to: [usuarioHumano.email], subject: 'Inicio de adopcion ✔', body: mensaje });
        }
    }
}

export default altaProcesoAdopcion