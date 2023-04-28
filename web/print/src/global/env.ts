import { IEnv } from "@leya-print/common-api";

export const env: PromiseLike<IEnv> = fetch('/print/assets/env.json').then((response) => response.json());