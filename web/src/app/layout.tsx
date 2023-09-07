import "./styles/tailwind.css";
import "./styles/index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import website from "./config/website";
import DotMatrix from "./components/DotMatrix";
import { PageContextProvider } from "./context/PageContext";
import ModalHover from "./components/ModalHover";
import CursorBlob from "./components/CursorBlob";

export const metadata = {
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={""}>
        <div id='page'>
          <PageContextProvider>
            <DotMatrix />

            <Header />
            <main>{children}</main>
            <Footer />
            <ModalHover />
            <CursorBlob size={20} color='white' />
          </PageContextProvider>
        </div>
      </body>
    </html>
  );
}
