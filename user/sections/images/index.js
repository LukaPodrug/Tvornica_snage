import { View, Text } from 'react-native'
import { ImageGallery } from '@georstat/react-native-image-gallery'

import Button from '../../components/button'
import GalleryHeader from '../../components/gallery/header'

function ImagesSection({ images, isPhotoGalleryOpen, openPhotoGallery, closePhotoGallery, wrapperStyle, subtitleTextStyle, assetButtonWrapperStyle, assetButtonTextStyle, photoGalleryHeaderWrapperStyle, photoGalleryHeaderButtonWrapperStyle, photoGalleryHeaderButtonTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Text
                style={subtitleTextStyle}
            >
                photo gallery:
            </Text>
            <Button
                loading={false}
                showMessage={false}
                messageText={null}
                work={openPhotoGallery}
                buttonText='open'
                wrapperStyle={null}
                buttonWrapperStyle={assetButtonWrapperStyle}
                buttonTextStyle={assetButtonTextStyle}
                messageWrapperStyle={null}
                messageTextStyle={null}
            />
            <ImageGallery
                isOpen={isPhotoGalleryOpen}
                close={closePhotoGallery}
                images={images}
                thumbColor='#e04f5f'
                disableSwipe={true}
                renderHeaderComponent={() => <GalleryHeader work={closePhotoGallery}  wrapperStyle={photoGalleryHeaderWrapperStyle} buttonWrapperStyle={photoGalleryHeaderButtonWrapperStyle} buttonTextStyle={photoGalleryHeaderButtonTextStyle}/> }
            />
        </View>
    )
}

export default ImagesSection