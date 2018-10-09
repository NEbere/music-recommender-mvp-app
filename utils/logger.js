const errorLogger = (errorMessage, error) => {
    return console.error(`${errorMessage}: ${error}`)
}

const infoLogger = (infoMessage, info) =>{
    return console.info(`${infoMessage}: ${info}`)
}

module.exports = {
    errorLogger,
    infoLogger
}