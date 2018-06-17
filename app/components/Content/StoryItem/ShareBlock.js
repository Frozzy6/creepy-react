import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShareBlock extends Component {
  handleClick = (e) => {
    const link = e.target.parentElement.getAttribute('href');

    window.open(link, 'Поделиться', 'left=50,top=50,width=500,height=500,toolbar=1,resizable=1');
    e.preventDefault();
  }

  render() {
    const {
      uID,
      title,
    } = this.props;

    return (
      <div className="social__container">
        <a
          onClick={this.handleClick}
          href={`http://vk.com/share.php?url=http://scary-stories.ru/story/${uID}`}>
          <i className="story_icon fa fa-vk" title="Поделиться Вконтакте"></i>
        </a>
        <a
          onClick={this.handleClick}
          href={`http://www.facebook.com/sharer.php?u=http://scary-stories.ru/story/${uID}`}>
          <i className="story_icon fa fa-facebook-square" title="Поделиться в фейсбуке"></i>
        </a>
        <a
          onClick={this.handleClick}
          href={`http://twitter.com/intent/tweet?url=http://scary-stories.ru/story/${uID}&amp;text=${title}`}>
          <i className="story_icon fa fa-twitter-square" title="Поделиться в Твиттере"></i>
        </a>
      </div>
    );
  }
}

ShareBlock.propTypes = {
  uID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShareBlock;
