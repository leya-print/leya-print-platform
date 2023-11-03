import { Env } from "@leya-print/web-common";

export const env: PromiseLike<Env> = fetch('/print/assets/env.json').then((response) => response.json());