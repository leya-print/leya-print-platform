export interface StorageItemDescription<T> {
  ident: string;
  createDefault: () => Promise<T> | T;
}

export interface StorageService {
  load<T>(descriptor: StorageItemDescription<T>): Promise<T>;
  save<T>(ident: string, data: T): Promise<T>;
  drop<T>(ident: string): Promise<T | undefined>;
}

export interface Indexed<T> {
  [key: string]: T,
}