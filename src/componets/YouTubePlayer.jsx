import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    width: "100%",
    height: "500",
    playerVars: {
      modestbranding: 1,
      rel: 0,
      controls: 1,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 1,
    },
  };

  const onReady = (event) => {
    // You can auto-play if you want:
    // event.target.playVideo();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-black" 
    onClick={(e)=>console.log(e.target.value)}>
      {/* Aspect ratio container */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {/* YouTube iframe absolutely positioned */}
        <div className="absolute top-0 left-0 w-full h-full">
          <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
