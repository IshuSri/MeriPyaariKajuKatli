import "./globals.css";
import { Caveat, Cormorant_Garamond, Poppins } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${cormorant.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}