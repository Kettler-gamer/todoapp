type Method = "GET" | "POST" | "PATCH" | "DELETE";

export function fetchJson(url: string, method: Method, body?: object) {
    const headers: HeadersInit = {
        authorization: sessionStorage.getItem("token") as string,
        "Content-Type": "application/json"
    }

    const fetchOptions: RequestInit = {
        headers,
        method
    }

    if(method !== "GET"){
        fetchOptions.body = JSON.stringify(body);
    }

    return fetch(url, fetchOptions);
}