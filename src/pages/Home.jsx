import MainLayout from "../components/layout/MainLayout";
import Banner from "../components/ui/Banner";
import Themes from "../components/song/Themes.jsx";
function Home() {
  return (
    <MainLayout>
      <div className="p-4">
        <Banner />
        <Themes />
      </div>
    </MainLayout>
  );
}
export default Home;
