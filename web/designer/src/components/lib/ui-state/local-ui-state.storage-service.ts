import { UiStatesStorageService } from './ui-state.storage-service';

const localStorageName = '@leya/ui-state';

export class LocalUiStateStorageService implements UiStatesStorageService {

  public getStates() {        
    return this.getSync();
  }

  private getSync() {
    const state = window.localStorage.getItem(localStorageName);
    return state ? JSON.parse(state) : {};
  }

  public putStates(state: any) {
    window.localStorage.setItem(localStorageName, JSON.stringify(state));
    return state;
  }

  public deleteStates() {
    const state = this.getSync();
    window.localStorage.removeItem(localStorageName);
    return state;
  }

}
