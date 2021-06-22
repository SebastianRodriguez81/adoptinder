const MSJ_ERROR_INVALID_STATE = "No permitido en estado actual.";
const MSJ_ERROR_INVALID_HUMAN = "Humano inválido.";
const MSJ_ERROR_INVALID_PET = "Mascota inválido.";

const ESTADO_INICIADO = "Iniciado";
const ESTADO_SOLICITADO = "Solicitado";
const ESTADO_EN_PROCESO = "En Proceso";
const ESTADO_CONFIRMADO = "Confirmado";
const ESTADO_FINALIZADO = "Finalizado";
const ESTADO_CANCELADO = "Cancelado";

function estadoFinalizadoProcesoAdopcion() {
    return {
        nombre: ESTADO_FINALIZADO,
        aceptarTerminos: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarSolictud: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        setFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        cancelarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        finzaliarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) }
    }
}

function estadoCanceladoProcesoAdopcion() {
    return {
        nombre: ESTADO_CANCELADO,
        aceptarTerminos: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarSolictud: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        setFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        cancelarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        finzaliarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) }
    }
}

function estadoIniciadoProcesoAdopcion() {
    return {
        nombre: ESTADO_INICIADO,
        aceptarTerminos: (procesoAdopcion, humano, aceptacion) => {
            if (humano.id != procesoAdopcion.humano.id) { return new Error(MSJ_ERROR_INVALID_HUMAN) };
            if (aceptacion) {
                procesoAdopcion.estado = estadoSolicitadoProcesoAdopcion();
            } else {
                procesoAdopcion.estado = estadoCanceladoProcesoAdopcion();
            }
        },
        aceptarSolictud: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        setFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        cancelarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        finzaliarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) }
    }
}

function estadoSolicitadoProcesoAdopcion() {
    return {
        nombre: ESTADO_SOLICITADO,
        aceptarTerminos: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarSolictud: (procesoAdopcion, mascota, aceptacion) => {
            if (mascota.id != procesoAdopcion.mascota.id) { return new Error(MSJ_ERROR_INVALID_PET) };
            procesoAdopcion.aceptado = aceptacion;
            if (aceptacion) {
                procesoAdopcion.estado = estadoEnProcesoProcesoAdopcion();
            } else {
                procesoAdopcion.estado = estadoCanceladoProcesoAdopcion();
            }
        },
        setFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        cancelarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        finzaliarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) }
    }
}

function estadoEnProcesoProcesoAdopcion() {
    return {
        nombre: ESTADO_EN_PROCESO,
        aceptarTerminos: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarSolictud: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        setFecha: (procesoAdopcion, humano, fecha) => {
            if (humano.id != procesoAdopcion.humano.id) { return new Error(MSJ_ERROR_INVALID_HUMAN) };
            procesoAdopcion.fecha = fecha;
        },
        aceptarFecha: (procesoAdopcion, mascota, aceptacion) => {
            if (mascota.id != procesoAdopcion.mascota.id) { return new Error(MSJ_ERROR_INVALID_PET) };
            if (procesoAdopcion.fecha == undefined) { return new Error(MSJ_ERROR_INVALID_STATE) };
            if (aceptacion) {
                procesoAdopcion.estado = estadoConfirmadoProcesoAdopcion();
            } else {
                procesoAdopcion.estado = estadoCanceladoProcesoAdopcion();
            }
        },
        cancelarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        finzaliarProceso: () => { return new Error(MSJ_ERROR_INVALID_STATE) }
    }
}

function estadoConfirmadoProcesoAdopcion() {
    return {
        nombre: ESTADO_CONFIRMADO,
        aceptarTerminos: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarSolictud: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        setFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        aceptarFecha: () => { return new Error(MSJ_ERROR_INVALID_STATE) },
        cancelarProceso: () => {
            procesoAdopcion.estado = estadoCanceladoProcesoAdopcion();
        },
        finalizarProceso: (procesoAdopcion, perfil) => {
            //terminar
            if (perfil.id != procesoAdopcion.humano.idUsuario && perfil.id != procesoAdopcion.mascota.idUsuario) {
                return new Error(MSJ_ERROR_INVALID_USER)
            }
            procesoAdopcion.aceptacionHumano = true;
            procesoAdopcion.aceptacionMascota = true;
        }
    }
}

export {
    estadoIniciadoProcesoAdopcion,
    estadoSolicitadoProcesoAdopcion,
    estadoEnProcesoProcesoAdopcion,
    estadoConfirmadoProcesoAdopcion,
    estadoFinalizadoProcesoAdopcion,
    estadoCanceladoProcesoAdopcion,
    ESTADO_INICIADO,
    ESTADO_SOLICITADO,
    ESTADO_EN_PROCESO,
    ESTADO_CONFIRMADO,
    ESTADO_FINALIZADO,
    ESTADO_CANCELADO
}