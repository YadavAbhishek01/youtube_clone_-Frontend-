import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Searchcontext } from "../contextApi/SearchContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const { data, search, loading, setLoading, setRandomevideo, setSearch } = useContext(Searchcontext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Home.jsx mounted, fetching random videos...");
    setSearch(false); // ensure search mode is off

    const fetchRandomVideos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/random`);
        console.log("API response:", res.data);

        if (res.data?.success && Array.isArray(res.data.data)) {
          setDatas(res.data.data);
          setRandomevideo(res.data.data);
        } else {
          console.warn("Unexpected API response structure:", res.data);
          setDatas([]);
        }
      } catch (err) {
        console.error("Error fetching random videos:", err.message);
        toast.error("Failed to load videos: " + err.message);
        setDatas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomVideos();
  }, [setLoading, setRandomevideo, setSearch]);

  const displayedVideos = search ? data : datas;

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader size={50} color="#ef4444" />
          <p className="text-gray-500 mt-4 text-lg">Loading videos...</p>
        </div>
      ) : displayedVideos.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {search ? "Search Results" : "Recommended Videos"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedVideos.map((item) => (
              <div
                key={item._id || item.videoId || item.id}
                onClick={() => {
                  const videoId = item.videoId || item.id;
                  const playlistId = item.playlistId || null;
                  navigate(
                    playlistId
                      ? `/video/${videoId}?playlistId=${playlistId}`
                      : `/video/${videoId}`
                  );
                }}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={item.thumbnail || "https://via.placeholder.com/400x225"}
                    alt={item.title || "No Title"}
                    className="w-full aspect-video object-cover rounded-xl hover:rounded-none transition-all duration-300 hover:scale-105"
                  />
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-0.5 rounded">
                      {item.duration}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {item.title || "No Title"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.channelTitle || item.channel_name || "Unknown Channel"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">No videos found.</p>
      )}
    </main>
  );
};

export default Home;
