import Logger from '@mineralts/logger'

export default class MineralError {
  constructor (message: string) {
    const logger = new Logger()
    logger.fatal(message)

    process.exit(1)
  }
}