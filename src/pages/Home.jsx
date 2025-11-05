import MainLayout from "../components/layout/MainLayout";
import Banner from "../components/ui/Banner";
import Themes from "../components/song/Themes.jsx";
import themes from "../utils/Themes.js";
import songData from "../utils/songData.js";
import SongLists from "../components/song/SongLists.jsx";
import SongCard from "../components/song/SongCard.jsx";
import NightSky from "../components/ui/NightSky.jsx";

import { useState, useMemo } from "react";

function Home() {
  const [themesSelected, setThemesSelected] = useState(null);
  const [openSongCard, setOpenSongCard] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
        {themesSelected === null && <Banner />}
        {selectedSong === null && (
          <Themes
            themes={themes}
            themesSelected={themesSelected}
            setThemesSelected={(t) => {
              setThemesSelected(t);
              setOpenSongCard(true);
              // Reset selected song when switching themes
              setSelectedSong(null);
              setIsPlaying(false);
            }}
          />
        )}

        {/* Show SongLists when theme selected but no specific song chosen */}
        {openSongCard && selectedSong === null && (
          <SongLists
            songs={filteredSongs}
            open={openSongCard}
            onClose={() => {
              setOpenSongCard(false);
              setThemesSelected(null);
            }}
            onSongSelect={(song) => {
              setSelectedSong(song);
              setIsPlaying(false);
            }}
          />
        )}
      </div>

      {/* NightSky overlay: only visible when playing */}
      <NightSky visible={isPlaying} blockInteraction={true} />

      {/* Floating SongCard: ensure it's above NightSky and interactive */}
      {selectedSong && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <div className="pointer-events-auto">
            <SongCard
              song={selectedSong}
              isPlaying={isPlaying}
              onTogglePlay={setIsPlaying}
              setSelectedSong={setSelectedSong}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
