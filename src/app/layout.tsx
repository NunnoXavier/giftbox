import "./globals.css"
import QueryProviderStore from "@/components/Store/QueryProviderStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
       <body>
       <QueryProviderStore>
        {children}
       </QueryProviderStore>
      </body>
    </html>
  );
}
