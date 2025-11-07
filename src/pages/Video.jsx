import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import YouTubePlayer from "../componets/YouTubePlayer";
import { Searchcontext } from "../contextApi/SearchContext";
import axios from "axios";
import { toast } from "react-toastify";

const Video = () => {
  const { setSearch, data, randomevideo } = useContext(Searchcontext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playlistId = searchParams.get("playlistId");

  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  // 🔹 Disable search mode when watching a video
  useEffect(() => {
    setSearch(false);
  }, [setSearch]);

  // 🔹 Fetch playlist videos only when playlistId exists
  useEffect(() => {
    if (!playlistId) return; // 🛑 prevent 400 error if null

    const fetchPlaylist = async () => {
      try {
        console.log("🎥 Playlist ID being fetched:", playlistId);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/playlistItems?playlistId=${playlistId}`
        );

        if (res.data?.success) {
          setPlaylist(res.data.data || []);
        } else {
          console.warn("⚠️ Playlist fetch failed:", res.data?.message);
          setPlaylist([]);
        }
      } catch (err) {
        toast.error(err.message)
        console.error("❌ Error fetching playlist:", err.message);
        setPlaylist([]);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  // 🔹 Filter playlist by its ID (for safety)
  const filteredPlaylist = playlistId
    ? playlist.filter((video) => video.playlistId === playlistId)
    : playlist;

  // 🔹 Set the currently playing video
  useEffect(() => {
    if (playlist.length > 0 && id) {
      const found = playlist.find((v) => v.videoId === id);
      setCurrentVideo(found || null);
    }
  }, [playlist, id]);

  // 🔹 Combine search + random videos for recommended section
  useEffect(() => {
    const combined = [];

    if (Array.isArray(data)) {
      combined.push(...data.filter((v) => v.videoId !== id));
    }

    if (Array.isArray(randomevideo)) {
      const uniqueRandoms = randomevideo.filter(
        (v) => v.videoId !== id && !combined.some((x) => x.videoId === v.videoId)
      );
      combined.push(...uniqueRandoms);
    }

    setRelatedVideos(combined);
  }, [data, randomevideo, id]);

  // 🔹 Hide YouTube overlay elements
  useEffect(() => {
    const hideIcons = () => {
      const icons = document.querySelectorAll(`
        .ytp-pause-overlay,
        .ytp-scroll-min,
        .ytp-impression-link,
        .ytp-related-title,
        .ytp-button,
        .ytp-more-videos-view
      `);
      icons.forEach((el) => (el.style.display = "none"));
    };

    hideIcons();
    const interval = setInterval(hideIcons, 2000);
    const timeout = setTimeout(() => clearInterval(interval), 20000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // 🔹 Scroll to top when switching videos
useEffect(() => {

    window.scrollTo({ top: 0, behavior: "smooth" });

}, [id]);

useEffect(() => {
  const fetchRecommended = async () => {
    try {
      if (!data?.length || !randomevideo?.length) {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/random`);
        const randomVideos = res.data?.data || [];
        setRelatedVideos(randomVideos.filter(v => v.videoId !== id));
      } else {
        // combine context data as before
        const combined = [];
        if (Array.isArray(data)) {
          combined.push(...data.filter((v) => v.videoId !== id));
        }
        if (Array.isArray(randomevideo)) {
          const uniqueRandoms = randomevideo.filter(
            (v) => v.videoId !== id && !combined.some((x) => x.videoId === v.videoId)
          );
          combined.push(...uniqueRandoms);
        }
        setRelatedVideos(combined);
      }
    } catch (err) {
      console.error("Failed to load recommended videos", err);
      setRelatedVideos([]);
    }
  };

  fetchRecommended();
}, [id]);

  // 🔹 Auto-play next video in the playlist
  const handleVideoEnd = () => {
    if (filteredPlaylist.length > 0) {
      const currentIndex = filteredPlaylist.findIndex((v) => v.videoId === id);
      if (currentIndex >= 0 && currentIndex < filteredPlaylist.length - 1) {
        const nextVideo = filteredPlaylist[currentIndex + 1];
        navigate(`/video/${nextVideo.videoId}?playlistId=${nextVideo.playlistId}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section — Video Player + Recommendations */}
        <div className="flex-1">
          {/* YouTube Player */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-black mb-5">
            <YouTubePlayer videoId={id} onEnd={handleVideoEnd} />
          </div>

          {/* Video Info */}
          {currentVideo && (
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentVideo.title}
              </h1>
              <p className="text-gray-600 mt-2">{currentVideo.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                📺 {currentVideo.channelTitle}
              </p>
            </div>
          )}

          {/* Recommended Videos */}
          {relatedVideos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Other Recommended Videos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {relatedVideos.map((item) => (
                  <div
                    key={item._id || item.videoId}
                    onClick={() => {
                      if (playlistId) {
                        navigate(`/video/${item.videoId}?playlistId=${item.playlistId}`);
                      } else {
                        navigate(`/video/${item.videoId}`);
                      }
                    }}
                    className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
                  >
                   <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full aspect-video object-cover rounded-xl hover:rounded-none transition-all duration-300 hover:scale-105"
                    />
                    {item.duration && (
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-0.5 rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.channelTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Section — Playlist Sidebar */}
        {filteredPlaylist.length > 0 && (
          <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-4 h-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">📜 Playlist</h2>
            <div className="flex flex-col gap-3 max-h-full overflow-y-auto">
              {filteredPlaylist.map((video, index) => (
                <div
                  key={video.videoId}
                  onClick={() =>
                    navigate(`/video/${video.videoId}?playlistId=${video.playlistId}`)
                  }
                  className={`flex gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
                    video.videoId === id ? "bg-blue-50 border border-blue-400" : ""
                  }`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                      {index + 1}. {video.title}
                    </h3>
                    <p className="text-xs text-gray-500">{video.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
