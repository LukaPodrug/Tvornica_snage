import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar'

function SideMenu() {
    return (
        <Sidebar>
            <Menu>
                <MenuItem>Registration</MenuItem>
                <MenuItem>Login</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideMenu