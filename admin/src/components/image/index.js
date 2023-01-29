import { useState } from 'react'

import ImageInput from '../input/image'
import styles from './style.module.css'

import cameraIcon from '../../assets/icons/camera.png'

function Image({ image, showUpload, upload, style }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.image + ' ' + style}
            >
                <img
                    src={image}
                />
            </div>
            {
                showUpload &&
                <>
                    <div 
                        className={styles.icon}
                        onClick={() => setIsOpen(true)}
                    >
                        <img 
                            src={cameraIcon}
                        />
                    </div>
                    <ImageInput
                        isOpen={isOpen}
                        changeIsOpen={setIsOpen}
                        image={image}
                        changeImage={upload}
                    />
                </>
            }
        </div>
    )
}

export default Image