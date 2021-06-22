import { crearEstadoProcesoAdopcion } from './estadoProcesoAdopcionFactory.js'

function procesoAdopcion(dtoProcesoAdopcion) {

    return {
        humano: dtoProcesoAdopcion.humano,
        mascota: dtoProcesoAdopcion.mascota,
        estado: crearEstadoProcesoAdopcion(dtoProcesoAdopcion.valorEstado),
        terminos: dtoProcesoAdopcion.terminos == undefined ? dtoProcesoAdopcion.mascota.terminos : dtoProcesoAdopcion.terminos,
        fecha: dtoProcesoAdopcion.fecha,

        aceptarTerminos(perfil, aceptacion) { this.estado.aceptarTerminos(this, perfil, aceptacion); },
        aceptarSolictud(perfil, aceptacion) { this.estado.aceptarSolictud(this, perfil, aceptacion); },
        setFecha(perfil, fecha) { this.estado.setFechaCondiciones(this, perfil, fecha); },
        aceptarFecha(perfil, aceptacion) { this.estado.addCondicion(this, perfil, aceptacion); },
        cancelarProceso(perfil,) { this.estado.cancelarProceso(this, perfil); },
        finzaliarProceso(perfil) { this.estado.finzaliarProceso(this, perfil); },
    }
}

export default procesoAdopcion