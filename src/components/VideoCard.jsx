import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div>
      <video width="100%" controls>
        <source src={video.video_files[0].link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p style={{ textAlign: 'center' }}>{video.user.name}</p>
    </div>
  );
};

export default VideoCard;
