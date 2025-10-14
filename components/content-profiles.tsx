import { ProfileListParams } from "@/lib/types";
import Sidebar from "./sidebar";

export default function ContntProfiles({ params }: { params: ProfileListParams }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 ml-2">
                <h2>Profiles</h2>
            </main>
            <Sidebar />
        </div>
    );
}