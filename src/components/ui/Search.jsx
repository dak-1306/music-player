import Button from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
function Search() {
  return (
    <div className="flex justify-between space-x-2 items-center">
      <input
        type="text"
        placeholder="Enter song title or artist"
        className="bg-[var(--bg-light-color)] border border-[var(--bg-light-color)] text-[var(--text-dark-color)] p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      />
      <Button variant="primary" size="md" type="submit" ariaLabel="Search">
        <MagnifyingGlassIcon className="h-5 w-5 inline-block" />
      </Button>
    </div>
  );
}
export default Search;
