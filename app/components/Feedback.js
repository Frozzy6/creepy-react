/* eslint-disable */
// TODO: rewrite component
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Recaptcha from 'react-recaptcha';

class UsersStory extends React.Component {
  constructor(props) {
    super(props);

    const flux = props.flux;
    this.userStoryStore = flux.getStore('UserStoryStore');
    this.userStoryActions = flux.getActions('UserStoryActions');

    this.state = this.userStoryStore.getState();

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.userStoryStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.userStoryStore.unlisten(this.onChange);
  }

  // Handler to generate event trustly links object
  // to prevent converting circular structure
  handleChange(event) {
    const params = {
      name: event.target.name,
      value: event.target.value,
    };

    this.userStoryActions.updateData(params);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      title: this.state.title,
      content: this.state.content,
      email: this.state.email,
    };

    this.userStoryActions.postStory(data);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const success = this.state.success;

    const stroryHTML = (
      <div className="user-story">
        <p>С помощью данной формы вы можете отправить предложение или пожелание</p>
        <p>Пожалуйста, опишите подробнее, чтобы вы хотели улучшить в работе сайта. Мы постараемся учесть ваше мнение при дальнейшем развитии сервиса.</p>
        <p>Также если вы столкнулись с некорректным отображением элементов страницы или при загрузке страницы выдается сообщение об ошибке сообщите, пожалуйста, об этом.</p>
        <div className="user-story__row">
          <p>Тема:</p>
          <input id="input-name" type="text" placeholder="Тема" name="title" required value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className="user-story__row">
          <p>Сообщение:</p>
          <textarea id="input-content" type="number" placeholder="Текст сообщения..." name="content" required value={this.state.content} onChange={this.handleChange}/>
        </div>
        <div className="user-story__row">
          <p>Email:</p>
          <input id="input-email" type="email" placeholder="custom@ya.ru" name="email" required value={this.state.email} onChange={this.handleChange}/>
        </div>
        <div className="user-story__row">
          <div id="g" style={{ height: '78px' }}>
            <Recaptcha sitekey="6LesOxcUAAAAAH9i0IygDSN8TVgwaIs6hyZPzyxt" render="explicit" onloadCallback={function () {}} verifyCallback={this.userStoryActions.responseCaptcha}/>
          </div>
        </div>
        <button className="user-story__save-btn" type="submit" disabled={this.state.disabled}>Отправить</button>
      </div>
    );

    const successHTML = (
      <div className="user-story">
        <p style={{ color: '#009688' }}>Вашу историю в скором времени рассмотрят и если она соответствует требованиям - опубликуют.</p>
        <p style={{ color: '#009688' }}>Спасибо за Ваш вклад.</p>
      </div>
    );

    return (
      <div className="wrap">
        <Helmet>
          <title>Прислать историю</title>
          <meta name='Description' content="Возможность поделиться своей историей."/>
        </Helmet>
        <div className="content wide white padding">
          <form id="add-story" onSubmit={this.handleSubmit.bind(this)}>
            <h1>Обратная связь</h1>
            { success ? successHTML : stroryHTML}
          </form>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default UsersStory;
