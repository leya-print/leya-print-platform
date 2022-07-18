import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import http from 'node:http';
import cors from 'cors';
import { PdfFactory } from './pdf-factory';
import { TemplateService } from './template.service';
import { MockedStorageService } from './storage/mocked-storage.service';

const pdfFactory = new PdfFactory('http://localhost:6002/print');
const app = express();
const corsOptions: cors.CorsOptions = {

};

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

const templateService = new TemplateService(new MockedStorageService());
app.use('/tpl', (req, res, next) => cors(corsOptions)(req, res, next));
app.post('/tpl', multer().array('tplPackage'), (req, res) => {
    const files = req.files as Express.Multer.File[];
    Promise.all(files.map((file) => templateService.addTemplate(file.buffer))).then(
        (results) => res.send(results),
        (error) => {
            console.error(error);
            res.status(500).send({
                msg: '' + error,
                time: new Date(),
                details: error,
            });
        },
    );
});

const port = 6001;
http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/test/test.pdf`
        : `http://localhost:${port}/pdf/test/test.pdf`
    ;
    console.log(`server is listening on ${ownUrl}`);
});
