import localFont from 'next/font/local'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <div className="mx-auto flex max-w-5xl p-4">
            <Link href="/" className="inline">
              <Image
                width={48}
                height={48}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qCreqkTZL0F0bF9kZctFE1XVFocO__70kw&s"
                alt="logo"
              />
            </Link>
          </div>
        </header>
        <main className="mx-auto mt-8 w-full max-w-5xl p-4">{children}</main>
      </body>
    </html>
  )
}
