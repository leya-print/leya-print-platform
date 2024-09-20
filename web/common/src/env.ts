import { Env } from "./env.model";

const pathname = window.location.pathname;
const pathSegments = pathname.split('/');
const firstPathSegment = pathSegments[1];

const protocol = window.location.protocol;
const host = window.location.host;
const path = `/${firstPathSegment}/assets/env.json`;

const url = `${protocol}//${host}${path}`;

export const env: PromiseLike<Env> = fetch(url).then((response) => response.json());