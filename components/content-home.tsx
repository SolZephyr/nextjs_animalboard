export default function ContentHome() {
    return (
        <div className="full-width text-black">
            <section className="py-4 grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
                <aside className="hidden md:block bg-white border border-red-500">
                    Sidebar
                </aside>
                <ul className="grid grid-cols-1 auto-rows-min gap-4 border border-red-500">
                    <li>
                        <article className="bg-white border rounded-md p-4">
                            <h4>Hello</h4>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis vel ea asperiores? Quasi, voluptatum? Quia vero natus voluptatum velit rerum. Dignissimos quidem excepturi maiores debitis fuga sit consequatur molestiae repudiandae.</p>
                        </article>
                    </li>
                    <li>
                        <article className="bg-white border rounded-md p-4">
                            <h4>Hello</h4>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis vel ea asperiores? Quasi, voluptatum? Quia vero natus voluptatum velit rerum. Dignissimos quidem excepturi maiores debitis fuga sit consequatur molestiae repudiandae.</p>
                        </article>
                    </li>
                </ul>
            </section>
        </div>
    );
}