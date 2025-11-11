import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Searchcontext } from "../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
const Home = () => {
  const [datas, setDatas] = useState([]);
    const secretKey = import.meta.env.VITE_SECRET_KEY;
  const {
    data,
    search,
    loading,
    setRandomevideo,
    pagetype,
    setPagetype,
    query,
    sortBy,
    setSortBy,
  } = useContext(Searchcontext);
  const navigate = useNavigate();

  // ✅ Fetch random videos when not searching & not in sort mode
  useEffect(() => {
    if (!search && pagetype === "home") {
      const getRandomVideos = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/random`
          );

          const bytes=CryptoJS.AES.decrypt(res.data.data,secretKey);
          const descrypt=JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
         if (res.data?.success && Array.isArray(descrypt)) {
  setDatas(descrypt);
  setRandomevideo(descrypt);
} else {
  setDatas([]);
}

        } catch (err) {
          console.error("❌ Error fetching random videos:", err.message);
          toast.error(err.message);
          setDatas([]);
        }
      };

      getRandomVideos();
    }
  }, [search, pagetype, setRandomevideo]);

  // ✅ Decide what to show
  const displayedVideos =
    pagetype === "sort" ? data : search ? data : datas;

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader size={50} color="#ef4444" />
          <p className="text-gray-500 mt-4 text-lg">Loading videos...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              {pagetype === "sort"
                ? "Sorted Videos"
                : search
                ? "Search Results"
                : "Recommended Videos"}
            </h2>

            {/* ✅ Show sort options only when Sort page is selected */}
            {pagetype === "sort" && (
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="relevance">Default</option>
                  <option value="date">Newest</option>
                  <option value="viewCount">Most Viewed</option>
                  <option value="rating">Top Rated</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            )}
          </div>

          {displayedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedVideos.map((item) => (
                <div
                  key={item._id || item.videoId}
                  onClick={() => {
                    if (item.playlistId) {
                      navigate(`/video/${item.videoId}?playlistId=${item.playlistId}`);
                    } else {
                      navigate(`/video/${item.videoId}`);
                    }
                  }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full aspect-video object-cover rounded-xl hover:scale-105 transition-all duration-300"
                    />
                    {item.duration && (
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-0.5 rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No videos found.</p>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
