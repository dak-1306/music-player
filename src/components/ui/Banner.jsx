function Banner() {
  return (
    <div className="bg-banner p-8 text-center w-1/3 mx-auto rounded-lg mb-6 shadow-lg shadow-color">
      <h2 className="text-3xl font-bold text-[var(--text-light-color)]">
        Welcome to the{" "}
        <span className="text-[var(--text-title-color)]">Music Player</span>
      </h2>
      <p className="mt-4 text-[var(--green-dark-color)] font-medium">
        Enjoy your favorite tunes with our seamless music experience.
      </p>
    </div>
  );
}
export default Banner;
