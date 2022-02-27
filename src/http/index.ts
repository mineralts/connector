/*
 * packages/connector.test.ts
 *
 * (c) Parmantier Baptiste
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import axios, { Axios, AxiosRequestConfig } from 'axios'
import { ApiErrors, JSONObject } from '../types'
import RateLimitException from '../exceptions/RateLimitException'
import ApiError from '../errors/ApiError'

export default class Http {
  private axios: Axios = axios.create({
    baseURL: 'https://discord.com/api'
  })

  constructor (private emitter) {
  }

  public async get (url: string, options?: AxiosRequestConfig) {
    try {
      const { data, status, statusText, headers, request } = await this.axios.get(url, options)
      this.emitter.emit('http', {
        request: {
          method: 'GET',
          headers: request.headers,
          url,
          payload: data
        },
        response: {
          method: 'GET',
          status,
          statusText,
          headers,
          url,
          payload: data
        }
      })
      return data
    } catch (error: any) {
      if (error.response.status === 400) {
        if (Object.values(ApiErrors).includes(error.response.data.code)) {
          new ApiError(error.response)
        }
      }

      if (error.response.status === 429) {
        new RateLimitException(this.emitter, 'GET', url, error.response.data.global, error.response.data.retry_after)
      }

      return undefined
    }
  }

  public async post (url: string, payload, options?: AxiosRequestConfig) {
    try {
      const { data, status, statusText, headers, request } = await this.axios.post(url, payload, options)
      this.emitter.emit('http', {
        request: {
          method: 'POST',
          headers: request.headers,
          url,
          payload: data
        },
        response: {
          method: 'POST',
          status,
          statusText,
          headers,
          url,
          payload: data
        }
      })
      return data
    } catch (error: any) {
      if (error.response.status === 400) {
        if (Object.values(ApiErrors).includes(error.response.data.code)) {
          new ApiError(error.response)
        }
      }

      if (error.response.status === 429) {
        new RateLimitException(this.emitter, 'POST', url, error.response.data.global, error.response.data.retry_after)
      }

      return undefined
    }
  }

  public async put (url: string, payload, options?: AxiosRequestConfig) {
    try {
      const { data, status, statusText, headers, request } = await this.axios.put(url, payload, options)
      this.emitter.emit('http', {
        request: {
          method: 'PUT',
          headers: request.headers,
          url,
          payload: data
        },
        response: {
          method: 'PUT',
          status,
          statusText,
          headers,
          url,
          payload: data
        }
      })
      return data
    } catch (error: any) {
      if (error.response.status === 400) {
        if (Object.values(ApiErrors).includes(error.response.data.code)) {
          new ApiError(error.response)
        }
      }

      if (error.response.status === 429) {
        new RateLimitException(this.emitter, 'PUT', url, error.response.data.global, error.response.data.retry_after)
      }

      return undefined
    }
  }

  public async patch (url: string, payload, options?: AxiosRequestConfig) {
    try {
      const { data, status, statusText, headers, request } = await this.axios.patch(url, payload, options)
      this.emitter.emit('http', {
        request: {
          method: 'PATCH',
          headers: request.headers,
          url,
          payload: data
        },
        response: {
          method: 'PATCH',
          status,
          statusText,
          headers,
          url,
          payload: data
        }
      })
      return data
    } catch (error: any) {
      if (error.response.status === 400) {
        if (Object.values(ApiErrors).includes(error.response.data.code)) {
          new ApiError(error.response)
        }
      }

      if (error.response.status === 429) {
        new RateLimitException(this.emitter, 'PATCH', url, error.response.data.global, error.response.data.retry_after)
      }

      return undefined
    }
  }

  public async delete (url: string, options?: AxiosRequestConfig) {
    try {
      const { data, status, statusText, headers, request } = await this.axios.delete(url, options)
      this.emitter.emit('http', {
        request: {
          method: 'DELETE',
          headers: request.headers,
          url,
          payload: data
        },
        response: {
          method: 'DELETE',
          status,
          statusText,
          headers,
          url,
          payload: data
        }
      })
      return data
    } catch (error: any) {
      if (error.response.status === 400) {
        if (Object.values(ApiErrors).includes(error.response.data.code)) {
          new ApiError(error.response)
        }
      }

      if (error.response.status === 429) {
        new RateLimitException(this.emitter, 'DELETE', url, error.response.data.global, error.response.data.retry_after)
      }

      return undefined
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