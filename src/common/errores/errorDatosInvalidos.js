function crearErrorDatosInvalidos() {
    const err = new Error('datos inválidos')
    err.type = 'ERR_INVALID_DATA'
    return err
  }
  
  export { crearErrorDatosInvalidos }