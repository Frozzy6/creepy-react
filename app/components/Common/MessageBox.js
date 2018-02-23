import React from 'react';

class MessageBox extends React.Component {
  constructor( props ){
    super(props);

    this.closeMessageBox = this.props.closeMessageBox;
  }

  render(){
    return (
      <div className="overlay overlay-dark">
        <div className={"message-box " + this.props.extraClassName}>
          <span className="message-box-close-icon"><svg onClick={this.closeMessageBox} className="svg-icon" width="29" height="29" viewBox="0 0 29 29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path></svg></span>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MessageBox;
