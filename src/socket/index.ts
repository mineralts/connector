/*
 * @mineralts/index.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import Heartbeat from './HearthBeat'
import { Observable, Subscriber } from 'rxjs'
import Connector from '../connector'
import WebSocket, { Data } from 'ws'
import { JSONObject, Opcode, WebsocketPayload } from '../types'
import Rpc from '../errors/Rpc'

export default class Socket {
  public websocket!: WebSocket
  private reactor!: Observable<any>
  private heartbeat: Heartbeat
  public sessionId!: string

  constructor (public connector: Connector) {
    this.heartbeat = new Heartbeat(this)
  }

  public async connect<T = JSONObject<any>> (): Promise<void> {
    const version = '/v9/gateway/bot'
    const data = await this.connector.http.get(version)

    this.websocket = new WebSocket(data.url + version)

    this.reactor = new Observable<T>((observer: Subscriber<T>) => {
      this.websocket.on('message', async (data: Data) => {
        const payload: T = JSON.parse(data.toString())
        observer.next(payload)
      })
    })

    this.websocket.on('open', () => {
      this.connector.application.logger.info('socket opened')
      const request = this.request(Opcode.IDENTIFY, {
        token: this.connector.application.token,
        properties: { $os: process.arch },
        compress: false,
        large_threshold: 250,
        intents: 32767
      })

      this.websocket.send(request)
    })

    this.websocket.on('error', (error: Error) => {
      this.connector.application.logger.fatal(error.message)
    })

    this.websocket.on('close', (code) => {
      this.connector.application.logger.fatal(`${code} : ${Rpc[code]}`)
      this.heartbeat.shutdown()
    })
  }

  public dispatch (callback: (payload: WebsocketPayload) => JSONObject<any>) {
    this.reactor.subscribe((payload: any) => {
      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === Opcode.HELLO) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }
    })
  }

  public request (code: Opcode, payload): Buffer {
    return Buffer.from(
      JSON.stringify({
        op: code,
        d: payload
      })
    )
  }
}