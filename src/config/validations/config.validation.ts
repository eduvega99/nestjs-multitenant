import * as z from 'zod';

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
    throw new Error(`Config validation error:\n${z.prettifyError(error)}\n`);
  }
  return data;
}
