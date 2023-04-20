import { baseURL } from "./books";
import { fetchAndParse, headers } from "./utils";

export function loginServices(data) {
    return fetchAndParse(`${baseURL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });
}

export function registerServices(data) {
    return fetchAndParse(`${baseURL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });
}
