import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../store'
import Header from '../../components/header'
import Menu from '../../components/menu'
import PartnersPartnersPage from './partners'
import PromotionsPartnersPage from './promotions'
import { getPartnersDataAPI } from '../../API/partner'
import { getPromotionsDataAPI } from '../../API/promotion'
import styles from './style.module.css'

function PartnersPage() {
    const tabs = ['partners', 'promotions']

    const [token] = useRecoilState(store.token)

    const [partners, setPartners] = useState([])
    const [promotions, setPromotions] = useState([])

    const [partnersPage, setPartnersPage] = useState(1)
    const [partnersMaxPage, setPartnersMaxPage] = useState(1)
    const [promotionsPage, setPromotionsPage] = useState(1)
    const [promotionsMaxPage, setPromotionsMaxPage] = useState(1)
    const [activeTab, setActiveTab] = useState(0)

    const [newPartnerAdded, setNewPartnerAdded] = useState(false)
    const [partnerEdited, setPartnerEdited] = useState(false)
    const [partnerDeleted, setPartnerDeleted] = useState(false)
    const [partnersLoading, setPartnersLoading] = useState(true)
    const [newPromotionAdded, setNewPromotionAdded] = useState(false)
    const [promotionEdited, setPromotionEdited] = useState(false)
    const [promotionDeleted, setPromotionDeleted] = useState(false)
    const [promotionsLoading, setPromotionsLoading] = useState(true)

    useEffect(() => {
        async function getPartnersData() {
            try {
                const getPartnersDataResponse = await getPartnersDataAPI(token)
                setPartners(getPartnersDataResponse.data)
                setPartnersMaxPage(Math.ceil(getPartnersDataResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setPartnersLoading(true)
            await getPartnersData()
            setPartnersLoading(false)
        }

        fetchAPI()
    }, [newPartnerAdded, partnerEdited])

    useEffect(() => {
        async function getPartnersData() {
            try {
                const getPartnersDataResponse = await getPartnersDataAPI(token)
                if(getPartnersDataResponse.data.length % 6 === 0 && getPartnersDataResponse.data.length > 0 && partnersPage !== 1) {
                    setPartnersPage(partnersPage - 1)
                }
                setPartners(getPartnersDataResponse.data)
                setPartnersMaxPage(Math.ceil(getPartnersDataResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setPartnersLoading(true)
            await getPartnersData()
            setPartnersLoading(false)
        }

        fetchAPI()
    }, [partnerDeleted])

    useEffect(() => {
        async function getPromotionsData() {
            try {
                const getPromotionsDataResponse = await getPromotionsDataAPI(token)
                getPromotionsDataResponse.data.forEach(promotion => {
                    partners.forEach(partner => {
                        if(promotion.partnerId === partner.id) {
                            promotion.partnerName = partner.name
                        }
                    })
                })
                setPromotions(getPromotionsDataResponse.data)
                setPromotionsMaxPage(Math.ceil(getPromotionsDataResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setPromotionsLoading(true)
            await getPromotionsData()
            setPromotionsLoading(false)
        }

        if(partners) {
            fetchAPI()
        }
    }, [newPromotionAdded, promotionEdited, partners])

    useEffect(() => {
        async function getPromotionsData() {
            try {
                const getPromotionsDataResponse = await getPromotionsDataAPI(token)
                getPromotionsDataResponse.data.forEach(promotion => {
                    partners.forEach(partner => {
                        if(promotion.partnerId === partner.id) {
                            promotion.partnerName = partner.name
                        }
                    })
                })
                if(getPromotionsDataResponse.data.length % 6 === 0 && getPromotionsDataResponse.data.length > 0 && promotionsPage !== 1) {
                    setPromotionsPage(promotionsPage - 1)
                }
                setPromotions(getPromotionsDataResponse.data)
                setPromotionsMaxPage(Math.ceil(getPromotionsDataResponse.data.length / 6))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setPromotionsLoading(true)
            await getPromotionsData()
            setPromotionsLoading(false)
        }

        if(partners) {
            fetchAPI()
        }
    }, [promotionDeleted])

    return (
        <div
            className={styles.wrapper}
        >
            <div 
                className={styles.window}
            >
                <Header
                    title='partners'
                    style={styles.title}
                />
                <Menu
                    tabs={tabs}
                    activeTab={activeTab}
                    changeActiveTab={setActiveTab}
                    style={styles.menu}
                />
                {
                    activeTab === 0 &&
                        <PartnersPartnersPage
                            partners={partners.slice((partnersPage - 1) * 6, (partnersPage - 1) * 6 + 6)}
                            newPartnerAdded={newPartnerAdded}
                            changeNewPartnerAdded={setNewPartnerAdded}
                            partnerEdited={partnerEdited}
                            changePartnerEdited={setPartnerEdited}
                            partnerDeleted={partnerDeleted}
                            changePartnerDeleted={setPartnerDeleted}
                            partnersLoading={partnersLoading}
                            page={partnersPage}
                            changePage={setPartnersPage}
                            maxPage={partnersMaxPage}
                        />
                }
                {
                    activeTab === 1 &&
                        <PromotionsPartnersPage
                            promotions={promotions.slice((promotionsPage - 1) * 6, (promotionsPage - 1) * 6 + 6)}
                            partnersData={partners}
                            newPromotionAdded={newPromotionAdded}
                            changeNewPromotionAdded={setNewPromotionAdded}
                            promotionEdited={promotionEdited}
                            changePromotionEdited={setPromotionEdited}
                            promotionDeleted={promotionDeleted}
                            changePromotionDeleted={setPromotionDeleted}
                            promotionsLoading={promotionsLoading}
                            page={promotionsPage}
                            changePage={setPromotionsPage}
                            maxPage={promotionsMaxPage}
                        />
                }
            </div>
        </div>
    )
}

export default PartnersPage