export default function GlobalWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
            {children}
        </div>
    );
}