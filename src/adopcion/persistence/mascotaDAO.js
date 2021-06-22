function mascotaDAO() {
    return {
        async getById(id) {
            const dtoMascota = {
                id: id,
                idUsuario: 7777777,
                nombre: 'mimi',
                tipo: 'gato',
                terminos: [{ termino: 'Deberas servirle hasta que tu muerte los separe!' }, { termino: 'Purrrrrrrrr' }]
            }

            console.log('Mascota encontrada!');

            return dtoMascota;
        }
    }
}

export default mascotaDAO