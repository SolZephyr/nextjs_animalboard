import { ProfileService } from "@/lib/service/profiles";
import { loginUserState } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const user = await currentUser();
    if (!user) {
        return new Response(JSON.stringify({ error: "Not logged in." }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const loginId = await ProfileService().handleLoginUser(loginUserState(user));

    const body = await request.json();
    const { id } = body;
    if (!id || isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid param." }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const profileId: number = id;
    const result = await ProfileService().addFavourite(profileId, loginId);

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}