import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTubePlayer from "../componets/YouTubePlayer";
import { Searchcontext } from "../contextApi/SearchContext";

const Video = () => {
  const { setSearch } = useContext(Searchcontext);
  const { id } = useParams();

  useEffect(() => {
    setSearch(false);
  }, [setSearch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-2 sm:px-6 py-4">
      <div className="w-full max-w-5xl">
        <YouTubePlayer videoId={id} />
      </div>
    </div>
  );
};

export default Video;
