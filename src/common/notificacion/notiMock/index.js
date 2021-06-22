function notificacion() {
    return {
        nuevaNotificacion(usuario, mensaje) {
            console.log('notificacion enviada!');
        }
    }
}

export { notificacion }