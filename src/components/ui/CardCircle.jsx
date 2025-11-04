function CardCircle({ children }) {
  return (
    <div className="w-24 h-24 bg-[var(--bg-light-color)] rounded-full flex items-center justify-center shadow-lg shadow-color transition-transform duration-150 hover:scale-105 cursor-pointer hover:ring-2 hover:ring-[var(--primary-color)]">
      {children}
    </div>
  );
}
export default CardCircle;
