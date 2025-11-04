import Card from "../ui/Card.jsx";

function SongLists({ songs, open, onClose, onSongSelect }) {
  if (!open) return null;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <div key={song.id} onClick={() => onSongSelect?.(song)}>
            <Card song={song} />
          </div>
        ))}
      </div>

      {/* Simple close control */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-3 py-1 rounded bg-[var(--primary-color)] text-white hover:opacity-90 transition-opacity"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default SongLists;
