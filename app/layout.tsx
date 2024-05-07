import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from 'react-redux';
import StoreProvider from './StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
