import { MockedStorageService } from './mocked-storage.service';
import { testStorageService } from './storage.service.spec';

describe('mocked storage service', () => {
  testStorageService(() => new MockedStorageService());
});
