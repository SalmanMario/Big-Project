import axios from "axios";

export function UserRegister(payload) {
    return axios
        .post("https://itschool-library.onrender.com/auth/register", payload);
}