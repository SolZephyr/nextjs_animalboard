"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RestService } from "@/lib/service/rest";

export default function TestAPI() {

    const [data, setData] = useState();

    const handleClick = async () => {
        const result = await RestService().getData("Testing");
        if (result) {
            setData(result.body);
        }
    }

    return (
        <Button className="bg-white border border-border text-black hover:bg-gray-300" onClick={handleClick}>{`Data: ${(data ?? "None")}`}</Button>
    );
}