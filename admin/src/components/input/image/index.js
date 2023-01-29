import { useRef, useEffect } from 'react'

import styles from './style.module.css'

function ImageInput({ isOpen, changeIsOpen, image, changeImage }) {
    const imageInputRef = useRef(null)

    useEffect(() => {
        if(isOpen) {
            imageInputRef.current.click()
        }
    }, [isOpen])

    function uploadImage(e) {
        if(e.target.value.length > 0){
            changeImage(e.target.files[0])
        } 
        else {
            changeImage(image)
        }
        changeIsOpen(false)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <input
                className={styles.input}
                type='file'
                accept='image/*'
                ref={imageInputRef}
                value={null}
                onChange={(e) => uploadImage(e)}
            />
        </div>
    )
}

export default ImageInput