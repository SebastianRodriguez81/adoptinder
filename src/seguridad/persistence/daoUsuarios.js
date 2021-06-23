
export function crearDaoUsuarios(db) {  

    return {
        cerrar: async () => {
            console.log('cerrando dao mongo...')
            await db.close()
        },

        buscarPorUsername: async (username) => {
            try {
                const dbUsuario = db.collection('usuarios')
                const userBuscado = await dbUsuario.findOne({ username: username })

                if (userBuscado) {
                    console.log('usuario encontrado!')
                    return userBuscado
                } else {
                    throw new Error('Usuario no encontrado')
                }
            }
            catch (err) {
                throw new Error('Hubo un error al buscar el usuario' + err.message)
            }
        },

        agregar: async (user) => {
            try {
                const dbUsuario = db.collection('usuarios')
                await dbUsuario.insert({ user })
                console.log('usuario registrado!')
            }
            catch (err) {
                throw new Error('Hubo un error al guardar el usuario' + err.message)
            }
        },

        agregarSinRepetirNombre: async (userData) => {
            console.log('stop 3')
            try {
                console.log('stop 3')
                const dbUsuario = db.collection('usuarios')
                const userBuscado = await dbUsuario.findOne({ username: userData.username })

                if (userBuscado) {
                    console.log('Nombre de usuario existente')
                    throw new Error('Nombre de usuario existente.')

                } else {
                    await dbUsuario.insert({ user })
                    console.log('usuario registrado!')
                }
            }
            catch (err) {
                throw new Error('Hubo un error al guardar el usuario' + err.message)
            }
        }
    }
}