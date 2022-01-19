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
    const endpoint = await this.getWebsocketEndpoint(version)

    this.websocket = new WebSocket(endpoint?.url + version)

    this.reactor = new Observable<T>((observer: Subscriber<T>) => {
      this.websocket.on('message', async (data: Data) => {
        const payload: T = JSON.parse(data.toString())
        observer.next(payload)
      })
    })

    this.websocket.on('open', () => {
      if (this.connector.application.debug) {
        this.connector.application.logger.info('Socket opened')
      }

      const request = this.request(Opcode.IDENTIFY, {
        token: this.connector.application.environment.cache.get('TOKEN'),
        properties: { $os: process.arch },
        compress: false,
        large_threshold: 250,
        intents: this.connector.application.intents
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

  private async getWebsocketEndpoint (version: string): Promise<{ url: string } | undefined> {
    return this.connector.http.get(version)
  }

  public dispatch (callback: (payload: WebsocketPayload) => any) {
    this.reactor.subscribe((payload: any) => {
      this.heartbeat.watchSession(payload.d?.session_id)

      if (payload.op === Opcode.HELLO) {
        this.heartbeat.beat(payload.d.heartbeat_interval)
      }

      callback(payload)
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