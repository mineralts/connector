import Logger from '@mineralts/logger'

export default class ApiError {
  constructor (response) {
    const logger = new Logger()
    logger.fatal(`[${response.request.method}] ${response.status} ${response.statusText} : ${response.data.message}`)
  }
}