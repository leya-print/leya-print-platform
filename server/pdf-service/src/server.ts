import { getETagHeader, getEnv, sendError } from '@leya-print/server-common';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import { PdfFactory } from './pdf-factory';
import { PdfSigner } from './pdf-signer';
import { PdfService } from './pdf.service';

const upload = multer({ storage: multer.memoryStorage() });

const env = getEnv({
  title: 'localhost env',  
  printEndpoint: 'http://127.0.0.1:6003/print',
  templateServiceBaseUrl: 'http://localhost:6001/tpl',
  certificatesPath: '../certificates',
});

console.log('pdf service: print endpoint: ' + env.printEndpoint);
console.log('pdf service: template service endpoint: ' + env.templateServiceBaseUrl);

const pdfService = new PdfService();
const pdfFactory = new PdfFactory(env.printEndpoint);
const pdfSigner = new PdfSigner(env.certificatesPath);
const app = express();

const corsOptions: cors.CorsOptions = { 
  origin: '*'
};

app.use('/pdf', (req, res, next) => cors(corsOptions)(req, res, next));
app.use('/sign', (req, res, next) => cors(corsOptions)(req, res, next));

app.get('/pdf/alive', async (_req, res) => {
  try {
    const response: any = await pdfService.checkSystemsAlive(env);

    if (response?.printEndpointHealthStatus !== 200 || response?.tplServiceHealthStatus !== 200)
      {
        // ETag header to prevent 304 status which breaks live check.
        res.setHeader("Cache-Control", "no-cache")
        .setHeader("ETag", `"${getETagHeader()}"`)
        .send(`Health status: PrintEnpoint: ${response?.printEndpointHealthStatus}, Template Service: ${response?.tplServiceHealthStatus}`)              
        return
      }

    // ETag header to prevent 304 status which breaks live check. 
    res.setHeader("Cache-Control", "no-cache")      
    .setHeader("ETag", `"${getETagHeader()}"`)
    .send("Ok");  

    } catch (error: any) {        
      sendError(res, 503, error?.type, 'Service availability error', error?.code);
    }
});

app.post('/pdf/:templateId/*', bodyParser.urlencoded({ extended: true }), async(req, res) => {
  try {
    const pdf = await pdfFactory.create(req.params.templateId, req.query, req.body?.payload);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf); 
  } catch (error: any) {
    sendError(res, 503, error?.type, 'PDF creation error', error?.code);
  }
});

app.post('/sign/:certificateId', upload.single('pdf'), async (req, res) => {
  const certificateId = req.params.certificateId; 

  const reason = req.query.reason?.toString() || 'No reason provided';  
  const location = req.query.location?.toString() || 'No contact information provided';
  const name = req.query.name?.toString() || 'No contact information provided';
  const contactInfo = req.query.contactInfo?.toString() || 'No contact information provided';    
  
  if (!req.file) {    
    sendError(res, 500, 'system', 'Pdf Service no file', 'No PDF file provided');
    return
  }

  const pdf = req.file;

  try {
    const signedPdf = await pdfSigner.signPdf(certificateId, pdf.buffer, {reason, name, location, contactInfo});    

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `'attachment; filename=${certificateId}`);
    res.send(signedPdf);
  } catch (error: any) {
    sendError(res, 503, error?.type, 'PDF signing error', error?.code);
  }
});

const port = 6000;

http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/invoice/invoice.pdf`
        : `http://localhost:${port}/pdf/invoice/invoice.pdf`
    ;

    console.log(`pdf service is listening on ${ownUrl}`);
});
