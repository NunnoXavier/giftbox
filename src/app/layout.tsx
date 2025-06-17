import Rodape from "@/components/Rodape.tsx/Rodape";
import "./globals.css"
import QueryProviderStore from "../Store/QueryProviderStore";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Si Giftbox',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
       <body className="bg-background text-texto font-sans">
       <QueryProviderStore>
        {children}
        <Rodape></Rodape>
       </QueryProviderStore>
      </body>
    </html>
  );
}
