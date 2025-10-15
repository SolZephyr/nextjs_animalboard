import { Badge } from "./ui/badge";

export function ProfileTag({ label }: { label: string }) {
    return (
        <Badge variant="default" className="p-2 px-4 rounded-full min-w-16 text-md mx-1">{label}</Badge>
    );
}