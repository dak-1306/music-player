import { motion } from "framer-motion";

function Card({ song, className = "", ...rest }) {
  const { title, cover, artist } = song;

  return (
    <motion.div
      // entrance
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      // interaction
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 12px 30px var(--shadow-color)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      layout
      className={`w-2/3 mx-auto flex flex-col items-center bg-white rounded-lg shadow-md shadow-color cursor-pointer p-4 ${className}`}
      {...rest}
    >
      <img
        src={cover}
        alt={title}
        className="w-full rounded-md mb-2 object-cover"
        loading="lazy"
      />
      <h3 className="text-2xl font-semibold text-[var(--primary-color)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--secondary-color)]">{artist}</p>
    </motion.div>
  );
}
export default Card;
