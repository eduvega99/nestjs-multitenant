import z from 'zod';
import { $ZodIssue } from 'zod/v4/core';

const requiredString = z.string().min(1);

const configSchema = z.object({
  PORT: z.preprocess(
    (value: string | undefined) => (value ? parseInt(value) : undefined),
    z.number().int().min(1).max(65535).optional(),
  ),
  DB_HOST: z.hostname(),
  DB_NAME: requiredString,
  DB_USERNAME: requiredString,
  DB_PASSWORD: requiredString,
});

export function validate(config: Record<string, unknown>) {
  const { error, data } = configSchema.safeParse(config);
  if (error) {
    const errorMessage = error.issues.map(format).join('. ');
    throw new Error('Config validation error. ' + errorMessage);
  }
  return data;
}

function format({ path, message }: $ZodIssue) {
  const formatted = message.charAt(0).toLowerCase() + String(message.slice(1));
  return `"${path.toString()}" ${formatted}`;
}
