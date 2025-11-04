import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Searchcontext } from "../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const { data, search, loading } = useContext(Searchcontext);
  const navigate=useNavigate();
  // Fetch default home videos on mount
  useEffect(() => {
    const getDefaultData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/search`);
        setDatas(res.data);
      } catch (err) {
        console.error("Error fetching default videos:", err);
      }
    };
    getDefaultData(); 
  }, []);
    
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {search ? "Search Results" : "Recommended Videos"}
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {search ? (
            data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item._id || item.videoId}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden"
                 onClick={()=>navigate(`/video/${item.videoId}`)}  >
                
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
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">
                No search results found.
              </p>
            )
          ) : datas.length > 0 ? (
            datas.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden"
               onClick={()=>navigate(`/video/${item.videoId}`)}  >
               
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
            ))
          ) : (
            <p className="text-gray-500">No videos found.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
