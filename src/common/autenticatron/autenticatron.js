import jwt from 'jsonwebtoken'
import { getRefreshTokenLife, getRefreshTokenSecret, 
         getTokenSecret, getTokenLife } from '../../config.js'

export const crearAutenticatron = (daoUsuarios) => {
    return {
        
        login: (req, res) => {
            const username = req.body.username
            const password = req.body.password
            const email = req.body.email
            
            const user = daoUsuarios.buscarPorUsername(username)
            
            // Esto también es provisorio
            if (!username || !password || user.password !== password){
                return res.status(401).send('Error en la verificación de datos de usuario')
            }
    
            // Usamos el payload para almacenar información del usuario, nombre, rol, password, etc
            const payload = {username: username, password: password, email: email}
    
            // Creamos el accessToken con una vida útil corta
            const accessToken = jwt.sign(payload, getTokenSecret(), {
                algorithm: "HS256",
                expiresIn: getTokenLife()
            })
    
            // Creamos el resfreshToken con una vida útil más larga
            const refreshToken = jwt.sign(payload, getRefreshTokenSecret(), {
                algorithm: "HS256",
                expiresIn: getRefreshTokenLife()
            })
    
            // Guardamos el refreshToken 
            daoUsuarios.buscarPorUsername(username).refreshToken = refreshToken
    
            // Mandamos el accessToken al cliente dentro de una cookie
            res.cookie("jwt", accessToken, {secure: false, httpOnly: true})
            res.send('Usuario válido')
        },

        refresh: (req, res) => {
            const accessToken = req.cookies.jwt
    
            if (!accessToken){
                return res.status(403).send()
            }
    
            let payload
            try{
                payload = jwt.verify(accessToken, getTokenSecret())
            }
            catch(e){
                return res.status(401).send("error al verificar accessToken " + e.message)
            }
    
            // Recuperamos el refreshToken 
            const refreshToken = daoUsuarios.buscarPorUsername(payload.username).refreshToken
    
            // Verificamos el refreshToken
            try{
                jwt.verify(refreshToken, getRefreshTokenSecret())
            }
            catch(e){
                return res.status(401).send("error al verificar el resfreshToken " + e.message)
            }
    
            const newToken = jwt.sign(payload, getTokenSecret(), 
            {
                algorithm: "HS256",
                //expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
    
            res.cookie("jwt", newToken, {secure: false, httpOnly: true})
            res.send("Resfresh Token enviado con éxito")
        },

        verify: (req, res, next) => {
            const accessToken = req.cookies.jwt
            // Si no hay Token en las cookies, el request no es autorizado
            if (!accessToken){
                return res.status(403).send("No se ha encontrado Token en las Cookies. Dónde está ese Token??")
            }
                        
            try{
                // usamos el método jwt.verify para verificar el access token
                // lanza un error si el token expiró o tiene una firma inválida
                jwt.verify(accessToken, getTokenSecret())
                next()
            }
            catch(e){
                // si hay un error retornamos un 401, request no autorizado
                return res.status(401).send(`Error en la verificación del token: ${e.message}`)
            }
        }
    }
    
}

