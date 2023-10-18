const VideoCard = ({ videoInfo }) => {
  if (videoInfo === undefined) return null;
  const { snippet, statistics } = videoInfo;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="m-2 p-2 w-72 shadow-lg">
      <img src={thumbnails.medium.url} alt="video card" />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
