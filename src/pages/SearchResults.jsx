import React, { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import songData from "../utils/songData";
import SongLists from "../components/song/SongLists";
import MainLayout from "../components/layout/MainLayout";
import { usePlayerStore } from "../store/playerStore.js";

export default function SearchResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = (params.get("q") || "").trim().toLowerCase();

  const { selectedSong, setSelectedSong } = usePlayerStore();

  const results = useMemo(() => {
    if (!q) return [];
    return songData.filter(
      (s) =>
        (s.title || "").toLowerCase().includes(q) ||
        (s.artist || "").toLowerCase().includes(q)
    );
  }, [q]);

  function handleSongSelect(song) {
    setSelectedSong(song);
    navigate("/");
  }

  return (
    <MainLayout>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold mt-2">Search results for “{q}”</h2>
        <p className="text-sm text-[var(--text-secondary-color)]">
          {results.length} results
        </p>
      </div>

      <SongLists songs={results} open={true} onSongSelect={handleSongSelect} />
    </MainLayout>
  );
}
