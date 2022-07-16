// @ts-check
'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import http from 'node:http';
import { PdfFactory } from './pdf-factory.js';

const pdfFactory = new PdfFactory('http://localhost:6002/print');
const app = express();

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

const port = 6001;
http.createServer(app).listen(port, undefined, undefined, () => console.log(`server is listening on http://localhost:${port}/pdf/test/test.pdf`));