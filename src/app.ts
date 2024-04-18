import Fastify, { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import ejs from 'ejs';
import path from 'path';

import mainNav from './mainNav';
import * as esjHelpers from './lib/ejsHelpers';

const port = Number(process.env.PORT) || 4000;

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ignoreTrailingSlash: true,
});

app.addHook('preHandler', function (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) {
  // Global variables for the EJS templates can be set here
  reply.locals = {
    mainNav,
    helpers: esjHelpers,
  };

  done();
});

app.register(formBody);

app.register(fastifyView, {
  engine: { ejs },
  root: './templates',
  layout: '_layout.ejs',
});

app.register(helmet, {
  global: true,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      /* eslint-disable quotes */
      defaultSrc: ["'self'"],
      'img-src': ["'self'", 'https:', 'data:'],
      scriptSrc: ["'self'"],
      /* eslint-enable quotes */
      ...process.env.NODE_ENV === 'development' && {
        'upgrade-insecure-requests': null,
      },
    },
  },
});

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'public'),
});

app.setNotFoundHandler((req: FastifyRequest, reply: FastifyReply) => {
  reply.view('404.ejs', {
    title: 'Page Not Found!',
  });
});

app.listen({ port }, error => {
  if (error) {
    throw error;
  }
});

export default app;
