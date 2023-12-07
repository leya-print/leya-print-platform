import { LocalUiStateStorageService } from './local-ui-state.storage-service';
import { UiStateDescription } from './ui-state-description.model';
import { UiStatesStorageService } from './ui-state.storage-service';

interface UiState {
  getExisting<T>(uiStateIdent: string): T | undefined;
  create<T>(ident: string, state: T): T;
  get<T>(uiStateDescription: UiStateDescription<T>): T;
  getAll(): { [ident: string]: any };
}

class InitializedUiStates implements UiState {
  constructor(private state: { [ident: string]: any }) {}

  public getExisting<T>(uiStateIdent: string): T | undefined {
    const existingState = this.state[uiStateIdent];
    if (existingState) return existingState as T;
  }

  public create<T>(ident: string, state: T): T {
    if (this.getExisting(ident)) {
      throw new Error('cannot override existing state');
    }

    this.state[ident] = state;
    return state;
  }

  public get<T>(uiStateDescription: UiStateDescription<T>): T {
    return this.getExisting(uiStateDescription.ident)
      || this.create(uiStateDescription.ident, uiStateDescription.initialize())
    ;
  }

  public getAll(): { [ident: string]: any } {
    return this.state;
  }
}

class UninitializedUiState implements UiState {
  private notInitializedYet: any = () => {
    throw new Error('Ui State is not initialized yet');
  }
  // tslint:disable: member-ordering
  public getExisting = this.notInitializedYet;
  public create = this.notInitializedYet;
  public get = this.notInitializedYet;
  public getAll = this.notInitializedYet;
  // tslint:enable: member-ordering
}

export class UiStateService {
  private backupListener = this.backup.bind(this);
  private storage: UiStatesStorageService;
  private strategy: UiState = new UninitializedUiState();

  constructor(
    storage: UiStatesStorageService,
  ) {   
    this.storage = storage;
    const states = storage.getStates();
    this.strategy = new InitializedUiStates(states);
      window.addEventListener('beforeunload', this.backupListener);      
  }

  public getStates(): { [ident: string]: any } {
    return { ...this.strategy.getAll() };
  }

  public getExisting<T>(uiStateIdent: string): T | undefined {
    return this.strategy.getExisting(uiStateIdent);
  }

  public create<T>(ident: string, state: T): T {    
    return this.strategy.create(ident, state);
  }

  public get<T>(uiStateDescription: UiStateDescription<T>): T {
    return this.strategy.get(uiStateDescription);
  }

  public clear(): void {
    this.clean();
    window.removeEventListener('beforeunload', this.backupListener);
  }

  public clean(): void {        
    this.storage.deleteStates();
    this.strategy = new InitializedUiStates({});
  }

  public backup(): void {
    this.storage.putStates(this.strategy.getAll());
  }
}

export const uiStateService = new UiStateService(new LocalUiStateStorageService());