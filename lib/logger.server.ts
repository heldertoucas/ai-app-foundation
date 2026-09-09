import 'server-only';
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'authorization',
      'cookie',
      'password',
      'token',
      'apiKey',
      '*.password',
      '*.token',
      '*.apiKey',
      'headers.authorization',
      'headers.cookie'
    ],
    remove: true,
  },
});
