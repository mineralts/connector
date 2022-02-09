/*
 * packages/RateLimitException.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import Logger from '@mineralts/logger'

export default class RateLimitException {
  constructor (duration: number) {
    const logger = new Logger()
    logger.warn(`You have been rate limit by the discord api, please try again in ${(duration / 1000).toFixed()} seconds.`)
  }
}