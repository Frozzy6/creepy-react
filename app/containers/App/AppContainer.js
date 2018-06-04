import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLogoNumber } from '../../actions/index';
import App from '../../components/App/App';
import About from '../../components/About';

import StoriesPage from '../../pages/stories';
import ScaryPage from '../../pages/scary';
import StoryPage from '../../pages/story';
import RandomPage from '../../pages/random';
import TagContentContainer from '../TagContent/TagContentContainer';
/*
  There is old routes
  <App>
    <Route exact path='/' query='stories' component={Content} helloMessage={true}/>
    <Route path='/stories' query='stories' component={Content}/>
    <Route path='/stories/:page' query='stories' component={Content}/>

    <Route path='/scary' query='scary' component={Content}/>
    <Route path='/scary/:page' query='scary' component={Content}/>

    <Route path='/story/:id' query='story' component={Content}/>
    <Route path='/random' query='random' component={Content}/>

    <Route path="/tags" component={Tags}/>
    <Route path="/tags/:tag" component={TagContent}/>

    <Route path='/new' component={UsersStory}/>
    <Route path="/about" component={About}/>
    <Route path="/feedback" component={Feedback}/>

    <Route path="/my" component={UserHomepage}/>
    Login is not implimented yet
    <Route path="/login" component={Login}/>
  </App>
*/

class AppContainer extends Component {
  render() {
    const {
      logoNumber,
    } = this.props;

    return (
      <App
        logoNumber={logoNumber}
      >
        <Switch>
          <Route
            path='/'
            exact
            component={StoriesPage}
          />
          <Route
            path='/stories/'
            exact
            component={StoriesPage}
          />
          <Route
            path='/stories/:page'
            component={StoriesPage}
          />
          <Route
            path='/scary/'
            exact
            component={ScaryPage}
          />
          <Route
            path='/scary/:page'
            exact
            component={ScaryPage}
          />
          <Route
            path='/story/:id'
            exact
            component={StoryPage}
          />
          <Route
            path='/random/'
            exact
            component={RandomPage}
          />
          <Route
            path='/about/'
            component={About}
          />
          <Route
            path="/tags/:tag"
            component={TagContentContainer}
          />
        </Switch>
      </App>
    );
  }
}

AppContainer.propTypes = {
  logoNumber: PropTypes.number,
};

const mapStateToProps = state => ({
  logoNumber: getLogoNumber(state),
});

export default withRouter(connect(mapStateToProps)(AppContainer));
