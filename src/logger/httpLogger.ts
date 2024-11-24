import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, json, printf } = winston.format
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss'

const fileRotateTransport = new DailyRotateFile({
  dirname: 'logs',
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
})

export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data
      }

      return JSON.stringify(response)
    })
  ),
  // store logs in the console
  transports: [fileRotateTransport]
})
