import {
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
    ESTADO_CANCELADO,
} from './estadoProcesoAdopcion.js'

function crearEstadoProcesoAdopcion(estado) {
    if (estado == undefined) { estado = ESTADO_INICIADO };
    switch (estado) {
        case ESTADO_INICIADO:
            return estadoIniciadoProcesoAdopcion();
        case ESTADO_SOLICITADO:
            return estadoSolicitadoProcesoAdopcion();
        case ESTADO_EN_PROCESO:
            return estadoEnProcesoProcesoAdopcion();
        case ESTADO_CONFIRMADO:
            return estadoConfirmadoProcesoAdopcion();
        case ESTADO_FINALIZADO:
            return estadoFinalizadoProcesoAdopcion();
        case ESTADO_CANCELADO:
            return estadoCanceladoProcesoAdopcion();
        default:
            return new Error(MSJ_ERROR_INVALID_STATE);
    }

}

export { crearEstadoProcesoAdopcion }