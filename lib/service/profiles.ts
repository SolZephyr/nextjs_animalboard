import { createProfile, readProfile, readProfiles } from "@/db/profiles";
import jsonProfiles from "@/lib/data/profiles.json";
import { Profile, ProfileListParams, ProfileListResult } from "../types";

export const ProfileService = () => {

    const getProfiles = (params: ProfileListParams): Promise<ProfileListResult> => {
        return readProfiles(params);
    }

    const getProfile = (id: number): Promise<Profile | null> => {
        return readProfile(id)
    }

    const getAnimals = (): Promise<string[]> => {
        return new Promise(function (resolve) {
            const list: string[] = [
                "Cat",
                "Dog"
            ];
            resolve(list);
        });
    }

    const getCountries = (): Promise<string[]> => {
        return new Promise(function (resolve) {
            const list: string[] = [
                "Sweden"
            ];
            resolve(list);
        });
    }

    const populate = () => {
        const data = jsonProfiles ?? [];
        const profiles: Profile[] = data.map(item => {
            const profile: Profile = {
                id: item.id,
                name: item.name,
                nicknames: item.nicknames,
                user: item.user,
                avatar: item.avatar,
                animal: item.animal,
                breed: item.breed,
                country: item.country,
                home: item.home,
                about: item.about,
                dateOfBirth: new Date(item.dateOfBirth),
                created: new Date(item.created),
                updated: new Date(item.updated)
            }
            return profile;
        });
        profiles.map(profile => {
            createProfile(profile);
        });
    }

    return { getProfiles, getProfile, getAnimals, getCountries, populate };
}