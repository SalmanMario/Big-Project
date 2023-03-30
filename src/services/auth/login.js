import axios from "axios";

export function UserLogin(payload) {
    return axios
        .post("https://itschool-library.onrender.com/auth/login", payload);
}