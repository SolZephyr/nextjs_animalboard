import ContentMain from '@/components/content-main';
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <ContentMain>
            <SignUp /><SignUp />
        </ContentMain>
    );
}
