import axios from "axios";

export function Register(payload) {
    return axios
        .post("https://itschool-library.onrender.com/auth/register", payload);

}

export function nameAvatar(payload) {
    return axios
        .post("https://itschool-library.onrender.com/auth/register", payload);
}