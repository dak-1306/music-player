import MainLayout from "../components/layout/MainLayout";
import Banner from "../components/ui/Banner";
import Themes from "../components/song/Themes.jsx";
import themes from "../utils/Themes.js";
import songData from "../utils/songData.js";
import SongLists from "../components/song/SongLists.jsx";
import SongCard from "../components/song/SongCard.jsx";

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

        {/* Show SongLists when theme selected but no specific song chosen */}
        {openSongCard && !selectedSong && (
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

        {/* Show SongCard when specific song is selected */}
        {selectedSong && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedSong(null);
                  setIsPlaying(false);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                ← Quay lại danh sách
              </button>
              <button
                onClick={() => {
                  setSelectedSong(null);
                  setOpenSongCard(false);
                  setThemesSelected(null);
                  setIsPlaying(false);
                }}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
              >
                Đóng
              </button>
            </div>

            <SongCard
              song={selectedSong}
              isPlaying={isPlaying}
              onTogglePlay={setIsPlaying}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
