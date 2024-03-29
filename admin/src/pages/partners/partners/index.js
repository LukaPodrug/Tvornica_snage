import PartnersSectionHeader from '../../../sections/partners/header'
import LoadingSection from '../../../sections/loading'
import PartnersSection from '../../../sections/partners'
import Pagination from '../../../components/pagination'
import styles from './style.module.css'

function PartnersPartnersPage({ partners, newPartnerAdded, changeNewPartnerAdded, partnerEdited, changePartnerEdited, partnerDeleted, changePartnerDeleted, partnersLoading, page, changePage, maxPage }) {
    return (
        <div
            className={styles.wrapper}
        >
            <PartnersSectionHeader
                title='all partners'
                newPartnerAdded={newPartnerAdded}
                changeNewPartnerAdded={changeNewPartnerAdded}
            />
            {
                partnersLoading ?
                    <LoadingSection/>
                    :
                    <PartnersSection
                        partners={partners}
                        partnerEdited={partnerEdited}
                        changePartnerEdited={changePartnerEdited}
                        partnerDeleted={partnerDeleted}
                        changePartnerDeleted={changePartnerDeleted}
                    />
            }
            <Pagination
                page={page}
                changePage={changePage}
                maxPage={maxPage}
                disabled={partnersLoading}
            />
        </div>
    )
}

export default PartnersPartnersPage