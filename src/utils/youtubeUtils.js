/**
 * Extract YouTube video ID từ bất kỳ format URL nào
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID hoặc null nếu không tìm thấy
 */
export function extractYouTubeId(url) {
  if (!url) return null;

  const patterns = [
    // https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // https://youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * Tạo clean YouTube URL từ video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Clean YouTube URL
 */
export function createYouTubeUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Tạo YouTube embed URL cho iframe
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options
 * @returns {string} - YouTube embed URL
 */
export function createYouTubeEmbedUrl(videoId, options = {}) {
  const {
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
    showinfo = 0,
  } = options;

  const params = new URLSearchParams({
    autoplay: autoplay.toString(),
    controls: controls.toString(),
    modestbranding: modestbranding.toString(),
    rel: rel.toString(),
    showinfo: showinfo.toString(),
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
