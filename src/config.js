// Completar
import dotenv from 'dotenv'
dotenv.config()


const getTokenSecret = () => process.env.ACCESS_TOKEN_SECRET
const getTokenLife = () => process.env.ACCESS_TOKEN_LIFE
const getRefreshTokenSecret = () => process.env.REFRESH_TOKEN_SECRET
const getRefreshTokenLife = () => process.env.REFRESH_TOKEN_LIFE
const getPort = () => process.env.PORT || 4000
const getCnxStr = () => process.env.CNX_STR
const getMode = () => process.env.MODE || 'TEST'
const getGmailCred = () => JSON.parse(process.env.ACCOUNT_GMAIL)

export {
  getCnxStr, getMode, getPort, getTokenLife, getTokenSecret,
  getRefreshTokenSecret, getRefreshTokenLife, getGmailCred
}