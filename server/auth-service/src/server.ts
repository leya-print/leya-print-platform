import express from 'express';
import http from 'node:http';
import fs from 'node:fs';
import { getETagHeader } from '@leya-print/common-api';

const env: {
  title: string,
  authServiceBaseUrl: string,
} = (() => {
  try {
    return JSON.parse(fs.readFileSync('../../config/local-env.json', 'utf-8'));
  } catch (e) {
    console.error(e);
    console.log('Could not read local-env.json');
    return {
      title: 'localhost env',
      authServiceBaseUrl: 'http://localhost:6004/auth',
    };
  }
})();

console.log('auth service: auth service endpoint: ' + env.authServiceBaseUrl);

const app = express();

// ETag header to prevent 304 status which breaks live check. 
app.get('/auth/alive', async (_req, res) => {
  res.setHeader("Cache-Control", "no-cache")  
  .setHeader("ETag", `"${getETagHeader()}"`)
  .send("Ok");  
});

app.get('/auth', async (req, res) => {
  // console.log('auth request hit');
  
  if (req.headers['x-forwarded-uri']?.includes('protected')) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);
});

app.get('/validate', async (_req, res) => {
  res.sendStatus(200);
});

// used only to test authentication
app.get('/protected', async (_req, res) => {
  res.sendStatus(200);
});

const port = 6004;

http.createServer(app).listen(port, undefined, undefined, () => {
    const ownUrl = process.env.GITPOD_WORKSPACE_URL
        ? `https://${port}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}/auth`
        : `http://localhost:${port}/auth`
    ;
    console.log(`auth service is listening on ${ownUrl}`);
});
