import { JSONFetch, HTTPMethod } from './games.api';

export const jsonFetch: JSONFetch = async function jsonFetch(
  url: string,
  method: HTTPMethod = "GET",
  data?: any
): Promise<unknown> {
  return fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  }).then(response => response.json());
};
