/** interface for enviroment paths, 
 * properties: 
 * @property title, 
 * @property pdfServiceBaseUrl, 
 * @property templateServiceBaseUrl, 
 * @property templateBaseUrl, 
 * @property storageLocation
*/
export interface Env {
    /** title of the environment file */
    title?: string,
    /** Backend server service for generating PDFs */  
    pdfServiceBaseUrl?: string,
    /** Backend server service for generating templates */  
    templateServiceBaseUrl?: string,
    /** URL for static templates */  
    templateBaseUrl?: string,
    /** Path to data folder */
    storageLocation?: string,
}

