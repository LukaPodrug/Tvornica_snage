import { useRef, useEffect } from 'react'

import styles from './style.module.css'

function ImageInput({ isOpen, changeIsOpen, image, changeImage }) {
    const imageInputRef = useRef(null)

    useEffect(() => {
        if(isOpen) {
            imageInputRef.current.click()
            const interval = setInterval(() => {
                if(imageInputRef.current.value === '') {
                    changeIsOpen(false)
                    clearInterval(interval)
                }
            }, 500)
        }
    }, [isOpen])

    function uploadImage(e) {
        if(e.target.value.length > 0) {
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
                value={null}
                accept='image/*'
                ref={imageInputRef}
                onChange={(e) => uploadImage(e)}
            />
        </div>
    )
}

export default ImageInput