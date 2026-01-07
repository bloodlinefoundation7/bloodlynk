import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/loading/loading';

// We removed Metadata and Fonts from here because they are inherited from the Root Layout

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="p-4 shadow bg-white">
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}
