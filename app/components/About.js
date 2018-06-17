import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const About = () => (
  <div className="content wide white padding">
    <Helmet>
      <title>О проекте</title>
      <meta name='Description' content="О проекте и о том кто мы и зачем этот сайт."/>
    </Helmet>
    <h1>О проекте</h1>
    <div className="article">
      <h2>Как появился проект?</h2>
      <p>Однажды нам пришла идея сделать сайт, где специально будут размещены реальные страшные истории.</p>
      <p>Чтобы такие любители острых ощущений, как вы, смогли почитать страшные истории на реальных событиях, на самом деле произошедшие с людьми в жизни, а любой гость нашего сайта смог бы поделиться своим страшным случаем из жизни.</p>
      <p>Так эту идею мы стали реализовывать в жизнь.</p>
      <h2>Откуда берутся все эти страшные истории?</h2>
      <p>Вы пишете свою историю и отправляете нам на утверждение. Если она нам нравится, то мы ее публикуем на главной странице сайта. Мы оставляем за собой право обработать вашу историю, если есть в этом необходимость.</p>
      <p>Если Вам понравилась история, вы всегда можете проголосовать за неё, нажав на сердечко.</p>
      <p>Читайте страшные истории на ночь и наслаждайтесь, поскольку здесь собраны самые страшные истории из реальной жизни и страшилки</p>
      <h2>Остались вопросы?</h2>
      <p>Вы можете посмотреть ответы на самые распространненные вопросы <Link to="/faq">тут</Link></p>
    </div>
  </div>
);

export default About;
