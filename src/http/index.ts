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
import { RateLimitException } from '@mineralts/core'

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

  public async post (url: string, payload, options?: AxiosRequestConfig) {
    try {
      const { data } = await this.axios.post(url, payload, options)
      return data
    } catch (error: any) {
      console.log(error.response.data)
      throw new HttpError(error.response.data.message)
    }
  }

  public async patch (url: string, payload, options?: AxiosRequestConfig) {
    try {
      const { data } = await this.axios.patch(url, payload, options)
      return data
    } catch (error: any) {
      if (error.response.status === 429) {
        new RateLimitException(error.response.data.retry_after)
      }
    }
  }

  public async delete (url: string, options?: AxiosRequestConfig) {
    try {
      const { data } = await this.axios.delete(url, options)
      return data
    } catch (error: any) {
      if (error.response.status === 429) {
        new RateLimitException(error.response.data.retry_after)
      }
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

  public resetHeaders (...headers: string[]) {
    Object.entries(headers).forEach(([key]: [string, string]) => {
      delete this.axios.defaults.headers.common[key]
    })
  }
}