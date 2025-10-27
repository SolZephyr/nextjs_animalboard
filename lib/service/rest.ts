export const RestService = () => {

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

    const favouriteProfile = async function (profileId: number) {
        if (profileId) {
            try {
                return await post("/rest/profile/favourite", { id: profileId });
            } catch (error) {
                console.error("Error fetch: " + error);
                return;
            }
        }
    }

    const likePost = async function (postId: number) {
        if (postId) {
            try {
                return await post("/rest/post/like", { id: postId });
            } catch (error) {
                console.error("Error fetch: " + error);
                return;
            }
        }
    }

    return { favouriteProfile, likePost }
}