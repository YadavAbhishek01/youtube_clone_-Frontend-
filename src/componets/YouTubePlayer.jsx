import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      modestbranding: 1,
      rel: 0,
      controls: 1,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 1,
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl bg-black">
      {/* Responsive container maintaining 16:9 ratio */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <div className="absolute top-0 left-0 w-full h-full">
          <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
