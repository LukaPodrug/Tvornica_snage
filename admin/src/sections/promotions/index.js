import Promotion from '../../components/promotion'
import styles from './style.module.css'

function PromotionsSection({ partnersData, promotions, promotionEdited, changePromotionEdited, promotionDeleted, changePromotionDeleted }) {
    return (
        <div
            className={styles.wrapper}
        >
        {
            promotions.length === 0 ?
                <label
                    className={styles.message}
                >
                    no active promotions
                </label>
                :
                promotions.map((promotion, index) => {
                    return (
                        <Promotion
                            key={index}
                            id={promotion.id}
                            partnersData={partnersData}
                            partnerId={promotion.partnerId}
                            partnerName={promotion.partnerName}
                            code={promotion.code}
                            description={promotion.description}
                            promotionEdited={promotionEdited}
                            changePromotionEdited={changePromotionEdited}
                            promotionDeleted={promotionDeleted}
                            changePromotionDeleted={changePromotionDeleted}
                        />
                    )
                })
        }
        </div>
    )
}

export default PromotionsSection