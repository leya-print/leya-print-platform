import { JsonStorageService } from './json-storage.service';
import { testStorageService } from './storage.service.spec';
import path from 'node:path';
import fs from 'node:fs';

const sampleFolder = path.join(__dirname, 'tmp/json-samples');
fs.mkdirSync(sampleFolder, { recursive: true });

describe('json storage service', () => {
  testStorageService(() => new JsonStorageService(sampleFolder));
})
