import { atom } from 'recoil'

const loggedIn = atom({
    key: 'loggedIn',
    default: false
})

const token = atom({
    key: 'token',
    default: null
})

const ownData = atom({
    key: 'ownData',
    default: null
})

const allCoachesData = atom({
    key: 'allCoachesData',
    default: null
})

const programsData = atom({
    key: 'programsData',
    default: null
})

const atoms = {
    loggedIn,
    token,
    ownData,
    allCoachesData,
    programsData
}

export default atoms