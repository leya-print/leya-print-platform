import { IRequestOptions } from "./declarations";

export function exists<T>(value: T | null | undefined): value is T {
    return !!value;
}

export async function fetchWithTimeout(resource: RequestInfo, options: IRequestOptions) {
    
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