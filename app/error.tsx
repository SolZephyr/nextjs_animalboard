'use client';

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section className="flex flex-col justify-center items-center min-h-auto">
            <h4>Something went wrong!</h4>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </section>
    )
}