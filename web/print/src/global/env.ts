export const env: PromiseLike<Env> = fetch('/print/assets/env.json').then((response) => response.json());

export interface Env {
    /**
   * Backend server service for generating PDFs   
   */  
    pdfServiceBaseUrl: string,
   /**
   * Backend server service for generating templates
   */  
    templateServiceBaseUrl: string,
   /**
   * URL for static templates
   */  
    templateBaseUrl: string,
}