/*
 * packages/Rpc.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

export default {
  1000: 'The connection was terminated normally.',
  1001: 'An error has occurred on the server or the browser leaves the page that opened the connection.',
  1002: 'The other side of the connection terminates the connection due to a protocol error.',
  1003: 'The connection is terminated because the server has received data of a type it cannot accept.',
  1005: 'No code is given although a code was expected.',
  1006: 'The connection was terminated abnormally.',
  1007: 'A message containing inconsistent data has been received.',
  1008: 'A message is received that does not respect the server policy.',
  1009: 'The data received is too large',
  4000: 'You sent an invalid payload.',
  4002: 'Invalid command name specified.',
  4003: 'Invalid guild ID specified.',
  4004: 'Invalid event name specified.',
  4005: 'Invalid channel ID specified.',
  4006: 'You lack permissions to access the given resource.',
  4007: 'ID	An invalid OAuth2 application ID was used to authorize or authenticate with.',
  4008: 'An invalid OAuth2 application origin was used to authorize or authenticate with.',
  4009: 'An invalid OAuth2 token was used to authorize or authenticate with.',
  4010: 'The specified user ID was invalid.',
  5000: 'A standard OAuth2 error occurred; check the data object for the OAuth2 error details.',
  5001: 'An asynchronous SELECT_TEXT_CHANNEL/SELECT_VOICE_CHANNEL command timed out.',
  5002: 'An asynchronous GET_GUILD command timed out.',
  5003: 'You tried to join a user to a voice channel but the user was already in one.',
  5004: 'You tried to capture more than one shortcut key at once.',
}