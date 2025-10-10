export default function GlobalWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="pt-[60px] min-h-dvh max-h-dvh content-grid grid-rows-[auto_1fr_auto]">
            {children}
        </div>
    );
}