import ContentMain from "@/components/content-main";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <ContentMain>
            <div className="p-4 border border-border rounded-md flex flex-col gap-4">
                <section>
                    <h2 className="text-xl mb-4">About</h2>
                    <p className="my-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate harum assumenda excepturi sequi, iure animi reiciendis nobis, possimus modi quod eos, blanditiis debitis nihil delectus nostrum temporibus asperiores et sapiente!</p>
                    <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perferendis qui excepturi adipisci natus error quam placeat exercitationem cumque quibusdam laborum voluptatibus eos, consequuntur accusamus ex distinctio sit reiciendis delectus.</p>
                </section>
                <section>
                    <h2 className="text-xl mb-4">Contact</h2>
                    <p className="my-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate harum assumenda excepturi sequi, iure animi reiciendis nobis, possimus modi quod eos, blanditiis debitis nihil delectus nostrum temporibus asperiores et sapiente!</p>
                    <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perferendis qui excepturi adipisci natus error quam placeat exercitationem cumque quibusdam laborum voluptatibus eos, consequuntur accusamus ex distinctio sit reiciendis delectus.</p>
                </section>
                <section>
                    <h2 className="text-xl mb-4">Support</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque deserunt possimus tempora aperiam magnam maiores.</p>
                    <form action="" className="flex flex-col gap-2 my-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="name@example.com" className="border border-border p-2 rounded-md" />
                        <label htmlFor="title">Title</label>
                        <input type="text" name="text" placeholder="..." className="border border-border p-2 rounded-md" />
                        <label htmlFor="text">Details</label>
                        <textarea name="text" cols={10} className="border border-border p-2 rounded-md"></textarea>
                        <Button className="p-6" disabled>Submit</Button>
                    </form>
                </section>
            </div>
        </ContentMain>
    );
}