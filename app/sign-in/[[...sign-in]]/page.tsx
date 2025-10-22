import ContentMain from '@/components/content-main';
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <ContentMain>
            <SignIn />
        </ContentMain>
    );
}