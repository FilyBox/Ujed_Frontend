import { Karla } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next';
import SessionAuthProvider from './context/SessionAuthProvider';
import { Toaster, toast } from 'sonner';

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
})
export const metadata: Metadata = {
  title: 'UJED',
  description: 'Plataforma Administrativa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={karla.className + ' h-screen overflow-hidden'}>
        

          <>
            <div className="flex flex-col h-full w-full">
              <SessionAuthProvider>
                {children}
            </SessionAuthProvider>
            </div>
            <Toaster richColors />

          </>
      </body>
    </html>
  )
}


