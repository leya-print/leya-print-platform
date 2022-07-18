// @ts-check
/// <reference types="mocha" />
"use strict";

const { MockedStorageService } = require("./mocked-storage.service")
const { testStorageService } = require("./storage.service.spec")

describe('mocked storage service', () => {
  testStorageService(() => new MockedStorageService());
})