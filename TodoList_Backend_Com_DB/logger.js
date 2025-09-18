const pino = require('pino')

const Logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translatetime: 'HH:MM:ss'
        }
    }
})

module.exports = Logger