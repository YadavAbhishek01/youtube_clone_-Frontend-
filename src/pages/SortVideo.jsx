import React, { useContext, useEffect, useState } from "react";
import { Searchcontext } from "../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const SortVideo = () => {
  const { data, loading, query} = useContext(Searchcontext);
  const navigate = useNavigate();
  const [sortBy,setSortBy]=useState("")


//   useEffect(()=>{
//             const getsortvideo=async ()=>{
//                 const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sortvideo?q=${query}&sort=${sortBy}`)
//                 console.log(res.data.data)
//             }
//             getsortvideo()
//   },[])
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      {/* ✅ Header like YouTube Sort section */}
      <div className="flex justify-between items-center mb-5 border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sorted Videos
        </h2>

        {/* Sort dropdown */}
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
            <option value="default">Default</option>
            <option value="date">Newest</option>
            <option value="viewCount">Most Viewed</option>
            <option value="rating">Top Rated</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* ✅ Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader size={50} color="#ef4444" />
          <p className="text-gray-500 mt-4 text-lg">Loading sorted videos...</p>
        </div>
      ) : (
        <>
          {/* ✅ YouTube-style video list (horizontal style) */}
          {data.length > 0 ? (
            <div className="flex flex-col gap-6">
              {data.map((item) => (
                <div
                  key={item._id || item.videoId}
                  onClick={() => navigate(`/video/${item.videoId}`)}
                  className="flex gap-4 items-start cursor-pointer group hover:bg-gray-50 p-2 rounded-xl transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-64 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full rounded-xl aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.duration && (
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-medium px-2 py-0.5 rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Video details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.channelTitle}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.viewCount
                          ? `${item.viewCount} views • `
                          : ""}{" "}
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString()
                          : ""}
                      </p>
                    </div>

                    {item.description && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No sorted videos found.
            </p>
          )}
        </>
      )}
    </main>
  );
};

export default SortVideo;
