import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { Map, List } from 'immutable';

import Pagination from './Pagination';
import StoriesList from './StoriesList';
import SidebarContainer from '../../containers/Sidebar/SidebarContainer';
import Greeting from './Greeting';
import StoryDetails from './StoryDetails';

const DESC = {
  stories: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира.',
  scary: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира, показаные по популярности.',
  random: 'Случайная страшилка или страшная история. Каждый раз новая.'
};

const getDescriptionByToken = token => DESC[token];

class Content extends Component {
  render() {
    const {
      token,
      stories,
      story,
      helloMessage,
      showPagination,
      storiesTotal,
      currentPage,
    } = this.props;

    // TODO: please no literals
    let maxPages = Math.ceil(storiesTotal / 10 );

    return (
      <div ref="content">
        <Helmet>
          <title>Страшные истории</title>
          <meta name='Description' content={getDescriptionByToken(token)}/>
        </Helmet>
        {helloMessage &&
          <Greeting/>
        }
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination &&
          <Pagination maxPages={maxPages} currentPage={currentPage} query={token}/>
        }
        { stories.size !== 0 &&
          <Fragment>
            <StoriesList
              stories={stories}
            />
            <SidebarContainer />
          </Fragment>
        }
        { story &&
          <StoryDetails
            story={story}
          />
        }
        <div style={{clear:"both"}}></div>
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination &&
          <Pagination maxPages={maxPages} currentPage={currentPage} query={token}/>
        }
      </div>
    );
  }
}

Content.propTypes = {
  stories: PropTypes.instanceOf(List),
  story: PropTypes.instanceOf(Map),
}

Content.defaultProps = {
  stories: new List(),
  story: null,
}

export default Content;
