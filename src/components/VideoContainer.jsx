import { useState, useEffect } from "react";
import { YT_VIDEOS_API_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YT_VIDEOS_API_URL);
    const json = await data.json();
    console.log("### fetch videos json: ", json);
    setVideos(json.items);
  };

  return (
    <div className="flex flex-wrap justify-evenly">
      {videos.map((video) => (
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
