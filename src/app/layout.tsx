import type { Metadata } from "next";
import "@/styles/globals.css";
import { ClientLayout } from "./ClientLayout";

export const metadata: Metadata = {
  title: "TODO アプリ",
  description: "Next.js 16 App Router + TanStack Query + MUI の TODO アプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
