export default function GlobalWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="content-grid grid-rows-[auto_1fr_auto] min-h-dvh max-h-dvh pt-(--header-height) font-rubik bg-background text-foreground">
            {children}
        </div>
    );
}