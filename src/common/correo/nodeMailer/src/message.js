import mailValidator from 'email-validator'

const MSJ_ERROR_INVALID_MESSAGE = "Formato del mensaje inválido.";
const MSJ_ERROR_INVALID_MESSAGE_TO = "Destinatario del mensaje faltante o inválido.";
const MSJ_ERROR_INVALID_MESSAGE_SUBJECT = "Asunto del mensaje faltante o inválido.";
const MSJ_ERROR_INVALID_MESSAGE_BODY = "Cuerpo del mensaje faltante o inválido.";

function validateTo(to) {
    if (!Array.isArray(to)) {
        return false;
    }
    if (to.length == 0) {
        return false;
    }
    to.forEach(destination => {
        if (!mailValidator.validate(destination)) {
            return false;
        }
    })
    return true;
}

function validateSubject(subject) {
    if (typeof subject != 'string') {
        return false;
    }
    return true;
}

function validateBody(body) {
    if (typeof body != 'string') {
        return false;
    }
    return true
}

function compareTo(To1, To2) {
    if (To1.length !== To2.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
        const aCount = To1.filter(e => e === v).length;
        const bCount = To2.filter(e => e === v).length;
        if (aCount !== bCount) return false;
    }
    return true;
}

function Message(to, subject, body) {
    try {
        if (!validateTo(to)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_TO); }
        if (!validateSubject(subject)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_SUBJECT); }
        if (!validateBody(body)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_BODY); }
    } catch (error) {
        throw new Error(MSJ_ERROR_INVALID_MESSAGE + ': ' + error.message);
    }

    return {
        to: to.slice(),
        subject: subject,
        body: body,

        setTo(to) {
            if (!validateTo(to)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_TO); }
            this.to = to.slice();
        },

        getTo() {
            return this.to.slice();
        },

        setSubject(subject) {
            if (!validateSubject(subject)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_SUBJECT); }
            this.subject = subject;
        },

        getSubject() {
            return this.subject;
        },

        setBody(body) {
            if (!validateBody(body)) { throw new Error(MSJ_ERROR_INVALID_MESSAGE_BODY); }
            this.body = body;
        },

        getBody() {
            return this.body;
        },

        toPlainObject() {
            return {
                to: this.to.slice(),
                subject: this.subject,
                body: this.body
            }
        },

        equals(message) {
            try {
                if (JSON.stringify(this.to) === JSON.stringify(message.To)) { return false; }
                if (!this.subject === message.subject) { return false; }
                if (!this.body === message.body) { return false; }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

export default Message