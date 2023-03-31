import { useEffect, useState } from "react";
import { headers } from "../services/utils";

export function useFetchData(fetcher, initialData) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetcher().then(data => {
            setData(data);
        });
    }, []);

    return {
        data,
        headers
    };
}