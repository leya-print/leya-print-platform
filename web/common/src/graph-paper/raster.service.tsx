class RasterServiceImpl {
    #listeners: ((active: boolean) => void)[] = [];
    #isActive = false;
  
    constructor() {
      this.#isActive = this.#isRasterActiveInUrl();
      this.registerListener(this.#syncRasterToUrl);
    }
  
    #isRasterActiveInUrl() {
      return ['true', 'on'].includes(new URL(window.location.href).searchParams.get('raster'));
    }
  
    #syncRasterToUrl = (raster) => {
      const url = new URL(window.location.href);
      const isActive = this.#isRasterActiveInUrl();      

      if (raster === isActive) { return; }
  
      if (raster) {
        url.searchParams.set('raster', 'on');
      } else {
        url.searchParams.delete('raster');
      }
      window.history.replaceState({
        raster: isActive,
      }, 'unused', '' + url);
    }
  
    registerListener(listener: (active: boolean) => void) {
      this.#listeners.push(listener);
      listener(this.#isActive);
    }
  
    unregisterListener(listener: (active: boolean) => void) {
      this.#listeners.splice(this.#listeners.indexOf(listener), 1);
    }
  
    toggle(isActive = !this.#isActive) {
      if (isActive === this.#isActive) { return; }
      this.#isActive = isActive;
      this.#listeners.forEach((emit) => emit(isActive));
    }
  }
  
  export const rasterService = new RasterServiceImpl();
  export type RasterService = typeof rasterService;
  