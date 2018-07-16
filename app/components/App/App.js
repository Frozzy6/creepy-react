import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Logo from './Logo/Logo';
import Footer from '../Footer';
import MobileSidebar from '../../containers/MobileSidebar/MobileSidebar';
import NavbarContainer from '../../containers/Navbar/NavbarContainer';
import DialogContainer from '../../containers/Dialog/DialogContainer';


const App = (props) => {
  const {
    children,
    logoNumber,
  } = props;

  return (
    <div className="root">
      <Helmet>
        <title>Страшные истории</title>
        <meta name="Description" content="Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира. Возможность поделиться своей историей."/>
        <meta name="Keywords" content="страшилки,страшные истории, мистические истории, мистика, на ночь, ужасные истории, страх, ужас, ужастики"/>
      </Helmet>
      <div className="root__wrap">

        <Logo logoNumber={logoNumber} />
        <NavbarContainer />
        <div className="wrap main">
          {children}
        </div>
        <MobileSidebar />
        <DialogContainer />
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  logoNumber: PropTypes.number.isRequired,
};

export default App;
