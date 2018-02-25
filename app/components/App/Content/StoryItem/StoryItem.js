import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import 'moment/locale/ru';

import CommentsBlock from './CommentsBlock';

class TagItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const tag = this.props.tag;
    const active = this.props.active;
    let className = 'tag';
    if ( active ) {
      className += ' tag_highlight'
    }
    return (
      <li className={className}>
        <Link to={"/tags/" + tag }>{tag}</Link>
      </li>
    )
  }
}

class Story extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { story, activeTag } = this.props;
    let tags = story.tags || [];

    tags = tags.map( (tag, index) => {
      var active = tag === activeTag
      return ( <TagItem tag={tag} key={index} active={active}/>);
    });


    return (
      <div className="story">
        <div className="story__heading">
          <span className="story-icon"></span>
          <h2>
            <Link to={"/story/" + story.uID}>{story.data.title}</Link>
            <div className="publish-date">{moment(story.datePublished).format('DD MMMM YYYY в HH:mm')}</div>
          </h2>
        </div>
        <ul className="tags">{tags}</ul>
        <div className="text" dangerouslySetInnerHTML={{__html: story.content}}></div>
      </div>
    )
  }
}

class StoryItem extends React.Component {
  constructor(props){
    super(props)

    const flux = this.props.flux;
    const story = this.props.story;

    this.flux = flux;
    this.contentActions = flux.getActions('ContentActions');
    this.appStore = flux.getStore('AppStore');

    this.state = {
      app: this.appStore.getState()
    }

    this.handleLike = this.handleLike.bind(this);
    this.onAppChange = this.onChange.bind(this, 'app');
  }

  componentDidMount() {
    this.appStore.listen(this.onAppChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onAppChange);
  }

  handleLike(){
    if ( !this.state.app.user ) {
      const actions = this.flux.getActions('AuthMessageBoxActions');

      actions.changeTab('register');
      return actions.show();
    }

    const story = this.props.story;
    this.contentActions.toggleLikeTo({uID: story.uID, shouldInc: !story.wasLiked})
  }

  handleClick(e){
    const link = e.target.parentElement;
    const href = link.getAttribute('href');

    window.open(href, 'Поделиться','left=50,top=50,width=500,height=500,toolbar=1,resizable=1')
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  onChange(name, state) {
    this.setState({[name]:state});
  }

  render(){
    const user = this.state.app.user;
    const story = this.props.story;
    const activeTag = this.props.activeTag;
    const verbose = this.props.verbose;
    const wasLiked = ( user ? story.wasLiked : false );

    const commentsIconLink = ( !verbose ? (
      <span className="story_comments__container">
        <Link to={"/story/" + story.uID + "#comments"} className="story_comments-link">
          <i className="fa fa-comments story-comments-icon" title="Комментарии"></i>
          <span className="story_comments_label">Коментарии:&nbsp;</span>
          <span className="story_comments-count">{story.commentsCount}</span>
        </Link>
      </span>
    ) : null );

    const likeIcon = ( wasLiked ? "fa-heart" : "fa-heart-o");

    const controlsBlock = (
      <div className="story_footer">
        <span onClick={this.handleLike} className="story_rating__container">
          <i className={"story_icon story_icon-like fa " + likeIcon} title="Мне понравилось"></i>
          <span className="story_rating_label">Рейтинг:&nbsp;</span>
          <span className="story_rating">{story.likeCount}</span>
        </span>
        {commentsIconLink}
        <div className="social__container">
          <a onClick={this.handleClick} href={"http://vk.com/share.php?url=http://scary-stories.ru/story/"+story.uID}>
            <i className="story_icon fa fa-vk" title="Поделиться Вконтакте"></i>
          </a>
          <a onClick={this.handleClick} href={"http://www.facebook.com/sharer.php?u=http://scary-stories.ru/story/"+story.uID}>
            <i className="story_icon fa fa-facebook-square" title="Поделиться в фейсбуке"></i>
          </a>
          <a onClick={this.handleClick} href={"http://twitter.com/intent/tweet?url=http://scary-stories.ru/story/"+story.uID+"&amp;text="+story.title}>
            <i className="story_icon fa fa-twitter-square" title="Мне понравилось"></i>
          </a>
        </div>
      </div>
    );

    const commentsBlock = ( verbose ? (<CommentsBlock comments={story.comments} uID={story.uID} flux={this.props.flux}/>)  : null );

    return (
      <div className="story-item">
        <Story story={story} activeTag={activeTag}/>
        {controlsBlock}
        {commentsBlock}
      </div>
  )}
}

export default StoryItem;
