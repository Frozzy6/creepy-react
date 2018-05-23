import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

import Pagination from './Pagination';
import StoriesList from './StoriesList';
import Sidebar from './Sidebar/Sidebar';
import Greeting from './Greeting';

const getDescriptionByToken = function( token ){
  const DESC = {
    stories: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира.',
    scary: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира, показаные по популярности.',
    random: 'Случайная страшилка или страшная история. Каждый раз новая.'
  }

  return DESC[token];
};

class Content extends Component {
  render() {
    const {
      query,
      stories,
      helloMessage,
      showPagination,
      storiesTotal,
      currentPage,
    } = this.props;

    let sidebarHTML = null;
    // TODO: is that bug
    let maxPages = Math.ceil(storiesTotal / 10 );

    /* Render sidebar only for desktop */
    if ( stories.length > 1 ) {
      sidebarHTML = <Sidebar />;
    }

    return (
      <div ref="content">
        <Helmet>
          <title>Страшные истории</title>
          <meta name='Description' content={getDescriptionByToken(query)}/>
        </Helmet>
        {helloMessage &&
          <Greeting/>
        }
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination &&
          <Pagination maxPages={maxPages} currentPage={currentPage} query={query}/>
        }
        <StoriesList stories={stories}/>
        {/* {sidebarHTML} */}
        <div style={{clear:"both"}}></div>
        {/* // TODO: make without query param. withRouter may helps alot */}
        {showPagination &&
          <Pagination maxPages={maxPages} currentPage={currentPage} query={query}/>
        }
      </div>
    );
  }
}

Content.propTypes = {
  stories: PropTypes.array,
}

export default Content;
