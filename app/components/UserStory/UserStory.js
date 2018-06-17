import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Map } from 'immutable';
// import Recaptcha from 'react-recaptcha';

const getSuccessHTML = () => (
  <div className="user-story">
    <p>Вашу историю в скором времени рассмотрят и если она соответствует требованиям - опубликуют.</p>
    <p>Спасибо за Ваш вклад.</p>
  </div>
);

const getFailHTML = () => (
  <div className="user-story">
    <p>Во время добавления истории возникли некоторые технические пробелмы.</p>
    <p>Повторите пожалуйста запрос чуть позже.<br/></p>
    <p>Если данная ошибка появится снова, напишите нам на <a href="mailto:support@scary-stories.ru">почту</a>.</p>
  </div>
);

class UsersStory extends Component {
  state = {
    title: '',
    content: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { target: form } = event;
    const { title, content } = this.state;
    event.preventDefault();

    const focusNode = name => form.querySelector(`input[name=${name}]`).focus();

    if (!title.trim()) {
      return focusNode('title');
    }

    if (!content.trim()) {
      return focusNode('content');
    }

    this.props.requestAddStoryAC({ title, content });
  }

  getFormHTML = (title, content) => (
    <div className="user-story">
      <div className="user-story__row">
        <p>Название:</p>
        <input id="input-name" type="text" placeholder="Крипота" name="title" value={title} onChange={this.handleChange}/>
      </div>
      <div className="user-story__row">
        <p>Текст истории:</p>
        <textarea id="input-content" type="number" placeholder="Давным давно..." name="content" value={content} onChange={this.handleChange}/>
      </div>
      <p>Отправляя историю, вы соглашаетесь, что она пройдёт через редактирование и может быть существенно изменена.</p>
      <button className="submit-btn submit-btn--add-story" type="submit">Отправить</button>
    </div>
  );

  render() {
    const {
      loading,
      success,
      fail,
    } = this.props.pageState.toJS();
    const { title, content } = this.state;

    return (
      <div className="wrap">
        <Helmet>
          <title>Прислать историю</title>
          <meta name='Description' content="Возможность поделиться своей историей."/>
        </Helmet>
        <div className="content wide white padding">
          <form id="add-story" onSubmit={this.handleSubmit}>
            <h1>Прислать историю</h1>
            <p>Если вы хотите поделиться с посетителями сайта своей страшной историей, напишите её прямо здесь.</p>
            { !loading && !success && !fail && this.getFormHTML(title, content) }
            { success && getSuccessHTML() }
            { fail && getFailHTML() }
          </form>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

UsersStory.propTypes = {
  requestAddStoryAC: PropTypes.func.isRequired,
  pageState: PropTypes.instanceOf(Map).isRequired,
};

export default UsersStory;
