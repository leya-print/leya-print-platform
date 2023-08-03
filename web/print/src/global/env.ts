import { Env } from "@leya-print/common-api";

export const env: PromiseLike<Env> = fetch('/print/assets/env.json').then((response) => response.json());