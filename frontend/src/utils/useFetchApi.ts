import { useEffect, useState } from "react";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export type TApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
};

export const useApiGet = (url: string): TApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch(`${baseUrl}${url}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '4570107fdamsh7793587a36b75b5p189dcajsnf2ab4e91dde5',
                    'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
                }
            });
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
            setData(json);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return { status, statusText, data, error, loading };
};

