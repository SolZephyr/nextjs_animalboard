import { createProfile, createProfileFavourite, deleteProfileFavourite, readProfile, readProfileAnimals, readProfileCountries, readProfileFavourites, readProfiles } from "@/db/profiles";
import jsonProfiles from "@/lib/data/profiles.json";
import { Media, Profile, ProfileListParams, ProfileListResult, StringListResult, UserState } from "../types";
import { readMediaByProfile } from "@/db/media";
import { handleClerkUser, readUserByClerk } from "@/db/users";

export const ProfileService = () => {

    const handleLoginUser = (userdata: UserState) => {
        return handleClerkUser(userdata);
    }

    const getUserByLogin = (loginId: string) => {
        return readUserByClerk(loginId);
    }

    const getProfiles = (params: ProfileListParams): Promise<ProfileListResult> => {
        return readProfiles(params);
    }

    const getProfile = (id: number, userId?: number): Promise<Profile | null> => {
        return readProfile(id, userId)
    }

    const getProfileImages = (id: number): Promise<Media[] | null> => {
        return readMediaByProfile(id);
    }

    const getAnimals = (): Promise<StringListResult> => {
        return readProfileAnimals();
    }

    const getCountries = (): Promise<StringListResult> => {
        return readProfileCountries();
    }

    const addFavourite = async (profileId: number, userId: number): Promise<{ current: boolean; count: number; }> => {
        const select = await readProfileFavourites(profileId, userId);
        let current = (select.length > 0);
        if (current) {
            // Remove
            const removed = await deleteProfileFavourite(profileId, userId);
            current = (removed == 0);
        } else {
            // Add
            const added = await createProfileFavourite(profileId, userId);
            current = (added > 0);
        }
        const count = await readProfileFavourites(profileId);
        return {
            current: current,
            count: count.length
        }
    }

    const populate = () => {
        const data = jsonProfiles ?? [];

        const profiles: Profile[] = data.map(item => {
            const media: Media = {
                type: "IMAGE",
                source: item.avatarUrl,
                created: new Date(item.created),
                updated: null
            }
            const profile: Profile = {
                id: item.id,
                name: item.name,
                nicknames: item.nicknames,
                user: item.user,
                avatar: media,
                animal: item.animal,
                breed: item.breed,
                country: item.country,
                home: item.home,
                about: item.about,
                dateOfBirth: new Date(item.dateOfBirth),
                created: new Date(item.created),
                updated: null
            }
            return profile;
        });
        profiles.map(profile => {
            createProfile(profile);
        });
    }

    return { getProfiles, getProfile, getProfileImages, getAnimals, getCountries, populate, handleLoginUser, getUserByLogin, addFavourite };
}