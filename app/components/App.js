import React from 'react';
import Logo from './App/Static/Logo';
import Navbar from './App/Navbar/Navbar';
import Footer from './App/Footer';
import AuthMessageBox from './App/AuthMessageBox';
import {Helmet} from 'react-helmet';


class App extends React.Component {
  render() {
    const flux = this.props.flux;

    return (
      <div className="root">
        <Helmet>
          <title>Страшные истории</title>
          <meta name="Description" content="Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира. Возможность поделиться своей историей."/>
          <meta name="Keywords" content="страшилки,страшные истории, мистические истории, мистика, на ночь, ужасные истории, страх, ужас, ужастики"/>
        </Helmet>
        <div className="root__wrap">
          <Logo flux={flux} />
          <Navbar history={this.props.history} flux={flux}/>
          <div className="wrap main">
            {this.props.children}
          </div>
          <AuthMessageBox flux={flux}/>
        </div>
        <Footer flux={flux} />
      </div>
    );
  }
}

export default App;
