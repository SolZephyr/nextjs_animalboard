import { simpleAdd, simpleEdit, simpleGet, simpleRemove, TestUser, TestUserState } from "@/db/simple";

export default async function SimpleDB({ db }: { db: string | string[] | undefined }) {
    let data = "";
    switch (db) {
        case "add":
            {
                const testuser: TestUser = {
                    email: "test@simple.com",
                    firstname: "Test",
                    lastname: "Simple"
                }
                const result = await simpleAdd(testuser);
                console.log(result);
                data = result.toString();
            }
            break;
        case "get":
            {
                const result = await simpleGet({});
                console.log(result);
                data = result.toString();
            }
            break;
        case "edit":
            {
                const testuser: TestUserState = {
                    id: 3,
                    firstname: "Change"
                }
                const result = await simpleEdit({ data: testuser });
                console.log(result);
                data = result.toString();
            }
            break;
        case "remove":
            {
                const result = await simpleRemove({ id: 3 });
                console.log(result);
                data = result.toString();
            }
            break;
    }

    return (
        <div>
            {data ? <div>{data}</div> : ""}
        </div>
    );
}