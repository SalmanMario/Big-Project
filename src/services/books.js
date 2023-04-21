import { fetchAndParse, headers } from "./utils";

export const baseURL = 'https://itschool-library.onrender.com';

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
export function getBooks() {
    return fetchAndParse(`${baseURL}/book/search?limit=8&search&offset=0`, {
        headers
    });
}

export function getUsersBooks(_id) {
    return fetchAndParse(`${baseURL}/book/user/${_id}`, {
        headers
    });
}

export function addBook(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("file", data.file);

    const headersCopy = { ...headers };
    delete headersCopy["Content-Type"];
    return fetchAndParse(`${baseURL}/book`, {
        method: "POST",
        body: formData,
        headers: headersCopy,
    });
}

export function editBook(_id, data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    if (data.file instanceof File) {
        // ar trebui sa incercam sa dam update la fisier, numa daca tipul de date este File
        // sa nu uitam ca `data.file` este uniune intre string si File
        formData.append("file", data.file);
    }
    const headersCopy = { ...headers };
    delete headersCopy["Content-Type"];
    return fetchAndParse(`${baseURL}/book/${_id}`, {
        method: "PUT",
        body: formData,
        headers: headersCopy,
    });
}