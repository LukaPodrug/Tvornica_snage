import { View, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import cameraIcon from '../../../assets/icons/camera.png'
import galleryIcon from '../../../assets/icons/gallery.png'

function InputImage({ image, changeImage, wrapperStyle, imageStyle, buttonStyle, buttonImageStyle, cameraButtonStyle, galleryButtonStyle }) {
    async function openCamera() {
        try {
            const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync()
            if(cameraPermissionResult.granted) {
                const cameraImage = await ImagePicker.launchCameraAsync({
                    base64: true,
                    quality: 1,
                })
                if(!cameraImage.canceled) {
                    changeImage(cameraImage.assets[0].base64)
                }
            }
        }
        catch(error) {
            return
        }
    }

    async function openGallery() {
        try {
            const galleryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if(galleryPermissionResult.granted) {
                const galleryImage = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [3, 3],
                    quality: 1,
                })
                if(!galleryImage.canceled) {
                    changeImage(galleryImage.assets[0].base64)
                }
            }
        }
        catch(error) {
            return
        }
    }

    return (
        <View
            style={wrapperStyle}
        >
            <Image
                style={imageStyle}
                source={{uri: image}}
            />
            <TouchableOpacity
                style={[buttonStyle, cameraButtonStyle]}
                onPress={() => openCamera()}
            >
                <Image
                    style={buttonImageStyle}
                    source={cameraIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[buttonStyle, galleryButtonStyle]}
                onPress={() => openGallery()}
            >
                <Image
                    style={buttonImageStyle}
                    source={galleryIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

export default InputImage