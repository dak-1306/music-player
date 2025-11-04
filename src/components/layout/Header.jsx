import { Link } from "react-router-dom";
import Search from "../ui/Search.jsx";
import Tooltip from "../ui/Tooltip.jsx";
import { MusicalNoteIcon, HomeIcon } from "@heroicons/react/24/solid";
function Header() {
  return (
    <header className="bg-header p-4 flex justify-between items-center ">
      <div className="flex items-center">
        <MusicalNoteIcon className="h-8 w-8 text-[var(--text-light-color)] inline-block mr-2" />
        <h1 className="text-4xl font-bold text-[var(--text-light-color)]">
          Music Player
        </h1>
      </div>
      <Search />
      <nav>
        <Tooltip content="Home" placement="bottom">
          <Link
            to="/"
            className="text-[var(--green-dark-color)] hover:text-[var(--text-secondary-color)] text-lg font-medium"
          >
            <HomeIcon className="h-6 w-6 inline-block mr-1" />
          </Link>
        </Tooltip>
        <Link
          to="/about"
          className="ml-4 text-[var(--green-dark-color)] hover:text-[var(--text-secondary-color)] text-lg font-medium"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
export default Header;
