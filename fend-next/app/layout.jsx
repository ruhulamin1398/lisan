import "../src/index.css";
import "../src/App.css";
import "react-toastify/dist/ReactToastify.css";
import ClientRoot from "./ClientRoot";

export const metadata = {
  title: "Ruhul Info",
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
