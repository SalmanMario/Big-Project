import { fetchAndParse, headers } from "./utils";

export const baseURL = 'https://itschool-library.onrender.com';

export function getBooks() {
    return fetchAndParse(`${baseURL}/book/`, {
        headers
    });
}

export function getBookById(_id) {
    return fetchAndParse(`${baseURL}/book/${_id}`, {
        headers
    });
}

export function getMyBooks() {
    return fetchAndParse(`${baseURL}/book/my-books`, {
        headers
    });
}

// Get books pentru paginare,limita carti pe o pagina
// export function getBooks() {
//     return fetchAndParse(`${baseURL}/book/search?limit=8&search&offset=0`, {
//         headers
//     });
// }