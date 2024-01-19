export interface MainNavItem {
  id: string;
  label: string;
  url: string;
}

const mainNav: MainNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: '/',
  },
  {
    id: 'about',
    label: 'About TypeScript Fastify',
    url: '/about',
  },
];

export default mainNav;
