import Application from './Application'
import { expect } from 'vitest'
import Connector from '../connector'
import { EventEmitter } from 'events'

class Emitter extends EventEmitter {

}

export function createConnectorWithToken () {
  const connector = new Connector(Application, Emitter)

  const token = connector.application.environment.cache.get('TOKEN')

  expect(token).not.toBeNull()
  expect.stringContaining(token)

  connector.http.defineHeaders({
    Authorization: `Bot ${token}`
  })

  return connector
}

export async function createConnector () {
  const version = '/v9/gateway/bot'
  const connector = createConnectorWithToken()
  const endpoint = await connector.http.get(version)

  return {
    version,
    connector,
    endpoint
  }
}