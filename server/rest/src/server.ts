import express from 'express';
import http from 'node:http';
import { PdfFactory } from './pdf-factory.js';

const pdfFactory = new PdfFactory('http://localhost:7002/print');
const app = express();

app.get('/pdf/:templateId/*', async(req, res) => {
    const pdf = await pdfFactory.create(req.params.templateId, req.query);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
});

app.post('/tpl/:ident', (_req, _res) => {
});

const port = 7001;
http.createServer(app).listen(port, undefined, undefined, () => console.log(`server is listening on http://localhost:${port}/pdf/test/test.pdf`));