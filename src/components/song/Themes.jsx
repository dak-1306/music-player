import CardCircle from "../ui/CardCircle.jsx";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function Themes() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-[var(--text-title-color)] text-xl">
        Select a theme for the music player:
      </p>
      <div className="grid grid-cols-4 gap-6">
        <CardCircle>
          <SunIcon className="h-12 w-12 text-yellow-500" />
        </CardCircle>
        <CardCircle>
          <MoonIcon className="h-12 w-12 text-blue-500" />
        </CardCircle>
      </div>
    </div>
  );
}

export default Themes;
