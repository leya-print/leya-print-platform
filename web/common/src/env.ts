import { Env } from "./env.model";

const pathname = window.location.pathname;
const pathSegments = pathname.split('/');
const firstPathSegment = pathSegments[1];

const host = window.location.host;
const path = `/${firstPathSegment}/assets/env.json`;
let protocol = 'http'

if (firstPathSegment === "dev"){
    protocol = 'https'
}

if (firstPathSegment === "print"){
    protocol = 'http'
}

const url = `${protocol}://${host}${path}`;
export const env: PromiseLike<Env> = fetch(url).then((response) => response.json());