import MineralError from './MineralError'

export default class HttpError extends MineralError {
  constructor (message: string) {
    super('HTTP Error ' + message)
  }
}