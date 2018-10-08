import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Map, List } from 'immutable';
import MediaQuery from 'react-responsive';

import Pagination from './Pagination';
import StoriesList from './StoriesList';
import SidebarContainer from '../../containers/Sidebar/SidebarContainer';
import Greeting from './Greeting';
import StoryDetails from './StoryDetails';

const DESC = {
  stories: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира.',
  scary: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира, показаные по популярности.',
  random: 'Случайная страшилка или страшная история. Каждый раз новая.',
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
    const maxPages = Math.ceil(storiesTotal / 10);
    return (
      <div>
        <Helmet>
          <title>Страшные истории</title>
          <meta name='Description' content={getDescriptionByToken(token)}/>
        </Helmet>
        {helloMessage
          && <Greeting/>
        }
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination
          && <Pagination maxPages={maxPages} currentPage={currentPage} query={token}/>
        }
        { stories.size !== 0
          && <div className="page-content">
            <StoriesList
              stories={stories}
            />
            {/* Hide sidebar to small devices */}
            <MediaQuery minWidth={650}>
              <SidebarContainer />
            </MediaQuery>
          </div>
        }
        { story
          && <StoryDetails
            story={story}
          />
        }
        <div style={{ clear: 'both' }}></div>
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination
          && <Pagination maxPages={maxPages} currentPage={currentPage} query={token}/>
        }
      </div>
    );
  }
}

Content.propTypes = {
  token: PropTypes.string.isRequired,
  helloMessage: PropTypes.bool,
  stories: PropTypes.instanceOf(List),
  story: PropTypes.instanceOf(Map),
  showPagination: PropTypes.bool,
  storiesTotal: PropTypes.number,
  currentPage: PropTypes.number,
};

Content.defaultProps = {
  stories: new List(),
  story: null,
  helloMessage: null,
  showPagination: false,
  storiesTotal: -1,
  currentPage: -1,
};

export default Content;
