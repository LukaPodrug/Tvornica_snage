import { atom } from 'recoil'

const loggedInLoading = atom({
    key: 'loggedInLoading',
    default: true
})

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

const atoms = {
    loggedInLoading,
    loggedIn,
    token,
    ownData,
    allCoachesData
}

export default atoms