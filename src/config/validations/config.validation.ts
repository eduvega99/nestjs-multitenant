import * as z from 'zod';

const requiredString = z.string().min(1);

const configSchema = z.object({
  PORT: z.preprocess(
    preprocessNumber,
    z.number().int().min(1).max(65535).optional(),
  ),
  JWT_SECRET: z.string().nonempty(),
  DB_HOST: z.hostname(),
  DB_NAME: requiredString,
  DB_USERNAME: requiredString,
  DB_PASSWORD: requiredString,
});

function preprocessNumber(value: string) {
  if (!value) {
    return undefined;
  }
  const parsedValue = Number(value.trim() || NaN);
  return isNaN(parsedValue) ? value : parsedValue;
}

export function validate(config: Record<string, unknown>) {
  const { error, data } = configSchema.safeParse(config);
  if (error) {
    throw new Error(`Config validation error:\n${z.prettifyError(error)}\n`);
  }
  return data;
}
