import { IEnv } from "@leya-print/common-api";

export const env: PromiseLike<IEnv> = fetch('/dev/assets/env.json').then((response) => response.json());