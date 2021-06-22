function procesoAdopcionDAO() {
    return {
        async add(procesoAdopcion) {
            console.log('Proceso de adopcion guardado!');
            return procesoAdopcion;
        },

        async getByID(id) {
            return {
                valorEstado: "Finalizado",
                terminos: "Brindar un hogar",
                humano: {
                    idUsuario: 88888,
                    nick: 'Humano Juan'
                },
                mascota: {
                    idUsuario: 123456789,
                    nombre: 'Branca',
                    tipo: 'Perro',
                    terminos: [{ termino: 'Tener estufa cerca' }, { termino: 'Salir a pasear' }]
                }
            }
        },
        update: (procAdop) => {
            console.log("Proceso de adopcion updated!")
            console.log(procAdop)
            return procAdop
        }
    }
}

export default procesoAdopcionDAO