import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTubePlayer from "../componets/YouTubePlayer";
import { Searchcontext } from "../contextApi/SearchContext";

const Video = () => {
  const { setSearch, data, randomevideo } = useContext(Searchcontext);
  const { id } = useParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const navigate = useNavigate();

  // Disable search mode when on video page
  useEffect(() => {
    setSearch(false);
  }, [setSearch]);

useEffect(() => {
  const hideIcons = () => {
    const icons = document.querySelectorAll(".ytp-impression-link, .ytp-more-videos-view ytp-scroll-min,ytp-pause-overlay,ytp-related-title,ytp-button ytp-expand");
    icons.forEach((el) => {
      el.style.display = "none";
    });
  };

  // Run immediately and then every 1 second for a few times
  hideIcons();
  const interval = setInterval(hideIcons, 1000);

  // Stop after 10 seconds (to avoid memory leaks)
  const timeout = setTimeout(() => clearInterval(interval), 10000);

  return () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };
}, [id]);


  // Scroll to top when new video loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  // Combine search data + random video data to build recommendations
  useEffect(() => {
    let combined = [];

    if (Array.isArray(data) && data.length > 0) {
      const filtered = data.filter((item) => item.videoId !== id);
      combined = [...filtered];
    }

    if (Array.isArray(randomevideo) && randomevideo.length > 0) {
      const randomFiltered = randomevideo.filter(
        (item) => item.videoId !== id
      );
      combined = [...combined, ...randomFiltered];
    }

    setRelatedVideos(combined);
  }, [data, randomevideo, id,]);

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-8 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Main video player */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8 bg-black">
          <YouTubePlayer videoId={id} />
        </div>

        {/* Other videos section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Other Recommended Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedVideos.map((item) => (
            <div
              key={item._id || item.videoId}
              onClick={() => {
                navigate(`/video/${item.videoId}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl 
                         transition-transform duration-300 hover:-translate-y-1 
                         overflow-hidden group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{item.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
