function crearErrorUsuarioExistente() {
    const err = new Error('nombre de usuario existente')
    err.type = 'ERR_USER_EXISTS'
    return err
  }
  
  export { crearErrorUsuarioExistente }