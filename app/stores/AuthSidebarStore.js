class AuthSidebarStore {
  constructor() {
    this.bindActions(this.alt.getActions('AuthSidebarActions'));
    this.currentTab = 'auth';
  }

  onShowTab(tab){
    this.currentTab = tab;
  }
}
export default AuthSidebarStore;
