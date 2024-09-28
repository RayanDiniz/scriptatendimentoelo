import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "@/app/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScriprtElo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-zinc-900 text-white p-10`}>
        <header className="container max-w-[800px] flex justify-between mb-8">
          <nav className="flex gap-5">
            <Link href="/" className="hover:underline">Atendimento</Link>
            <Link href="/protocolos" className="hover:underline">Protocolos de Atendimento</Link>
          </nav>
        </header>
        <h1 className="text-white w-500">Script de Atendimento ao Cliente</h1>
        <main className="main container max-w-[800px]">{children}</main>
      </body>
    </html>
  )
}