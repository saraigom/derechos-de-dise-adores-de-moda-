import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "ModaLex AI — Derecho de la moda en Colombia",
  description:
    "Asistente académico de orientación jurídica en propiedad intelectual y derechos de autor para diseñadores de moda en Colombia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
