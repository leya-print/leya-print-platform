import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import path from 'node:path';
import { PdfFactory } from './pdf-factory';
import { JsonStorageService } from './storage/json-storage.service';
import { MockedStorageService } from './storage/mocked-storage.service';
import { TemplateService } from './template.service';
import fs from 'node:fs';

const env: {
  printEndpoint: string,
  storageLocation: string,
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../container/config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    console.log('could not read local-env.json');
    return {
      printEndpoint: 'http://localhost:6003/print',
      storageLocation: path.join(__dirname, '../../../data'),
    };
  }
})();

console.log('print endpoint: ' + env.printEndpoint);

const pdfFactory = new PdfFactory(env.printEndpoint);
const useJsonStorage = true;
const storage = useJsonStorage ? new JsonStorageService(env.storageLocation) : new MockedStorageService();
const templateService = new TemplateService(storage, env.storageLocation);

const app = express();
const corsOptions: cors.CorsOptions = {

};

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

app.get('/protected', async (_req, res) => {
  // used only to test authentication
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
app.get('/tpl', async (_req, res) => {
  const templatePackages = await templateService.list();
  res.send(templatePackages);
});
app.use('/tpl-contents/:templateId',
  (req, res, next) => cors(corsOptions)(req, res, next),
  (req, res, next) => {
    return express.static(path.join(templateService.tplRoot, req.params.templateId), {
      fallthrough: true,
    })(req, res, next);
  },
  (req, res, next) => {
    return express.static(path.join(templateService.tplRoot, 'default'))(req, res, next);
  },
);

const port = 6001;
http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/pdf/test/test.pdf`
        : `http://localhost:${port}/pdf/test/test.pdf`
    ;
    console.log(`server is listening on ${ownUrl}`);
});
