import Logger from '@mineralts/logger'
import Http from '../http'

export default ({
  appRoot: 'E:\\WindowsData\\Bureau\\Mineral\\packages\\test',
  environment: {
    cache: new Map()
      .set('TOKEN', 'Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.UCN8KbrzkfZJ-HBtMiV9ViTrV_0')
      .set('DEBUG', true)
  },
  logger: new Logger(),
  request: new Http(),
  apiSequence: 2,
  appName: 'MyApp',
  version: '1.0.0',
  debug: true,
  mode: 'development',
  rcFile: {
    commands: ['@mineralts/core-preview'],
    aliases: { App: 'src', Config: 'config', Contracts: 'contracts' },
    preloads: ['./start/index'],
    statics: []
  },
  container: {
    events: {},
    commands: {},
    menus: {},
    schedulers: {},
    providers: {}
  },
  helper: {
    SMALL_WORDS: /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i,
    TOKENS: /[^\s:–—-]+|./g,
    WHITESPACE: /\s/,
    IS_MANUAL_CASE: /.(?=[A-Z]|\..)/,
    ALPHANUMERIC_PATTERN: /[A-Za-z0-9\u00C0-\u00FF]/
  },
  client: {
    container: {
      events: [],
      commands: [],
      menus: [],
      schedulers: {},
      providers: []
    },
    token: 'Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.UCN8KbrzkfZJ-HBtMiV9ViTrV_0',
    options: {},
    user: {},
    sessionId: '0a4d723d4a488e57fca3d155ea8987f8',
    presences: [],
    application: {},
    commands: {},
    guilds: { cache: {} },
    privates: { cache: {} }
  },
  intents: 32767
})
