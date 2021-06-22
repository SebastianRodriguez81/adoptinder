function usuarioDAO() {
    return {
        async getById(id) {
            const dtoUsuario = {
                id: id,
                email: 'capurissedgard@gmail.com',

            }

            console.log('usuario encontrado!');

            return dtoUsuario;
        }
    }
}

export default usuarioDAO