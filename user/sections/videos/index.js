import { View, Text } from 'react-native'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import Modal from 'react-native-modal'

import Button from '../../components/button'
import GalleryHeader from '../../components/gallery/header'

function VideosSection({ videos, openVideo, closeVideo, isVideoOpen, videoURL, wrapperStyle, subtitleTextStyle, assetButtonWrapperStyle, assetButtonTextStyle, videoGalleryHeaderWrapperStyle, videoGalleryHeaderButtonWrapperStyle, videoGalleryHeaderButtonTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Text
                style={subtitleTextStyle}
            >
                video gallery: 
            </Text>
            {
                videos.map((video, index) => {
                    return (
                        <Button
                            key={index}
                            loading={false}
                            showMessage={false}
                            messageText={null}
                            work={() => openVideo(video.url)}
                            buttonText={video.title}
                            wrapperStyle={null}
                            buttonWrapperStyle={assetButtonWrapperStyle}
                            buttonTextStyle={assetButtonTextStyle}
                            messageWrapperStyle={null}
                            messageTextStyle={null}
                        />
                    )
                })
            }
            <Modal
                isVisible={isVideoOpen}
                backdropOpacity={1}
            >
                <VideoPlayer
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.CONTAIN,
                        source: {
                            uri: videoURL
                        }
                    }}
                    header={ <GalleryHeader work={closeVideo}  wrapperStyle={videoGalleryHeaderWrapperStyle} buttonWrapperStyle={videoGalleryHeaderButtonWrapperStyle} buttonTextStyle={videoGalleryHeaderButtonTextStyle}/> }
                />
            </Modal>
        </View>
    )
}

export default VideosSection