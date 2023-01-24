const backendPort = 6001;
const backendBaseUrl = window.location.href.includes('gitpod.io')
    ? `${window.location.href.split('/').slice(0, 3).join('/').replace('6002', '' + backendPort)}`
    : `http://localhost:${backendPort}`
;

const templatePort = 3333;
const templateBaseUrl = window.location.href.includes('gitpod.io')
    ? `${window.location.href.split('/').slice(0, 3).join('/').replace('6002', '' + templatePort)}`
    : `http://localhost:${templatePort}`
;

export const env = {
    backendPort,
    backendBaseUrl,
    templatePort,
    templateBaseUrl,
};
