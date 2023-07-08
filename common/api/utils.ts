import fetch from 'cross-fetch';

export function exists<T>(value: T | null | undefined): value is T {
    return !!value;
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