import { MainNavItem } from './mainNav';

declare module 'fastify' {
  interface FastifyReply {
    locals: {
      mainNav: MainNavItem[];
      helpers: any;
    };
  }
}
