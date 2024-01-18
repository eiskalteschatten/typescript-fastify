import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import logger from '~/lib/logger';
import transporter from '~/lib/mailTransporter';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

const generateHtml = (emailData: EmailData): string => {
  return `<html>
    <head>
      <title>${emailData.name}</title>
    </head>
    <body>
      <p>
        <b>Name:</b> ${emailData.name}<br>
        <b>Email:</b> ${emailData.email}
      </p>
      <p><b>Message:</b></p>
      <p>${emailData.message}</p>
    </body>
  </html>`;
};

export default async (app: FastifyInstance) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.view('contact.ejs', {
      title: 'Contact',
    });
  });

  type ContactFormRequest = FastifyRequest<{ Body: EmailData }>;
  app.post('/', async (req: ContactFormRequest, reply: FastifyReply) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'alex@alexseifert.com',
        subject: 'Email from TypeScript Fastify',
        html: generateHtml(req.body),
      });

      return reply.view('contact.ejs', {
        title: 'Contact',
        success: true,
      });
    }
    catch (error) {
      logger.error(error);

      return reply.view('contact.ejs', {
        title: 'Contact',
        error: true,
      });
    }
  });
};
