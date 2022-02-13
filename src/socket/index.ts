/*
 * @mineralts/connector.test.ts
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
import { Gateway } from '../errors/Errors'

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

    if (!endpoint) {
      this.connector.application.logger.fatal('The websocket endpoint was not found.')
      process.exit(1)
    }

    this.websocket = new WebSocket(endpoint.url + version)

    this.reactor = new Observable<T>((observer: Subscriber<T>) => {
      this.websocket.on('message', (data: Data) => {
        const payload: T = JSON.parse(data.toString())
        observer.next(payload)
      })
    })

    this.websocket.on('error', (error: Error) => {
      this.connector.application.logger.fatal(error.message)
      this.reconnect()
    })

    this.websocket.on('close', async (code: number) => {
      this.connector.application.logger.fatal(`${code} : ${Gateway[code] || 'Unknown error.'}`)
      this.heartbeat.shutdown()
      //
      // console.log('code', code)
      // if ([1000, 1001, 1002, 1003, 1005, 1006, 1007, 1008, 1009].includes(code)) {
      //   await this.reconnect()
      // }
    })
  }

  public authenticate () {
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
  }

  public async reconnect () {
    if (this.connector.application.debug) {
      this.connector.application.logger.info('Attempting to reconnect')
    }

    // const reconnectRequest = this.request(Opcode.RESUME, {
    //   token: this.connector.application.environment.cache.get('TOKEN'),
    //   session_id: this.sessionId,
    //   seq: this.connector.application.apiSequence
    // })

    this.close()
    await this.connect()
    await this.authenticate()

    // this.websocket.on('open', () => {
    //   this.websocket.send(reconnectRequest)
    // })
  }

  public close () {
    this.websocket.close(200)
    this.heartbeat.shutdown()
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