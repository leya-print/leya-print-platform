export interface UiStateDescription<T> {
    ident: string;
    initialize: () => T;
  }
  