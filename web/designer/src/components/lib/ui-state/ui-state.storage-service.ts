export abstract class UiStatesStorageService {
  public abstract putStates(uiState: any): any;
  public abstract getStates(): any;
  public abstract deleteStates(): any;
}