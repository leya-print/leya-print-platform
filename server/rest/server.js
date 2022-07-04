// @ts-check
'use strict';

import express from 'express';
import http from 'node:http';
import { PdfFactory } from './pdf-factory.js';

const pdfFactory = new PdfFactory('http://localhost:3333/print');
const app = express();

app.get('/pdf/:templateId/*', async(req, res) => {
    const pdf = await pdfFactory.create(req.params.templateId, req.params);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
});

const port = 4444;
http.createServer(app).listen(port, undefined, undefined, () => console.log(`server is listening on http://localhost:${port}/pdf/test/test.pdf`));