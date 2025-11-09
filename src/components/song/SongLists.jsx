import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

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
      {onClose && (
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </div>
      )}
    </div>
  );
}

export default SongLists;
