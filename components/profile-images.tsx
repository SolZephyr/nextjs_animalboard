import MediaGallery from "./media-gallery";
import { ProfileService } from "@/lib/service/profiles";

export default async function ProfileImages({ profileId }: { profileId: number }) {

    const data = ProfileService().getProfileImages(profileId);

    const result = await data;
    if (!result || result.length <= 0) {
        return (<p className="p-4 text-base text-center">No images were found.</p>);
    }

    return (
        <MediaGallery images={result} />
    );
}