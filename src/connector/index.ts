/*
 * @mineralts/index.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */


import Socket from '../socket'
import Http from '../http'
import Logger from '@mineralts/logger'

export default class Connector {
  public socket: Socket
  public http: Http

  constructor (public application: { logger: Logger, token: string }) {
    this.socket = new Socket(this)
    this.http = new Http()

    if (!this.application.token) {
      this.application.logger.fatal('No token has been defined.')
      process.exit(1)
    }
  }
}