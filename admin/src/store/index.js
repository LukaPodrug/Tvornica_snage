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

const atoms = {
    loggedIn,
    token,
    ownData
}

export default atoms