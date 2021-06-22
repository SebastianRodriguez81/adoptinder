import nodemailer from 'nodemailer'
import Message from './message.js'
import SmtpAccount from './smtpAccount.js'

const MSJ_ERROR_INVALID_ACCOUNT = "Formato de la cuenta inválido.";
const MSJ_ERROR_INVALID_MESSAGE = "Formato del mensaje inválido.";
const MSJ_ERROR_MISSING_ACCOUNT = "Falta cuenta.";
const MSJ_ERROR_MISSING_MESSAGE = "Falta mensaje.";
const MSJ_ERROR_SEND_MESSAGE = "Hubo un error al enviar un mensaje.";

function parseAccount(account) {
    try {
        return {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        }
    } catch (error) {
        throw new Error(MSJ_ERROR_INVALID_ACCOUNT);
    }
}

function parseMessage(message) {
    try {
        return {
            to: message.to.slice(),
            subject: message.subject,
            html: message.body
        };
    } catch (error) {
        throw new Error(MSJ_ERROR_INVALID_MESSAGE);
    }
}

function createTransport(account) {
    return nodemailer.createTransport(parseAccount(account));
}

async function createVerifiedTransport(account) {
    const transporter = createTransport(account);
    const transporterVerified = await transporter.verify();
    if (!transporterVerified) {
        throw new Error(MSJ_ERROR_INVALID_ACCOUNT);
    }
    return transporter;
}

function validateMessage(message) {
    if (message === undefined) {
        return false;
    }
    return true;
}

function validateAccount(account) {
    if (account === undefined) {
        return false;
    }
    return true;
}

function MailSender(account) {
    let smtpAccount;
    if (account != undefined) {
        validateAccount(account);
        smtpAccount = SmtpAccount(account.user, account.pass, account.smtp.host, account.smtp.port, account.smtp.secure);
    }

    return {
        account: smtpAccount,
        messages: [],

        setCuenta(account) {
            try {
                if (!validateAccount(account)) { throw new Error(MSJ_ERROR_MISSING_ACCOUNT); };
                const smtpAccount = SmtpAccount(account.user, account.pass, account.smtp.host, account.smtp.port, account.smtp.secure);
                this.account = smtpAccount;
                return { account: account, accepted: true, rejected: false };
            } catch (error) {
                console.log(error); //CONSOLE.LOG()
                return { account: account, accepted: false, rejected: error.message };
            }
        },

        addMensaje(message) {
            try {
                if (!validateMessage(message)) { throw new Error(MSJ_ERROR_MISSING_MESSAGE); };
                const sendMessage = Message(message.to, message.subject, message.body);
                this.messages.push(sendMessage);
                return { message: message, accepted: true, rejected: false };
            } catch (error) {
                console.log(error); //CONSOLE.LOG()
                return { message: message, accepted: false, rejected: error.message };
            }
        },

        clearMensaje() {
            this.messages = [];
            return true;
        },

        async enviarMail(message) {
            try {
                if (!validateAccount(this.account)) { throw new Error(MSJ_ERROR_MISSING_ACCOUNT); };
                if (!validateMessage(message)) { throw new Error(MSJ_ERROR_MISSING_MESSAGE); };
                const transporter = createTransport(this.account);
                const sendMessage = Message(message.to, message.subject, message.body);
                const info = await transporter.sendMail(parseMessage(sendMessage));

                return { message: sendMessage.toPlainObject(), accepted: info.accepted, rejected: info.rejected };
            } catch (error) {
                console.log(error); //CONSOLE.LOG()
                throw new Error(MSJ_ERROR_SEND_MESSAGE + ': ' + error.message);
            }
        },

        async enviarMails() {
            try {
                if (!validateAccount(this.account)) { throw new Error(MSJ_ERROR_MISSING_ACCOUNT); };
                const sendedMessages = { messages: [], errorMessages: [] };
                const transporter = await createVerifiedTransport(this.account);

                while (this.messages.length) {
                    const sendMessage = this.messages.shift()
                    try {
                        const info = await transporter.sendMail(parseMessage(sendMessage));
                        sendedMessages.messages.push({ message: sendMessage.toPlainObject(), accepted: info.accepted, rejected: info.rejected });
                    } catch (error) {
                        console.log(error); //CONSOLE.LOG()
                        sendedMessages.errorMessages.push({ message: sendMessage.toPlainObject(), error: error.message });
                    }
                }

                return sendedMessages;
            } catch (error) {
                console.log(error); //CONSOLE.LOG()
                throw new Error(MSJ_ERROR_SEND_MESSAGE + ': ' + error.message);
            }
        }
    }
}

export default MailSender