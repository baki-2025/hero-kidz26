import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from 'next/font/local'
import { fontBangla } from "./fonts";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins(
  {
    weight: ["100", "200", "400", "600", "800"],
  }
)





export const metadata = {
  metadataBase: new URL('https://hero-kidz-peach.vercel.app'),

  title: {
    default: 'HeroKidz - শিশুদের জন্য সেরা খেলনা',
    template: '%s | HeroKidz',
  },

  description:
    'আপনার শিশুর জন্য সেরা ও নিরাপদ খেলনা কিনুন। আকর্ষণীয় ডিসকাউন্টে খেলনা কিনুন এখনই।',

  keywords: [
    'toys',
    'kids toys',
    'toy shop Bangladesh',
    'baby toys',
    'online toy store',
  ],

  authors: [{ name: "HeroKidz Team" }],
  creator: 'HeroKidz',
  publisher: 'HeroKidz',


  icons: {
    icon: 'https://i.ibb.co.com/nqdjJ4ds/image.png',
    width: 150,
    height: 100,
    alt: 'HeroKidz Logo',
  },

  openGraph: {
    title: 'HeroKidz - শিশুদের জন্য সেরা খেলনা',
    description:
      'Best online toy shop in Bangladesh. আপনার শিশুর জন্য মানসম্মত খেলনা এখন এক জায়গায়।',
    url: 'https://hero-kidz-peach.vercel.app',
    siteName: 'HeroKidz',
    images: [
      {
        url: 'https://i.ibb.co.com/8L3y2Kqw/Screenshot-2026-04-10-173302.png',
        width: 1200,
        height: 630,
        alt: 'HeroKidz Home Preview',
      },
      {
        url: 'https://i.ibb.co.com/CKgc2SMJ/Screenshot-2026-04-10-173351.png',
        width: 1200,
        height: 630,
        alt: 'HeroKidz Product Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HeroKidz - Best Toys for Kids',
    description:
      'Buy toys online in Bangladesh with discounts. Safe and quality toys for your children.',
    images: [
      'https://i.ibb.co.com/8L3y2Kqw/Screenshot-2026-04-10-173302.png',
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>
        <main className="py-2 md:w-11/12 mx-auto">
          {children}
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
