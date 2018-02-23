class UserStoryStore {
  constructor() {
    this.bindActions(this.alt.getActions('UserStoryActions'));

    this.title = '';
    this.content = '';
    this.disabled = true;
    this.pageState = 'send';
    this.gRecaptchaResponse = null;
  }

  onUpdateData( data ) {
    this[data.name] = data.value;

    const title = this.title.trim();
    const content = this.content.trim();
    /* Disable or enable control by state fill */

    if ( title.length > 0 && content.length > 0  ) {
      this.alt.getActions('UserStoryActions').enable.defer();
    } else {
      this.alt.getActions('UserStoryActions').disable.defer();
    }
  }

  onDisable() {
    this.disabled = true;
  }

  onEnable() {
    this.disabled = false;
  }

  onPostUserStoryStart(){
    this.alt.getActions('AppActions').startLoading.defer()
  }

  onPostUserStorySuccess(data) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.pageState = 'success';
  }

  onPostUserStoryFail(errorMessage) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.pageState = 'fail';
    console.log(errorMessage);
  }

  onResponseCaptchaSend( data ) {
    this.gRecaptchaResponse = data;
  }

}

export default UserStoryStore;
