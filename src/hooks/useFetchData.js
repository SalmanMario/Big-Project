import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { headers } from "../services/utils";

// adaugam ca parametru o lista de dependinte, pentru a putea rula fetchData cand se schimba valori externe
// exact ca si un useEffect
export function useFetchData({ fetcher, initialData }, deps = []) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);

    function refetch() {
        setLoading(true);
        fetcher()
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        refetch();
    }, deps);

    // nu as returna headers aici, sunt valori imported din alte fisiere
    return { data, error, loading, refetch };
}