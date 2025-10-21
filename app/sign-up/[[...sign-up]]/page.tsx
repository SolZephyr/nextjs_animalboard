import Sidebar from '@/components/sidebar';
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (<div className="grid grid-content-home">
        <main className="grid-area-content grid grid-cols-1 ml-2 my-2">
            <SignUp />
        </main>
        <Sidebar />
    </div>);
    return
}
