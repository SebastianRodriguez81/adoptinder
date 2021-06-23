function mailaccount() {
    const accountEthereal = {
        smtp: {
            host: 'smtp.gmail.com',
        port: 465,
        secure: true
    },
    user: '...@gmail.com',
    pass: '...'
    };



    return accountEthereal
}

export { mailaccount }