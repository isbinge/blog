import BlogLayout from '@/layouts/BlogLayout';
import HomePage from '@/pages/Home';

const routeConfig = [
  {
    component: BlogLayout,
    routes: [
      {
        path: '/',
        component: HomePage,
      },
    ],
  },
];

export default routeConfig;
