import Partner from '../../components/partner'
import styles from './style.module.css'

function PartnersSection({ partners, partnerEdited, changePartnerEdited, partnerDeleted, changePartnerDeleted }) {
    return (
        <div
            className={styles.wrapper}
        >
        {
            partners.length === 0 ?
                <label
                    className={styles.message}
                >
                    no active partners
                </label>
                :
                partners.map((partner, index) => {
                    return (
                        <Partner
                            key={index}
                            id={partner.id}
                            name={partner.name}
                            link={partner.link}
                            partnerEdited={partnerEdited}
                            changePartnerEdited={changePartnerEdited}
                            partnerDeleted={partnerDeleted}
                            changePartnerDeleted={changePartnerDeleted}
                        />
                    )
                })
        }
        </div>
    )
}

export default PartnersSection