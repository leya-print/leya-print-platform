// @ts-check
'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import http from 'node:http';
import { PdfFactory } from './pdf-factory.js';

const webUrl = process.env.GITPOD_WORKSPACE_URL
    ? `https://6002-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/print`
    : 'http://localhost:6002/print'
;
const pdfFactory = new PdfFactory(webUrl);
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
http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/test/test.pdf`
        : `http://localhost:${port}/pdf/test/test.pdf`
    ;
    console.log(`server is listening on ${ownUrl}`);
});