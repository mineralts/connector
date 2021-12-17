/*
 * @mineralts/HearthBeat.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import Socket from './index'

export default class Heartbeat {
  private scheduler: any
  constructor (private socket: Socket) {
  }

  public watchSession (sessionId: string) {
    // if (sessionId) {
    //   this.socket.websocket.client.sessionId = sessionId
    // }
  }

  public beat (interval: number) {
    this.scheduler = setInterval(() => {
      // const request = this.socket.request(Opcode.HEARTBEAT, {
      //   session_id: this.socket.websocket.client.sessionId
      // })
      //
      // this.socket.websocket.send(request)
      this.socket.connector.application.logger
      this.socket.connector.application.logger.info('Sending a heartbeat')
    }, interval)
  }

  public shutdown () {
    clearInterval(this.scheduler)
  }
}