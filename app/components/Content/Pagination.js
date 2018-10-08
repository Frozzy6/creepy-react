import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickItem = () => {
    window.scrollTo(window.scrollX, 0);
  }

  render() {
    // TODO: too much bad code
    const {
      maxPages,
      currentPage,
      query,
    } = this.props;

    const navs = [];
    for (let i = Math.min(currentPage + 2, maxPages); i >= currentPage - 2; i -= 1) {
      if (i <= 0) { break; }

      let cls = '';
      if (i === currentPage) {
        cls = 'current';
        if (i !== maxPages) {
          navs.push(<Link to={`/${query}/${i + 1}` } key={`${i}arrow`} className="arrow">→</Link>);
        }
      }
      if (i === currentPage - 1) {
        navs.push(<Link to={`/${query}/${i}`} key={`${i}arrow`} className="arrow">←</Link>);
      }

      navs.push(
        <Link to={`/${query}/${i}`} key={i} className={cls} onClick={this.handleClickItem}>{i}</Link>,
      );
    }

    return (
      <div className="pagination">{navs.reverse()}</div>
    );
  }
}

Pagination.propTypes = {
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};

export default Pagination;
