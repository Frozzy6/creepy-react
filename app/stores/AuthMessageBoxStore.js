class AuthMessageBoxStore {
  constructor() {
    this.bindActions(this.alt.getActions('AuthMessageBoxActions'));

    this.isDisplay = false;
    this.currentTab = 'auth';
  }

  onShow(){
    this.isDisplay = true;
  }

  onHide(){
    this.isDisplay = false;
  }

  onChangeTab(tabName) {
    this.currentTab = tabName;
  }
}

export default AuthMessageBoxStore;
