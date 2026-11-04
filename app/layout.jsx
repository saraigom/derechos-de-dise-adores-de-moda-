import "./globals.css";

export const metadata = {
  title: "ModaLex AI — Derecho de la moda en Colombia",
  description:
    "Asistente académico de orientación jurídica en propiedad intelectual y derechos de autor para diseñadores de moda en Colombia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
