import "./globals.css"
import QueryProviderStore from "@/components/Store/QueryProviderStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
       <body className="bg-gray-100">
       <QueryProviderStore>
        {children}
       </QueryProviderStore>
      </body>
    </html>
  );
}
