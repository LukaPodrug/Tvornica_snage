import { useState } from 'react'

import PromotionsSectionHeader from '../../../sections/promotions/header'
import LoadingSection from '../../../sections/loading'
import PromotionsSection from '../../../sections/promotions'
import Pagination from '../../../components/pagination'
import styles from './style.module.css'

function PromotionsPartnersPage({ promotions, partnersData, newPromotionAdded, changeNewPromotionAdded, promotionEdited, changePromotionEdited, promotionDeleted, changePromotionDeleted, promotionsLoading, maxPage }) {
    const [page, setPage] = useState(1)

    return (
        <div
            className={styles.wrapper}
        >
            <PromotionsSectionHeader
                title='all promotions'
                partnersData={partnersData}
                newPromotionAdded={newPromotionAdded}
                changeNewPromotionAdded={changeNewPromotionAdded}
            />
            {
                promotionsLoading ?
                    <LoadingSection/>
                    :
                    <PromotionsSection
                        partnersData={partnersData}
                        promotions={promotions}
                        promotionEdited={promotionEdited}
                        changePromotionEdited={changePromotionEdited}
                        promotionDeleted={promotionDeleted}
                        changePromotionDeleted={changePromotionDeleted}
                    />
            }
            <Pagination
                page={page}
                changePage={setPage}
                maxPage={maxPage}
                disabled={promotionsLoading}
            />
        </div>
    )
}

export default PromotionsPartnersPage