import { describe, it } from 'vitest'
import { createConnector } from '../src/mock/Connector'

describe('Init connector', () => {
  it('Assign bot valid token', async () => {
    const { connector } = await createConnector()

    const token = connector.application.environment.cache.get('TOKEN')
    connector.http.defineHeaders({
      Authorization: `Bot ${token}`
    })
  })
})
