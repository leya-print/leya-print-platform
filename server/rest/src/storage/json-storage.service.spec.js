// @ts-check
/// <reference types="mocha" />
"use strict";

const { JsonStorageService } = require("./json-storage.service");
const { testStorageService } = require("./storage.service.spec");
const path = require('node:path');
const fs = require('node:fs');

const sampleFolder = path.join(__dirname, 'tmp/json-samples');
fs.mkdirSync(sampleFolder, { recursive: true });

describe('json storage service', () => {
  testStorageService(() => new JsonStorageService(sampleFolder));
})