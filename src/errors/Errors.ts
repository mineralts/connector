/*
 * packages/Errors.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

export const Rpc = {
  1000:	'Unknown error.',
  4000:	'Invalid payload.',
  4002:	'Invalid command.',
  4003:	'Invalid guild.',
  4004:	'Invalid event.',
  4005:	'Invalid channel.',
  4006:	'Invalid permissions.',
  4007:	'Invalid client ID.',
  4008:	'Invalid origin.',
  4009:	'Invalid token.',
  4010:	'Invalid user.',
  5000:	'OAuth2 error.',
  5001:	'Select channel timed out.',
  5002:	'GET_GUILD timed out.',
  5003:	'Select voice force required.',
  5004:	'Capture shortcut already listening.',
}

export const Gateway = {
  4000: 'You sent an invalid payload.',
  4001: 'Unknown opcode.',
  4002: 'Invalid command name specified.',
  4003: 'Not authenticated.',
  4004: 'Authentication failed.',
  4005: 'Already authenticated.',
  4007: 'Invalid seq.',
  4008: 'Rate limited.',
  4009: 'Session timed out.',
  4010: 'Invalid shard.',
  4011: 'Sharding required.',
  4012: 'Invalid API version.',
  4013: 'Invalid intents.',
  4014: 'Disallowed intents.'
}