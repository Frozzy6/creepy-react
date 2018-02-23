import React, {PropTypes} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router';

import Recaptcha from 'react-recaptcha';

class UsersStory extends React.Component {
  constructor(props){
    super(props);

    const flux = props.flux;
    this.flux = flux;

    this.userStoryStore = flux.getStore('UserStoryStore');
    this.appStore = flux.getStore('AppStore');
    this.userStoryActions = flux.getActions('UserStoryActions');

    this.state = this.userStoryStore.getState();
    this.state.appState = this.appStore.getState();

    this.handleChange = this.handleChange.bind( this );
    this.onChange = this.onChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentDidMount() {
    this.userStoryStore.listen(this.onChange);
    this.appStore.listen(this.onAppDataChange);
  }

  componentWillUnmount() {
    this.userStoryStore.unlisten(this.onChange);
    this.appStore.listen(this.onAppDataChange);
  }

  // Handler to generate event trustly links object
  // to prevent converting circular structure
  handleChange( event ) {
    const params = {
      name: event.target.name,
      value: event.target.value
    };

    this.userStoryActions.updateData( params );
  }

  handleSubmit( event ){
    event.preventDefault();

    let data = {
      title: this.state.title,
      content: this.state.content
    };

    this.userStoryActions.postStory( data );
  }

  onChange(state) {
    this.setState(state);
  }

  onAppDataChange(state) {
    if ( this.refs.addStory ) {
      this.setState( {appState: state} );
    }
  }

  handleRegisterClick( e ){
    e.preventDefault();
    const actions = this.flux.getActions('AuthMessageBoxActions');

    actions.changeTab('register');
    actions.show();
  }

  handleAuthClick( e ){
    e.preventDefault();
    const actions = this.flux.getActions('AuthMessageBoxActions');

    actions.changeTab('auth');
    actions.show();
  }

  render() {
    const isAuthorized = !!this.state.appState.token;

    const stroryHTML = (
      <div className="user-story">
        <div className="user-story__row">
          <p>Название:</p>
          <input id="input-name" type="text" placeholder="Крипота" name="title" required value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className="user-story__row">
          <p>Текст истории:</p>
          <textarea id="input-content" type="number" placeholder="Давным давно..." name="content" required value={this.state.content} onChange={this.handleChange}/>
        </div>
        { (isAuthorized
          ? <button className="user-story__save-btn" type="submit" disabled={this.state.disabled}>Отправить</button>
          : <div className="submit-login-error">
              <p>Чтобы оставить комментарий <Link to="#" onClick={this.handleAuthClick}>войдите</Link> или <Link to="#" onClick={this.handleRegisterClick}>зарегистрируйтесь</Link>.</p>
            </div>
        )}
      </div>
    );

    const successHTML = (
      <div className="user-story">
        <p style={{color: "#009688"}}>Вашу историю в скором времени рассмотрят и если она соответствует требованиям - опубликуют.</p>
        <p style={{color: "#009688"}}>Спасибо за Ваш вклад.</p>
      </div>
    );

    const errorHTML = (
      <div className="user-story">
        <p style={{color: "#f44336"}}>Во время добавления истории возникли некоторые технические пробелмы.</p>
        <p>Повторите пожалуйста запрос чуть позже.<br/></p>
        <p>Если данная ошибка появится снова, напишите нам на <a href="mailto:support@scary-stories.ru">почту</a>.</p>
      </div>
    );

    let resultHTML = null;

    switch (this.state.pageState) {
      case 'send':
        resultHTML = stroryHTML;
        break;
      case 'success':
        resultHTML = successHTML;
        break;
      case 'fail':
        resultHTML = errorHTML;
        break;
    }

    return (
      <div className="wrap" ref="addStory">
        <Helmet>
          <title>Прислать историю</title>
          <meta name='Description' content="Возможность поделиться своей историей."/>
        </Helmet>
        <div className="content wide white padding">
          <form id="add-story" onSubmit={this.handleSubmit.bind(this)}>
            <h1>Прислать историю</h1>
            <p>Если вы хотите поделиться с посетителями сайта своей страшной историей, напишите её прямо здесь.</p>
            { resultHTML }
            <p>Отправляя историю, вы соглашаетесь, что она пройдёт через редактирование и может быть существенно изменена.</p>
          </form>
        </div>
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
}

export default UsersStory;
