
function validarNombre(nombreUsuario) { 
    if (typeof nombreUsuario != 'string') {
        throw new Error ('username tiene que contener texto')
    }    
}

function validarPassword(password) {
    if (typeof password != 'string') {
        throw new Error ('La contraseña tiene que ser texto')
    }
}

function validarEmail(email) {
    if(!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
        throw new Error ('El formato del email es inválido')
    } 
}

export const crearUsuario = (datosUsuario) => {
    try {
        validarNombre(datosUsuario.username)
    } catch (err) {
        throw new Error ('Error al validar nombre de usuario: ' + err)
    }

    try {
        validarPassword(datosUsuario.password)
    } catch (err) {
        throw new Error ('Error al validar password: ' + err)
    }

    try {
        validarEmail(datosUsuario.email)
    } catch (err) {
        throw new Error ('Error al validar mail: ' + err)
    }

    return {
        username: datosUsuario.username,
        password: datosUsuario.password,
        email: datosUsuario.email
    }
} 
