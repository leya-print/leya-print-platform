import cors from 'cors';
import express from 'express';
import multer from 'multer';
import http from 'node:http';
import path from 'node:path';
import { JsonStorageService } from './storage/json-storage.service';
import { MockedStorageService } from './storage/mocked-storage.service';
import { TemplateService } from './template.service';
import fs from 'node:fs';

const env: {
  storageLocation: string,
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    return {      
      storageLocation: path.join(__dirname, '../../../data'),
    };
  }
})();

const useJsonStorage = true;
const storage = useJsonStorage ? new JsonStorageService(env.storageLocation) : new MockedStorageService();
const templateService = new TemplateService(storage, env.storageLocation);

const app = express();
const corsOptions: cors.CorsOptions = { };

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
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/tpl`
        : `http://localhost:${port}/tpl`
    ;
    console.log(`server is listening on:  ${ownUrl}`);
});
