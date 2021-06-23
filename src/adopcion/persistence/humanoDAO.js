function humanoDAO() {
    return {
        async getById(id) {
            const dtoHumano = {
                id: id,
                idUsaario: 123456789,
                nick: 'Pepe Argento'
            }
            
            console.log('humano encontrado!');

            return dtoHumano;
        }
    }
}

export default humanoDAO