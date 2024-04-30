import { z } from 'zod';

import { logger } from '@/lib';

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
    PORT: z.coerce.number().default(3001),
    JWT_SECRET: z.string().default('secret'),
    DATABASE_URL: z.string().url({ message: 'Invalid database URL' }),
    SENTRY_DSN: z.string().url({ message: 'Invalid Sentry DSN' }),
  })

  .refine((env) => {
    return (['development', 'test'].includes(env.NODE_ENV) || env.SENTRY_DSN) &&
      (!['production', 'staging'].includes(env.NODE_ENV) || env.SENTRY_DSN);
  }, {
    message: 'Sentry DSN is required in production or staging environment and development',
    path: ['SENTRY_DSN'],
  });
type Env = z.infer<typeof envSchema>;

export function assertEnv(env: unknown): asserts env is Env {
  try {
    envSchema.parse(env);
    logger.info('Environment variables loaded!');
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Invalid environment variables', { cause: error.flatten().fieldErrors });
    }
  }
}

assertEnv(process.env);

export const env = envSchema.parse(process.env);

export const isDev = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';
export const isStaging = env.NODE_ENV === 'staging';
export const isProd = env.NODE_ENV === 'production';
