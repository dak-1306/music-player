import { create } from "zustand";
import songData from "../utils/songData";

export const usePlayerStore = create((set, get) => ({
  // =============================
  // STATE
  // =============================
  themesSelected: null,
  selectedSong: null,
  isPlaying: false,
  openSongList: false,

  // =============================
  // ACTIONS
  // =============================
  setTheme: (theme) =>
    set({
      themesSelected: theme,
      openSongList: true,
      selectedSong: null,
      isPlaying: false,
    }),

  setSelectedSong: (song) =>
    set({
      selectedSong: song,
      isPlaying: false,
    }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  closeSongList: () =>
    set({
      openSongList: false,
      themesSelected: null,
      selectedSong: null,
      isPlaying: false,
    }),

  // =============================
  // SONG NAVIGATION
  // =============================
  setCloseSongCard: () =>
    set({ selectedSong: null, isPlaying: false, openSongList: true }),
  nextSong: () => {
    const { selectedSong, themesSelected } = get();
    if (!selectedSong || !themesSelected) return;
    const filtered = songData.filter((s) => s.idThemes === themesSelected.id);
    const index = filtered.findIndex((s) => s.id === selectedSong.id);
    const next = filtered[index + 1];
    if (next) set({ selectedSong: next, isPlaying: false });
  },

  prevSong: () => {
    const { selectedSong, themesSelected } = get();
    if (!selectedSong || !themesSelected) return;
    const filtered = songData.filter((s) => s.idThemes === themesSelected.id);
    const index = filtered.findIndex((s) => s.id === selectedSong.id);
    const prev = filtered[index - 1];
    if (prev) set({ selectedSong: prev, isPlaying: false });
  },
}));
