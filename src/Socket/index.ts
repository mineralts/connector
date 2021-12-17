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
import Connector from '../Connector'
import WebSocket, { Data } from 'ws'
import { JSONObject, Opcode, WebsocketPayload } from '../types'

export default class Socket {
  private websocket!: WebSocket
  private reactor!: Observable<any>
  private heartbeat: Heartbeat

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
      this.connector.application.logger.info('Socket opened')
      const request = this.request(Opcode.IDENTIFY, {
        token: this.connector.application.token,
        properties: {
          $os: process.arch,
        },
        compress: false,
        large_threshold: 250,
        intents: []
      })

      this.websocket.send(request)
    })

    this.websocket.on('error', (error: Error) => {
      this.connector.application.logger.fatal(error.message)
    })

    this.websocket.on('close', (a, b) => {
      this.connector.application.logger.fatal(`${a} : ${b.toString()}`)
      this.heartbeat.shutdown()
    })
  }

  public dispatch (callback: (payload: WebsocketPayload) => JSONObject<any>) {
    this.reactor.subscribe((payload: any) => {
      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === Opcode.HELLO) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }

      if (payload.t) {
        callback(payload)
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