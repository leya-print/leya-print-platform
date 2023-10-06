import { ServiceStatuses } from '@leya-print/server-common';
import fetch from 'cross-fetch';

export class PdfService {
    async checkSystemsAlive(env: any) {                      
          const [tplServiceHealthStatus, printEndpointHealthStatus] = await Promise.all([
            await fetch(`${env.templateServiceBaseUrl}/alive`)
                  .then((res: any) => { return res.status === undefined ? 'NOT FOUND' : res.status })
                  .catch((err: any) => 
                  {
                    console.log('error encountered: ', err);
                    return err?.code
                  }),
            await fetch(`${env.printEndpoint}`)
                  .then((res: any) => { return res.status === undefined ? 'NOT FOUND' : res.status })
                  .catch((err: any) =>           
                  {
                    console.log('error encountered: ', err);
                    return err?.code
                  })
          ]);
                    
          const serviceStatuses : ServiceStatuses = {
              printEndpointHealthStatus: printEndpointHealthStatus,
              tplServiceHealthStatus: tplServiceHealthStatus
          };
        
          console.log("healthCheckTplService", serviceStatuses.tplServiceHealthStatus);
          console.log("healthCheckPrintEnpoint", serviceStatuses.printEndpointHealthStatus);

          return serviceStatuses                      
    }
}