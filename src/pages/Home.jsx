import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Searchcontext } from "../contextApi/SearchContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const { data, search, loading, setLoading ,setRandomevideo} = useContext(Searchcontext);

  const navigate = useNavigate();
  const location = useLocation();

  const decodeBase64 = (encoded) => {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return [];
    }
  };

  useEffect(() => {
    // ✅ Only fetch random videos if user is not searching
    if (!search && location.pathname === "/") {
      const getRandomVideos = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/random`
          );
          const decoded = decodeBase64(res.data.data);
          setDatas(decoded);
          setRandomevideo(decoded)
          
          
        } catch (err) {
          console.error("❌ Error fetching random videos:", err);
        } finally {
          setLoading(false);
        }
      };

      getRandomVideos();
    }
  }, [search, location.pathname, setLoading]);

  const displayedVideos = search ? data : datas;

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader size={50} color="#ef4444" />
          <p className="text-gray-500 mt-4 text-lg">Loading videos...</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {search ? "Search Results" : "Recommended Videos"}
          </h2>

          {displayedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedVideos.map((item) => (
                <div
                  key={item._id || item.videoId}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/video/${item.videoId}`)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
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
