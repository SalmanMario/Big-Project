import { useLayoutEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { handleTokenUpdate } from "../services/utils";
import { loginServices } from "../services/auth";

const initialAuth = {
    user: null,
};

export function useAuth() {
    const [{ user, token }, setUser] = useLocalStorage("worldOfBooks", initialAuth);

    useLayoutEffect(() => {
        handleTokenUpdate(token);
    }, [token]);

    // interactionarea cu starea
    async function login(credentials) {
        try {
            const userInfo = await loginServices(credentials);
            setUser(userInfo);
        } catch (error) {
            throw error.data.message || "Error";
        }
    }

    function logout() {
        setUser(initialAuth);
    }

    return {
        user,
        login,
        logout
    };
}