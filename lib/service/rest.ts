export const RestService = () => {

    async function get(endpoint: string) {
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                return {
                    status: response.status,
                    error: response.statusText
                }
            }
            const body = await response.json();
            return {
                status: response.status,
                body
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(`${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async function post(endpoint: string, data: object) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                return {
                    status: response.status,
                    error: response.statusText
                }
            }
            const body = await response.json();
            return {
                status: response.status,
                body
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(`${error instanceof Error ? error.message : String(error)}`);
        }
    }

    const getData = async function (value?: string) {
        try {
            if (value) {
                return await post("/rest/test", { value: value });
            } else {
                return await get("/rest/test");
            }
        } catch (error) {
            console.error("Error fetch: " + error);
            return false;
        }
    }

    return { getData }
}