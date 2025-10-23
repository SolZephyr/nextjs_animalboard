import ContentMain from '@/components/content-main';
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <ContentMain>
            <section className="flex justify-center py-10">
                <SignIn />
            </section>
        </ContentMain>
    );
}