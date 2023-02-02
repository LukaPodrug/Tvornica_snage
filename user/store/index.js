import { atom } from 'recoil'

const loggedIn = atom({
    key: 'loggedIn',
    default: false
})

const token = atom({
    key: 'token',
    default: null
})


const atoms = {
    loggedIn,
    token
}

export default atoms