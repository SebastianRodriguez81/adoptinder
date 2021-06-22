const MENSAJE_INCIO = "<div style='color: #d4d4d4; background-color: #1e1e1e; font-family: Consolas, 'Courier New', monospace; font-weight: normal; font-size: 14px; line-height: 19px; white-space: pre;'><div style='text-align: left;'><span style='background-color: #800080; color: #ffcc00;'><em><strong>Has&nbsp;iniciado&nbsp;un&nbsp;proceso&nbsp;de&nbsp;adopcion!&nbsp;Para&nbsp;continuar&nbsp;deberas&nbsp;aceptar&nbsp;estas&nbsp;condiciones:&nbsp;</strong></em></span></div>"
const MESJAE_FIN = "<div style='text-align: left;'><span style='background-color: #800080; color: #ffcc00;'><em><strong>Felicitaciones!</strong></em></span></div><div style='text-align: left;'><span style='color: #ff0000;'><em><strong>&lt;3</strong></em></span></div></div>"

function armarMensajeInicioAdopcion(procesoAdopcion) {
    let mensaje = MENSAJE_INCIO
    procesoAdopcion.terminos.forEach(termino => {
        mensaje += "<div style='text-align: left;'><span style='background-color: #800080; color: #ffcc00;'><em><strong>" + '* ' + termino.termino + "</strong></em></span></div>"
    });
    mensaje += MESJAE_FIN;
    return mensaje;
}

export default armarMensajeInicioAdopcion