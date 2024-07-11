

export default async function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="AdminLayout">
        <style>
        {`
            .AdminLayout {
                top: 0;
                width: 100%;
                height: 100vh;
                background-color: inherit;
                z-index: 10;
            }

            header, footer, .footer, .navContainer {
            display: none;
            }
        `}
        </style>
        {children}
      </div>
    );
  }
  