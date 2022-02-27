/*
 * packages/RateLimitException.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import { EventEmitter } from 'events'
import { DateTime } from 'luxon'

export default class RateLimitException extends EventEmitter {
  constructor (emitter, url: string, method: string, global: boolean, duration: number) {
    super()
    emitter.emit('rateLimit', { global, url, method, retryAfter: DateTime.now().plus({ millisecond: duration }) })
  }
}