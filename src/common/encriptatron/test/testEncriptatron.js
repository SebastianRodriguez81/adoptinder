import { crearEncriptatron } from "../encriptatron.js"

const encriptatron = crearEncriptatron()

// Test encript 
const hash = await encriptatron.encriptar('prueba1')

console.log(hash)

// Test comprobación 1
const resultado = await encriptatron.verificar({ passwordHash: hash }, 'prueba1')

console.log(resultado)

// Test comprobación 2
const resultado2 = await encriptatron.verificar({ passwordHash: hash }, 'pruebaerronea')

console.log(resultado2)

