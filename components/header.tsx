import Link from "next/link";

export default function Header() {

    const navLinks = [
        {
            url: "/", label: "Page"
        },
        {
            url: "/", label: "Page"
        },
        {
            url: "/", label: "Page"
        }
    ];

    return (
        <header className="content-grid fixed top-[0] left-[0] right-[0] z-999 w-full h-(--header-height) bg-white">
            <section className="flex flex-row items-center justify-between border border-red-500 text-black p-2">
                <h1>PROJECT</h1>
                <nav>
                    <ul className="flex flex-row gap-4">
                        {navLinks.map((nav, index) => (
                            <li key={index}>
                                <Link href={nav.url} className="hover:bg-black hover:text-white p-5">{nav.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button className="border border-red-500 w-10 h-10 hover:bg-black hover:text-white"></button>
            </section>
        </header>
    );
}