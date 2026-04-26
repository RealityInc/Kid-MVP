import "./globals.css";

export const metadata = {
  title: "Kid MVP Builder",
  description: "Kid-friendly AI app builder MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
