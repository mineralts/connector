import { describe, expect, test } from 'vitest'
import { createConnector } from '../src/mock/Connector'

describe('Websocket', async () => {
  const { endpoint } = await createConnector()

  test('Websocket endpoint is valid', () => {
    expect(endpoint.url).not.toBeNull()
    expect(endpoint.url).toEqual('wss://gateway.discord.gg')
  })
})
