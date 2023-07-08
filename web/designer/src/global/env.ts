import { Env } from "@leya-print/common-api";

export const env: PromiseLike<Env> = fetch('/dev/assets/env.json').then((response) => response.json());