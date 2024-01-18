export interface MainNavItem {
  id: string;
  label: string;
  url: string;
  emoji?: string;
}

const mainNav: MainNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: '/',
    emoji: '🏠',
  },
  {
    id: 'about',
    label: 'About TypeScript Fastify',
    url: '/about',
    emoji: '☝️',
  },
];

export default mainNav;
