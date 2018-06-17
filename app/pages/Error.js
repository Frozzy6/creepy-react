import React from 'react';
// import {Link} from 'react-router';
// import Logo from './App/Static/Logo';
// import Navbar from './App/Navbar/Navbar';
// import Footer from './App/Footer';
import {Helmet} from "react-helmet";

class ErrorComponent extends React.Component {
  render() {
    return (
      <div className="root">
        {/* <Helmet>
          <title>Страшные истории</title>
          <meta name="Description" content="Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира. Возможность поделиться своей историей."/>
          <meta name="Keywords" content="страшилки,страшные истории, мистические истории, мистика, на ночь, ужасные истории, страх, ужас, ужастики"/>
        </Helmet>
        <div className="root__wrap">
          <div className="top top-extend">
            <div className="wrap header" style={{textAlign: 'center'}}>
              <a href="/" title="Страшные истории">
                <img className="scary-label" src="/images/logo.png"/>
              </a>
            </div>
          </div>
          <div className="wrap main">
            <div className="content text wide padding"  style={{position:"relative", background: "black"}}>
              <h1 style={{color: "white"}}>Ну вот... </h1>
              <p style={{color: "white"}}>Если вы видите эту страницу, значит что пошло не так.</p>
              <p style={{color: "white"}}>Нам было отправлено сообщение об ошибке на сайте, а Вас мы просим вернуться чуть позже</p>
              <img style={{display: "block", margin: "0 auto", maxWidth: "100%"}} src="/images/error.gif" alt="Ошибка"/>
            </div>
          </div>
        </div>
        <Footer /> */}
      </div>
    );
  }
}

export default ErrorComponent;
