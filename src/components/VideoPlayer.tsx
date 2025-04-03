import React, {useRef} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';

interface Props {
  videoPath: string | undefined;
  backgroundVideo: any;
  paused: boolean;
}

const VideoPlayer: React.FC<Props> = ({videoPath, backgroundVideo, paused}) => {
  const videoRef = useRef(null);

  return (
    <View>
      <Video
        source={{uri: videoPath}}
        ref={videoRef}
        style={backgroundVideo}
        paused={paused}
      />
    </View>
  );
};

export default VideoPlayer;
