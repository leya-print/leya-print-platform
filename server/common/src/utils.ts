import fetch from 'cross-fetch';
import { v4 as createUuid } from 'uuid';
import type express from 'express';

export function exists<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

export async function fetchWithTimeout(resource: RequestInfo, options: FetchTimeoutOptions) {
    options.timeout = options.timeout ? options.timeout : 5000;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options?.timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    
    clearTimeout(id);
  
    return response;
}

export function getETagHeader() {
    return `"${Date.now().toString()}"`;
}

/** interface for http request options, 
* properties: 
* @property timeout
*/
export interface FetchTimeoutOptions {
    /** request timeout value */
    timeout?: number,
}

export function sendError(
    res: express.Response,
    statusCode: number,
    type: string,
    title: string,
    detail: string,
    additional: any = {},
    logLevel?: 'info' | 'warn' | 'error',
  ) {
    const error = {
      type: `https://leya-print.de/errors/${type}`,
      title,
      status: statusCode,
      instance: createUuid(),
      detail,
      ...additional,
    };
    res
      .contentType('application/problem+json')
      .status(statusCode)
      .send(error)
    ;
    if (logLevel) { console[logLevel](error); }
  }
  