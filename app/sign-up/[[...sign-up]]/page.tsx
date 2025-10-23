import ContentMain from '@/components/content-main';
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <ContentMain>
            <section className="flex justify-center py-10">
                <SignUp />
            </section>
        </ContentMain>
    );
}
