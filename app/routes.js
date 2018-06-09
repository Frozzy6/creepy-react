import privateRoute from './containers/privateRoute/privateRoute';
import StoriesPage from './pages/stories';
import ScaryPage from './pages/scary';
import StoryPage from './pages/story';
import RandomPage from './pages/random';
import About from './components/About';
import TagContentContainer from './containers/TagContent/TagContentContainer';
import UserPageContainer from './containers/UserPage/UserPageContainer';
import UserStoryContainer from './containers/UserStory/UserStoryContainer';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js
export default [
  {
    path: '/',
    exact: true,
    component: StoriesPage,
  },
  {
    path: '/stories/',
    exact: true,
    component: StoriesPage,
  },
  {
    path: '/stories/:page',
    component: StoriesPage,
  },
  {
    path: '/scary/',
    component: ScaryPage,
    exact: true,
  },
  {
    path: '/scary/:page',
    component: ScaryPage,
    exact: true,
  },
  {
    path: '/story/:id',
    component: StoryPage,
    exact: true,
  },
  {
    path: '/random/',
    component: RandomPage,
    exact: true,
  },
  {
    path: '/about/',
    component: About,
    exact: true,
  },
  {
    path: '/tags/:tag',
    component: TagContentContainer,
    exact: true,
  },
  {
    path: '/user/:username',
    component: UserPageContainer,
    exact: true,
  },
  {
    path: '/new',
    component: privateRoute(UserStoryContainer),
    exact: true,
  },
];
