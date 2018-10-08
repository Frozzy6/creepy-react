import React from 'react';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };

    this.hideContainer = this.hideContainer.bind(this);
  }

  hideContainer() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className={`content wide text greeting${this.state.visible ? '' : ' hide'}` } >
        <div className="close greeting__icon" onClick={this.hideContainer}><i className="fa fa-times greeting__icon-close"></i></div>
        <h1>Добро пожаловать на сайт страшных историй</h1>
        <p>Мистические истории из реальной жизни любит практически каждый человек, который интересуется не только эзотерикой, но и старается объяснить подобные случаи с ученой точки зрения, применяя целый арсенал орудий, состоящих из школьных и университетских знаний по разным дисциплинам. Однако мистические истории по тому и называются так, потому что у них нет никакого разумного объяснения.</p>
        <p>На нашем сайте собраны самые страшные истории. В основном это страшные истории из жизни, рассказанные людьми в социальных сетях.</p>
      </div>
    );
  }
}

export default Greeting;
