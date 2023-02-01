import { atom } from 'recoil'

const loggedIn = atom({
    key: 'loggedIn',
    default: false
})

const atoms = {
    loggedIn
}

export default atoms