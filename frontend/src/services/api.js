const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Generic API Client
 */
export async function api(
    endpoint,
    {
        method = "GET",
        body = null,
        headers = {},
        signal,
    } = {}
) {
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        signal,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        config
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "Something went wrong."
        );
    }

    return data;
}