import "../src/index.css";
import "../src/App.css";
import "react-toastify/dist/ReactToastify.css";
import ClientRoot from "./ClientRoot";

export const metadata = {
  title: "Ruhul Amin - Full Stack Developer & Researcher",
  description:
    "Portfolio of Ruhul Amin — Full-stack & Blockchain Developer with 6+ years of experience in Express.js, Next.js, Cloud Computing, and Smart Contract development. Published 10+ research papers.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ruhul Amin - Full Stack Developer & Researcher",
    description:
      "Full-stack & Blockchain Developer | 6+ years experience | 10+ Research Papers",
    url: "https://ruhul-info.vercel.app",
    siteName: "Ruhul Amin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruhul Amin - Full Stack Developer & Researcher",
    description:
      "Full-stack & Blockchain Developer | 6+ years experience | 10+ Research Papers",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-glacial">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
