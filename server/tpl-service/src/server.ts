import { getETagHeader, getEnv, sendError } from '@leya-print/server-common';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import path from 'node:path';
import fetch from 'cross-fetch';
import bodyParser from 'body-parser';
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

const isImageUrl = async (url: URL) => {  
  try {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url.href);
  } catch (error) {
    return false;
  }
};

// TODO: move this endpoint to designer
app.post('/tpl/proxy', bodyParser.json(), async (req, res) => {
  const { externalUrl } = req.body;

  if (!externalUrl || typeof externalUrl !== 'string') {
    return res.status(400).send('URL is required');
  }

  const imageUrl: URL = new URL(externalUrl);

  if (!(await isImageUrl(imageUrl))) {
    return res.status(400).send('URL does not point to an image');
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok || response.body === null) {
      return res.status(response.status).send('Error fetching the resource');
    }

    const buffer = await response.arrayBuffer();
    res.writeHead(200, {
      'Content-Length': buffer.byteLength
    });

    res.end(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send(`Error fetching the resource: ${error}`);
  }
});

app.use('/tpl', (req, res, next) => cors(corsOptions)(req, res, next));

app.post('/tpl', multer().array('tplPackage'), (req, res) => {

  const files = req.files as Express.Multer.File[];

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