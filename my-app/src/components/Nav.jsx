import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from 'store/store';
import { history } from 'helpers';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
function DefaultNavBarItems() {
    return (
        <>
            <NavbarItem>
                <Link color="foreground" href="/">
                    Landing
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
            </NavbarItem>
        </>
    );
}

function LoggedInNavBar(userRoles) {
    return (
        <>
            <NavbarItem>
                <Link href="/home">
                    Home
                </Link>
            </NavbarItem>

            <NavbarItem>
                <Link href="#" aria-current="page">
                    Something else
                </Link>
            </NavbarItem>

            {
                // dynamically include different navlinks based on the users roles
                userRoles.includes("ADMIN") ?
                    <NavbarItem isActive>
                        <Link href="/admin" aria-current="page">
                            Admin
                        </Link>
                    </NavbarItem>
                    : null
            }



        </>
    );
}

function DefaultNavButtons() {
    return (
        <>
            <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href="/signup" variant="flat">
                    Sign Up
                </Button>
            </NavbarItem>
        </>
    );
}

function LoggedInNavButtons(authUser) {
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());


    return (
        <NavbarContent as="div" justify="end">

            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{authUser.username}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">Analytics</DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={logout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    );
}


export function Nav() {
    const authUser = useSelector(x => x.auth.user);

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <p className="font-bold text-inherit">Programming Project</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    !authUser ? <DefaultNavBarItems /> : LoggedInNavBar(authUser.roles)
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    !authUser ? <DefaultNavButtons /> : LoggedInNavButtons(authUser)
                }
            </NavbarContent>
        </Navbar>
    );
}
