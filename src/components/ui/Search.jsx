import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Search() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-between space-x-2 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            navigate(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
        type="text"
        placeholder="Enter song title or artist"
        className="bg-[var(--bg-light-color)] border border-[var(--bg-light-color)] text-[var(--text-dark-color)] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      />
      <Button
        variant="primary"
        size="md"
        type="button"
        ariaLabel="Search"
        onClick={() => navigate(`/search?q=${encodeURIComponent(q.trim())}`)}
      >
        <MagnifyingGlassIcon className="h-5 w-5 inline-block" />
      </Button>
    </div>
  );
}
export default Search;
