import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import path from 'node:path';
import { JsonStorageService } from './storage/json-storage.service';
import { MockedStorageService } from './storage/mocked-storage.service';
import { TemplateService } from './template.service';
// import { getETagHeader } from '@leya-print/common-api';
import fs from 'node:fs';

const debugLog = false;

const env: {
  storageLocation: string,
  title: string,
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    console.log('could not read local-env.json');
    return {
      title: 'localhost env',
      printEndpoint: 'http://localhost:6003/print',
      storageLocation: path.join(__dirname, '../../../data'),
    };
  }
})();

debugLog && console.log('local env title: ' + env.title);

const useJsonStorage = true;
const storage = useJsonStorage ? new JsonStorageService(env.storageLocation) : new MockedStorageService();
const templateService = new TemplateService(storage, env.storageLocation);

const app = express();
const corsOptions: cors.CorsOptions = { };

app.use('/tpl', (req, res, next) => cors(corsOptions)(req, res, next));

// ETag header to prevent 304 status which breaks live check.
app.get('/tpl/alive', async (_req, res) => {
  res.setHeader("Cache-Control", "no-cache")   
  .setHeader("ETag", `"${Date.now().toString()}"`)
  .send("Ok");  
});

app.get('/tpl', async (_req, res) => {
  const templatePackages = await templateService.list();
  res.send(templatePackages);
});

app.get('/tpl/exists/:templateId', async (_req, res) => {
  const templateExists = await templateService.exists(_req.params.templateId);

  if (templateExists){
    res.status(200)
    res.send(true);
    return;
  };

  res.status(200)
  res.send(false);
});

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
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/tpl`
        : `http://localhost:${port}/tpl`
    ;
    console.log(`tpl service is listening on:  ${ownUrl}`);
});
