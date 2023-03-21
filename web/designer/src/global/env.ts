export const env: PromiseLike<{
  backendBaseUrl: string,
  templateBaseUrl: string,
}> = fetch('/dev/assets/env.json').then((response) => response.json());
