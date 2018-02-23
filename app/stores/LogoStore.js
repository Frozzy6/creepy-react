const LOGOS_COUNT = 6;

class AppStore {
  constructor() {
    this.imgNumber =  Math.round( Math.random() * LOGOS_COUNT );
  }
}

export default AppStore;
