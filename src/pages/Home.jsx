import MainLayout from "../components/layout/MainLayout";
import Banner from "../components/ui/Banner";
import Themes from "../components/song/Themes.jsx";
import themes from "../utils/Themes.js";
import songData from "../utils/songData.js";
import SongLists from "../components/song/SongLists.jsx";
import SongCard from "../components/song/SongCard.jsx";
import PlayerControl from "../components/song/PlayerControl.jsx";
import NightSky from "../components/ui/NightSky.jsx";
import { usePlayerStore } from "../store/playerStore.js";

import { useMemo } from "react";

function Home() {
  const {
    themesSelected,
    setTheme,
    openSongList,
    closeSongList,
    selectedSong,
    setSelectedSong,
    isPlaying,
    togglePlay,
    setCloseSongCard,
  } = usePlayerStore();

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
        {!themesSelected && !selectedSong && <Banner />}
        {!selectedSong && (
          <Themes
            themes={themes}
            themesSelected={themesSelected}
            setThemesSelected={setTheme}
          />
        )}

        {openSongList && !selectedSong && (
          <SongLists
            songs={filteredSongs}
            open={openSongList}
            onClose={closeSongList}
            onSongSelect={setSelectedSong}
          />
        )}
      </div>

      <NightSky visible={isPlaying} blockInteraction={true} />

      {selectedSong && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <div className="pointer-events-auto">
            <SongCard
              song={selectedSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
            />
            <PlayerControl
              song={selectedSong}
              isPlaying={isPlaying}
              setCloseSongCard={setCloseSongCard}
              onPlayPause={togglePlay}
              onNext={() => usePlayerStore.getState().nextSong()}
              onPrev={() => usePlayerStore.getState().prevSong()}
              onToggleLike={() => {}}
              isLiked={false}
              disabled={false}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
