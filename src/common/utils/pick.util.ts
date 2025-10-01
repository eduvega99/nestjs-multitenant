export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>;
}
