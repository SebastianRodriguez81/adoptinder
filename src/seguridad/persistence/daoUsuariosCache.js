
export const crearDaoUsuariosCache = () => {
    let usuarios = [
        { username: 'juan', password: "passwordjuan", email: 'juan@test.com' },
        { username: 'maria', password: "passwordmaria", email: 'maria@test.com'},
        { username: 'seba', password: "passwordseba", email: 'pepe@test.com' },
        { username: 'pepe', password: "passwordpepe", email: 'pepe@test.com' }
    ]

    return {
        buscarPorUsername: async (username) => {
            const userBuscado = await usuarios.find(user => user.username == username)
            if (!userBuscado) {
                return 'nombre de usuario no encontrado'
            } else {
                return userBuscado
            }                        
        },
        agregar: async (user) => {
            try {
               await usuarios.push(user)
               return 'usuario agregado exitosamente'
            }
            catch (err) { 
                throw new Error('Hubo un error al guardar el usuario' + err.message)
            }            
        },
        agregarSinRepetirNombre: async (userData) => {
            // Busco el usuario
            const userBuscado = await usuarios.find(user => user.username == userData.username)
                                   
            // Valido la unicidad del username
            if (userBuscado) {
                console.log('Nombre de usuario existente')
                throw new Error('Nombre de usuario existente.')            
            } 
                        
            // Si está todo bien, lo agrego 
            try {
                await usuarios.push(userData)
                return 'usuario agregado con éxito'
            } catch (error) {
                throw new Error('Hubo un error al guardar el usuario' + err.message)
            }
        }
    }
}