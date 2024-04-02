import { getETagHeader, getEnv, sendError } from '@leya-print/server-common';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import path from 'node:path';
import { JsonStorageService } from './storage/json-storage.service';
import { MockedStorageService } from './storage/mocked-storage.service';
import { TemplateService } from './template.service';

const env = getEnv({
  storageLocation: path.join(__dirname, '../../../data'),
});

const useJsonStorage = true;
const storage = useJsonStorage ? new JsonStorageService(env.storageLocation) : new MockedStorageService();
const templateService = new TemplateService(storage, env.storageLocation);

const app = express();
const corsOptions: cors.CorsOptions = { 
  origin: '*'
};

app.use('/tpl', (req, res, next) => cors(corsOptions)(req, res, next));

app.get('/tpl', async (_req, res) => {
  const templatePackages = await templateService.list();
  res.send(templatePackages);
});

// ETag header to prevent 304 status which breaks live check.
app.get('/tpl/alive', async (_req, res) => {
  res.setHeader("Cache-Control", "no-cache")
    .setHeader("ETag", `"${getETagHeader()}"`)
    .send("Ok");
});

app.get('/tpl/:templateId/exists', async (_req, res) => {
  const templateExists = await templateService.exists(_req.params.templateId);

  if (templateExists) {
    res.status(200)
    res.send(true);
    return;
  };

  res.status(404)
  res.send(false);
});

app.use('/tpl', (req, res, next) => cors(corsOptions)(req, res, next));

app.post('/tpl', multer().array('tplPackage'), (req, res) => {

  const files = req.files as Express.Multer.File[];

  // security issue
  // 
  Promise.all(files.map((file) => templateService.addTemplate(file.buffer))).then(
    (results) => res.send(results),
    (error) => {
      console.error(error);
      sendError(res, 500, error?.type, 'Tpl add templates error', error);      
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