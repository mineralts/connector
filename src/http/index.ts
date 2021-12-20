/*
 * packages/index.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import axios, { Axios, AxiosRequestConfig } from 'axios'
import { JSONObject } from '../types'
import HttpError from '../errors/HttpError'

export default class Http {
  private axios: Axios = axios.create({
    baseURL: 'https://discord.com/api',
  })

  public async get (url: string, options?: AxiosRequestConfig) {
    try {
      const { data } = await this.axios.get(url, options)
      return data
    } catch (error: any) {
      throw new HttpError(error.response.data.message)
    }
  }

  /**
   * Define default axios headers
   * @param headers
   */
  public defineHeaders (headers: JSONObject<string>) {
    Object.entries(headers).forEach(([key, value]: [string, string]) => {
      this.axios.defaults.headers.common[key] = value
    })
  }
}