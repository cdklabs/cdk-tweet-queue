export class MissingEnvironmentVariableError extends Error {
  constructor(key: string) {
    super(`Missing environment variable ${key}`)
  }
}

export class InvalidEnvironmentVariableError extends Error {
  value: string;

  constructor(error: Error, value: string) {
    super(`Unparseable environment variable value: ${error.message || error}`)
    this.value = value
  }
}

export function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new MissingEnvironmentVariableError(key);
  }

  return value;
}

export interface Json {
  [x: string]: string | number | boolean | Date | Json | JsonArray;
}
export interface JsonArray extends Array<string | number | boolean | Date | Json | JsonArray> { }

export function getJSONEnv<T>(key: string): T {
  const unparsed = getEnv(key);

  try {
    return JSON.parse(unparsed);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      throw new InvalidEnvironmentVariableError(err, unparsed)
    }

    throw err
  }
}