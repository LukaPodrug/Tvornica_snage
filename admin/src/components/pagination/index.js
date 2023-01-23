import styles from './style.module.css'

import leftIcon from '../../assets/icons/left.png'
import rightIcon from '../../assets/icons/right.png'

function Pagination({ page, setPage, maxPage }) {
    function changePage(value) {
        if(page === 1 && value === -1) {
            return
        }
        if((page === maxPage || maxPage === 0) && value === 1) {
            return
        }
        setPage(page + value)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.arrow + ' ' + (page === 1 && styles.disabled)}
                onClick={() => changePage(-1)}
            >
                <img
                    src={leftIcon}
                    alt='left arrow'
                />
            </div>
            <label
                className={styles.page}
            >
                {page}
            </label>
            <div
                className={styles.arrow + ' ' + ((page === maxPage || maxPage === 0) && styles.disabled)}
                onClick={() => changePage(1)}
            >
                <img
                    src={rightIcon}
                    alt='right arrow'
                />
            </div>
        </div>
    )
}

export default Pagination