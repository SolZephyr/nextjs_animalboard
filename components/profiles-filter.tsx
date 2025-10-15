"use client";

import { useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import { use } from "react";
import SelectClear from "./ui/select-clear";

export function ProfilesFilter({ data }: { data: Promise<[string[], string[]]> }) {
    const [animals, countries] = use(data);
    const ANIMAL_DEFAULT = "all";
    const COUNTRY_DEFAULT = "all";

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);
    //const animal = searchParams.get("animal") ?? ANIMAL_DEFAULT;
    //const country = searchParams.get("country") ?? COUNTRY_DEFAULT;

    function onAnimalChange(e: string): void {
        if (e !== ANIMAL_DEFAULT && e !== null)
            urlParams.set("sort", e);
        else
            urlParams.delete("sort");
        replace(`/profiles/?${urlParams.toString()}`);
    }

    function onCountryChange(e: string): void {
        if (e !== COUNTRY_DEFAULT)
            urlParams.set("filter", e);
        else
            urlParams.delete("filter");
        replace(`/profiles/?${urlParams.toString()}`);
    }

    return (
        <section className="flex flex-row mb-2">
            <Select onValueChange={(e) => onAnimalChange(e)}>
                <SelectTrigger className="w-30 cursor-pointer">
                    <SelectValue placeholder="Animal" />
                </SelectTrigger>
                <SelectContent>
                    <SelectClear>All</SelectClear>
                    {animals.map(animal => (
                        <SelectItem key={animal.toLowerCase()} value={animal.toLowerCase()}>{animal}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={(e) => onCountryChange(e)}>
                <SelectTrigger className="w-30 mx-2 cursor-pointer">
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectClear>All</SelectClear>
                    {countries.map(country => (
                        <SelectItem key={country.toLowerCase()} value={country.toLowerCase()}>{country}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </section>
    );
}