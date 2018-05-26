import React from 'react';
import {Helmet} from 'react-helmet';
import Logo from './Logo/Logo';
import Footer from '../Footer';
import NavbarContainer from '../../containers/Navbar/NavbarContainer';
import DialogContainer from '../../containers/Dialog/DialogContainer';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="root">
        <Helmet>
          <title>Страшные истории</title>
          <meta name="Description" content="Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира. Возможность поделиться своей историей."/>
          <meta name="Keywords" content="страшилки,страшные истории, мистические истории, мистика, на ночь, ужасные истории, страх, ужас, ужастики"/>
        </Helmet>
        <div className="root__wrap">
          <Logo logoNumber={this.props.logoNumber} />
          <NavbarContainer />
          <div className="wrap main">
            {this.props.children}
          </div>
          <DialogContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
