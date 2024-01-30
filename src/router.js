import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamFooter from './pages/TeamFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

// createRouter is a function that returns a router object
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, 
    {
      names: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamFooter,
      },
      // nested routes with children property (array of routes) inside a route object (TeamsList) to render nested components (TeamMembers) inside the parent component (TeamsList) using <router-view> in the parent component (TeamsList)
      children: [
        {
          name: 'team-members',
          path: ':teamId', // dynamic path segment to use path parameter (teamId) in the nested component (TeamMembers)
          component: TeamMembers,
          props: true, // pass path parameter as props to the nested component (TeamMembers)
        }, // our-domain.com/teams/t1 => TeamMembers
      ],
    }, 
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log('Users brforeEnter');
        console.log(to, from);
        next();
      }, // navigation beforeEnter guard for a specific route
    },
    { path: '/:notFound(.*)', component: NotFound }, 
  ],
  linkActiveClass: 'active',

  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }, // control scroll behavior on navigation to a new route (scroll to top of page) or back/forward navigation (scroll to saved position) or navigation to a specific route (scroll to top of page) or navigation to a specific route with a hash (scroll to element with the id of the hash) 
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    next();
  } else {
    next();
  }
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
});

router.afterEach(function (to, from) {
  // sending analytics data
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
