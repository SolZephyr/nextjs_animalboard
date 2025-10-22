"use client";

import { useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import { use } from "react";
import SelectClear from "./ui/select-clear";
import { StringListResult } from "@/lib/types";

export function ProfilesFilter({ data }: { data: Promise<[StringListResult, StringListResult]> }) {
    const [animalData, countryData] = use(data);

    const animals = animalData?.data ?? [];
    const countries = countryData?.data ?? [];
    const ANIMAL_DEFAULT = "all";
    const COUNTRY_DEFAULT = "all";

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);

    function onAnimalChange(e: string): void {
        if (e !== ANIMAL_DEFAULT && e !== null)
            urlParams.set("animal", e);
        else
            urlParams.delete("animal");
        replace(`/profiles/?${urlParams.toString()}`);
    }

    function onCountryChange(e: string): void {
        if (e !== COUNTRY_DEFAULT && e !== null)
            urlParams.set("country", e);
        else
            urlParams.delete("country");
        replace(`/profiles/?${urlParams.toString()}`);
    }

    return (
        <section className="flex flex-row">
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
                <SelectTrigger className="w-30 ml-2 cursor-pointer">
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