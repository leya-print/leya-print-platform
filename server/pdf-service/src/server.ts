import bodyParser from 'body-parser';
import express from 'express';
import http from 'node:http';
import { PdfFactory } from './pdf-factory';
import fs from 'node:fs';

const env: {
  printEndpoint: string,
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../container/config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    return {
      printEndpoint: 'http://localhost:6002/dev/print',
    };
  }
})();

console.log('print endpoint: ' + env.printEndpoint);

const pdfFactory = new PdfFactory(env.printEndpoint);

const app = express();

app.get('/alive', async (_req, res) => {
  res.sendStatus(200);
});

app.get('/auth', async (req, res) => {
  if (req.headers['x-forwarded-uri']?.includes('protected')) {
    console.log('auth:', req.headers);
    return res.sendStatus(401);
  }

  res.sendStatus(200);
});

// used only to test authentication
app.get('/protected', async (_req, res) => {
  res.sendStatus(200);
});

app.get('/pdf/:templateId/*', bodyParser.urlencoded({ extended: true }), async(req, res) => {
    const pdf = await pdfFactory.create(req.params.templateId, req.query, req.body?.payload);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
});

app.post('/pdf/:templateId/*', bodyParser.urlencoded({ extended: true }), async(req, res) => {
    const pdf = await pdfFactory.create(req.params.templateId, req.query, req.body?.payload);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
});

const port = 6000;
http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/invoice/invoice.pdf`
        : `http://localhost:${port}/pdf/invoice/invoice.pdf`
    ;
    console.log(`server is listening on ${ownUrl}`);
});
