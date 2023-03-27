import { fetchAndParse } from "./utils";

export const baseURL = 'https://itschool-library.onrender.com';

export function getBooks() {
    // return axios.get("/book/my-books")
    return fetchAndParse(`${baseURL}/book/my-books`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzViZWQ1NmY3NDkxNmI5ZDc1ODc5NTgiLCJpYXQiOjE2NzgzMDQwNzY5NTUsInR5cGUiOiJhY2Nlc3MifQ.T7uXUlV-51QQMZMWqHLNI4fTiBd1mdZjX9SdRQlLVOQ`
        }
    });
}

export function getBookById(_id) {
    return fetchAndParse(`${baseURL}/book/${_id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzViZWQ1NmY3NDkxNmI5ZDc1ODc5NTgiLCJpYXQiOjE2NzgzMDQwNzY5NTUsInR5cGUiOiJhY2Nlc3MifQ.T7uXUlV-51QQMZMWqHLNI4fTiBd1mdZjX9SdRQlLVOQ`
        }
    });
}