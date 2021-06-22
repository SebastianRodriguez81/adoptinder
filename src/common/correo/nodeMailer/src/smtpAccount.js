const MSJ_ERROR_INVALID_ACCOUNT = "Formato de la cuenta inválido.";

function validateUser(user) {
    if (typeof user != 'string') {
        return false;
    }
    if (user.length === 0) {
        return false;
    }
    return true;
}

function validatePass(pass) {
    if (typeof pass != 'string') {
        return false;
    }
    if (pass.length === 0) {
        return false;
    }
    return true
}

function validateHost(host) {
    if (typeof host != 'string') {
        return false;
    }
    if (host.length === 0) {
        return false;
    }
    return true
}

function validatePort(port) {
    if (typeof port != 'number') {
        return false;
    }
    if ((port < 1) & ((port % 1) == 0)) {
        return false;
    }
    return true
}

function validateSecure(secure) {
    if (typeof secure != 'boolean') {
        return false;
    }
    return true
}

function SmtpAccount(user, pass, host, port, secure) {
    try {
        if (!validateUser(user)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
        if (!validatePass(pass)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
        if (!validateHost(host)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
        if (!validatePort(port)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
        if (!validateSecure(secure)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
    } catch (error) {
        throw new Error(MSJ_ERROR_INVALID_MESSAGE + ': ' + error.message);
    }

    return {
        smtp: {
            host: host,
            port: port,
            secure: secure
        },
        user: user,
        pass: pass,


        setUser(user) {
            if (!validateUser(user)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
            this.user = user;
        },

        getUser() {
            return this.user;
        },

        setPass(pass) {
            if (!validatePass(pass)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
            this.pass = pass;
        },

        setHost(host) {
            if (!validateHost(host)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
            this.host = host;
        },

        getHost() {
            return this.host;
        },

        setPort(port) {
            if (!validatePort(port)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
            this.port = port;
        },

        getPort() {
            return this.port;
        },

        setSecure(secure) {
            if (!validateSecure(secure)) { throw new Error(MSJ_ERROR_INVALID_ACCOUNT); }
            this.secure = secure;
        },

        getSecure() {
            return this.secure;
        },

        toPlainObject() {
            return {
                smtp: {
                    host: this.host,
                    port: this.port,
                    secure: this.secure
                },
                user: this.user,
                pass: this.pass,
            }
        },

        equals(smtpAccount) {
            try {
                if (!this.user === smtpAccount.user) { return false; }
                if (!this.pass === smtpAccount.pass) { return false; }
                if (!this.smtp.host === smtpAccount.smtp.host) { return false; }
                if (!this.smtp.port === smtpAccount.smtp.port) { return false; }
                if (!this.smtp.secure === smtpAccount.smtp.secure) { return false; }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

export default SmtpAccount