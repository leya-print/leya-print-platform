import bodyParser from 'body-parser';
import express from 'express';
import http from 'node:http';
import { PdfFactory } from './pdf-factory';
import { PdfSigner } from './pdf-signer';
import fs from 'node:fs';
import fetch from 'cross-fetch';
import cors from 'cors';
import multer from 'multer';
import { getETagHeader } from '@leya-print/common-api';

const upload = multer({ storage: multer.memoryStorage() });

const env: {
  title: string,
  printEndpoint: string,
  templateServiceBaseUrl: string,
  certificatesPath: string
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    console.log('Could not read local-env.json');
    return {
      title: 'localhost env',
      printEndpoint: 'http://localhost:6003/print',
      templateServiceBaseUrl: 'http://localhost:6001/tpl',
      certificatesPath: '../certificates',
    };
  }
})();

console.log('pdf service: print endpoint: ' + env.printEndpoint);
console.log('pdf service: template service endpoint: ' + env.templateServiceBaseUrl);

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
      const [tplServiceHealthStatus, printEnpointHealthStatus] = await Promise.all([
        await fetch(`${env.templateServiceBaseUrl}/alive`)
              .then((res: any) => { return res.status === undefined ? 'NOT FOUND' : res.status })
              .catch((err: any) => 
              {
                console.log('error encountered: ', err);
                return 'ERROR'
              }),
        await fetch(`${env.printEndpoint}`)
              .then((res: any) => { return res.status === undefined ? 'NOT FOUND' : res.status })
              .catch((err: any) =>           {
                console.log('error encountered: ', err);
                return 'ERROR'
              })
      ]);
    
      console.log("healthCheckTplService", tplServiceHealthStatus);
      console.log("healthCheckPrintEnpoint", printEnpointHealthStatus);
      
      if (printEnpointHealthStatus !== 200 || tplServiceHealthStatus !== 200)
      {
        // ETag header to prevent 304 status which breaks live check. 
        res.setHeader("Cache-Control", "no-cache")        
        .setHeader("ETag", `"${Date.now().toString()}"`)
        .send(`Health status: PrintEnpoint: ${printEnpointHealthStatus}, Template Service: ${tplServiceHealthStatus}`)
        return;
      }
    
      // ETag header to prevent 304 status which breaks live check. 
      res.setHeader("Cache-Control", "no-cache")
      // .setHeader("ETag", `"${Date.now().toString()}"`)
      .setHeader("ETag", `"${getETagHeader()}"`)    
      .send("Ok");

      return;
      
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve));
    }

    res.sendStatus(503);
});

app.post('/pdf/:templateId/*', bodyParser.urlencoded({ extended: true }), async(req, res) => {
    const pdf = await pdfFactory.create(req.params.templateId, req.query, req.body?.payload);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
});

app.post('/sign/:certificateId', upload.single('pdf'), async (req, res) => {
  const certificateId = req.params.certificateId; 

  console.log(req.query.reason, req.query.name, req.query.location, req.query.contactInfo);  

  const reason = req.query.reason?.toString() || 'No reason provided';  
  const location = req.query.location?.toString() || 'No contact information provided';

  const name = req.query.name?.toString() || 'No contact information provided';
  const contactInfo = req.query.contactInfo?.toString() || 'No contact information provided';    
  
  if (!req.file) {
    return res.status(400).send('No PDF file provided');
  }

  const pdf = req.file;

  const signedPdf = await pdfSigner.signPdf(certificateId, pdf.buffer, {reason, name, location, contactInfo});    

  res.set('Content-Type', 'application/pdf');
  res.set('Content-Disposition', `'attachment; filename=${certificateId}`);
  res.send(signedPdf);
});

const port = 6000;

http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/invoice/invoice.pdf`
        : `http://localhost:${port}/pdf/invoice/invoice.pdf`
    ;

    console.log(`pdf service is listening on ${ownUrl}`);
});
