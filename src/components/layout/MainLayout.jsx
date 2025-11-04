import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-grow bg-light">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
