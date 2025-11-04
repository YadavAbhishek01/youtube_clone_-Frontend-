import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTubePlayer from "../componets/YouTubePlayer";
import { Searchcontext } from "../contextApi/SearchContext";

const Video = () => {
  const { setSearch } = useContext(Searchcontext);
  const { id } = useParams();

  // When opening video, stop search mode
  useEffect(() => {
    setSearch(false);
  }, [setSearch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <YouTubePlayer videoId={id} />
    </div>
  );
};

export default Video;
