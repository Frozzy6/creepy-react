import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLogoNumber } from '../../actions/index';
import App from '../../components/App/App';
import About from '../../components/About';
import ContentContainer from '../Content/ContentContainer';

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
  constructor(props) {
    super(props);
  }

  render(){
    const {
      logoNumber
    } = this.props;

    return (
      <App
        logoNumber={logoNumber}
      >
        <Switch>
          <Route
            exact
            path='/'
            render={(props)=>{
              return <ContentContainer
                helloMessage={true}
                query='stories'
                {...props}
              />
            }}
          />
          <Route
            exact
            path='/stories/'
            render={(props)=>{
              return <ContentContainer
                query='stories'
                {...props}
              />
            }}
          />
          <Route
            path='/stories/:page'
            render={(props)=>{
              return <ContentContainer
                query='stories'
                {...props}
              />
            }}
          />

          <Route
            exact
            path='/scary/'
            render={(props)=>{
              return <ContentContainer
                query='scary'
                {...props}
              />
            }}
          />
          <Route
            exact
            path='/scary/:page'
            render={(props)=>{
              return <ContentContainer
                query='scary'
                {...props}
              />
            }}
          />
          <Route
            exact
            path='/story/:id'
            render={(props)=>{
              return <ContentContainer
                query='story'
                {...props}
              />
            }}
          />
          <Route
            path='/random'
            render={(props)=>{
              return <ContentContainer
                query='random'
                {...props}
              />
            }}
          />
          <Route
            path="/about"
            component={About}
          />
        </Switch>
      </App>
    )
  }
}

AppContainer.propTypes = {
  logoNumber: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    logoNumber: getLogoNumber(state),
  }
}

export default withRouter(connect(mapStateToProps)(AppContainer));
