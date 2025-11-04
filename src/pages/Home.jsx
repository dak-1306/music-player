import MainLayout from "../components/layout/MainLayout";
import Banner from "../components/ui/Banner";
import Themes from "../components/song/Themes.jsx";
import themes from "../utils/Themes.js";
import songData from "../utils/songData.js";
import SongLists from "../components/song/SongLists.jsx";

import { useState, useMemo } from "react";
function Home() {
  const [themesSelected, setThemesSelected] = useState(null);
  const [openSongCard, setOpenSongCard] = useState(false);

  // only songs for selected theme (empty when none selected)
  const filteredSongs = useMemo(
    () =>
      themesSelected
        ? songData.filter((s) => s.idThemes === themesSelected.id)
        : [],
    [themesSelected]
  );

  return (
    <MainLayout>
      <div className="p-4">
        {themesSelected===null && <Banner />}
        <Themes
          themes={themes}
          themesSelected={themesSelected}
          setThemesSelected={(t) => {
            setThemesSelected(t);
            setOpenSongCard(true);
          }}
        />
        <SongLists
          songs={filteredSongs}
          open={openSongCard}
          onClose={() => {
            setOpenSongCard(false);
            setThemesSelected(null);
          }}
        />
      </div>
    </MainLayout>
  );
}
export default Home;
