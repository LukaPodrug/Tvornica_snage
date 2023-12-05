import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import store from '../../store'
import LoadingSection from '../../sections/loading'
import ProgramsSectionHeader from '../../sections/programs/header'
import ProgramsSection from '../../sections/programs'
import Pagination from '../../components/pagination'
import styles from './style.module.css'
import { getProgramsDataAPI } from '../../API/program'

function ProgramsPage() {
    const [token] = useRecoilState(store.token)
    const [programsData, setProgramsData] = useRecoilState(store.programsData)

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(Math.ceil(programsData.length / 5))
    const [newProgramAdded, setNewProgramAdded] = useState(false)
    const [programEdited, setProgramEdited] = useState(false)

    const [programsLoading, setProgramsLoading] = useState(false)

    useEffect(() => {
        async function getProgramsData() {
            try {
                const getProgramsDataResponse = await getProgramsDataAPI(token)
                setProgramsData(getProgramsDataResponse.data)
                setMaxPage(Math.ceil(getProgramsDataResponse.data.length / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setProgramsLoading(true)
            await getProgramsData()
            setProgramsLoading(false)
        }

        fetchAPI()
    }, [newProgramAdded, programEdited])

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.window}
            >
                <ProgramsSectionHeader
                    title='all programs'
                    newProgramAdded={newProgramAdded}
                    changeNewProgramAdded={setNewProgramAdded}
                    disabled={programsLoading}
                />
                {
                    programsLoading ? 
                        <LoadingSection/>
                        :
                        <ProgramsSection
                            programs={programsData.slice((page - 1) * 5, (page - 1) * 5 + 5)}
                            programEdited={programEdited}
                            changeProgramEdited={setProgramEdited}
                        />
                }
                <Pagination
                    page={page}
                    changePage={setPage}
                    maxPage={maxPage}
                    disabled={programsLoading}
                />
            </div>
        </div>
    )
}

export default ProgramsPage