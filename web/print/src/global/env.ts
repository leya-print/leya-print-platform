export const env: PromiseLike<{
  backendBaseUrl: string,
  templateBaseUrl: string,
}> = fetch('/print/assets/env.json').then((response) => response.json());
