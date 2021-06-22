import bcrypt from 'bcrypt'

export const crearEncriptatron = () => {
    const saltRounds = 10

    return {
        encriptar: async (password) => {
            try {
                const hash = await bcrypt.hash(password, saltRounds)
                return hash
            } catch (error) {
                throw new Error ('Error al encriptar la contraseña: ' + error.message)
            }
        },
        verificar: async (user, password) => {
            try {
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    return { message: 'Los datos suministrados no coinciden' }
                } else {
                    return { message: 'Verificación exitosa' }
                }
            } catch (error) {
                throw new Error ('Error al comprobar la contraseña: ' + error.message)
            }
        }        
    }
}