class MessageBoxStore {
  constructor( ID ) {
    this.bindActions(this.alt.getActions('MessageBoxActions' + ID));
    this.isDisplay = false;
  }

  onShowMessageBox(){
    this.isDisplay = true;
  }

  onHideMessageBox(){
    this.isDisplay = false;
  }
}

export default MessageBoxStore;
