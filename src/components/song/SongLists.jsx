import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

function SongLists({ songs, open, onClose }) {
  if (!open) return null;
  return (
    <div className="mt-6 mx-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <Card key={song.id} song={song} />
        ))}
      </div>
      {/* simple close control (can be replaced by modal close) */}
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="md" type="button" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
export default SongLists;
