import procesoAdopcion from '../domain/procesoAdopcion.js'


function confirmarFinProcesoAdopcion(daoUsuario, daoProcesoAdopcion, enviadorNotificacion, enviadorCorreo) {
    return {
        async realizar(idUsuario, idProcesoAdopcion) {
            const dtoProcesoAdopcion = await daoProcesoAdopcion.getbyID(idProcesoAdopcion);
            const dtoUsuario = await daoUsuario.getByid(idUsuario);
            const procAdop = procesoAdopcion(dtoProcesoAdopcion);
            procAdop.finalizarProceso(dtoUsuario);
            await daoProcesoAdopcion.update(procAdop);
            const mensaje = "Armar un mensaje";
            enviadorNotificacion.nuevaNotificacion(dtoUsuario, mensaje);
            await enviadorCorreo.enviarMail({ to: [dtoUsuario.email], subject: 'Confirmacion recibida ✔', body: mensaje });
        }
    }
}

export default confirmarFinProcesoAdopcion