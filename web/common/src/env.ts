import { Env } from "./env.model";

const pathname = window.location.pathname;
const pathSegments = pathname.split('/');
const firstPathSegment = pathSegments[1];

const host = window.location.host;
const path = `/${firstPathSegment}/assets/env.json`;

// TODO: currently must set protocol manually because PDF Service will return error if protocol is not https
// const protocol = window.location.protocol

let protocol = 'http:'

if (firstPathSegment === "dev"){
    protocol = 'https:'
}

if (firstPathSegment === "print"){
    protocol = 'http:'
}

const url = `${protocol}//${host}${path}`;

export const env: PromiseLike<Env> = fetch(url).then((response) => response.json());