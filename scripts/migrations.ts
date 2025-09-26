/* eslint-disable no-console */
import { execSync } from 'child_process';

import * as z from 'zod';

const schema = z
  .object({
    type: z.enum(['public', 'tenant']),
    action: z.enum(['generate', 'run', 'revert']),
    name: z.string().nonempty().optional(),
  })
  .refine((input) => !(input.action === 'generate' && !input.name), {
    path: ['name'],
    error: 'Invalid input: property is required when "action" is "generate"',
  });

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((arg) => arg.replace(/^--/, '').split('=') as [string, string]),
);

const { error, data } = schema.safeParse(args);

if (error) {
  console.error(`Invalid migrations params:\n${z.prettifyError(error)}`);
  process.exit(1);
}

let command = `npx typeorm-ts-node-commonjs migration:${data.action}`;
if (data.action === 'generate') {
  command += ` ./src/database/migrations/${data.type}/${data.name!}`;
}
command += ` -d ./src/database/${data.type}-data-source.ts`;

execSync(command, { stdio: 'inherit' });
