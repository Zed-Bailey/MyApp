import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from 'store/store';
import { Button, Navbar } from 'flowbite-react';
import { history } from 'helpers';

function DefaultNavBar() {
    return (
        <>
            <Navbar.Link href="#">
                <p>
                    Home
                </p>
            </Navbar.Link>
            <Navbar.Link href="#">
                About
            </Navbar.Link>
            <Navbar.Link href="#">
                Services
            </Navbar.Link>
            <Navbar.Link href="#">
                Pricing
            </Navbar.Link>
            <Navbar.Link href="#">
                Contact
            </Navbar.Link>
        </>
    );
}

function LoggedInNavBar(userRoles) {
    return (
        <>
            <Navbar.Link href="/home">Home</Navbar.Link>

            {
                // dynamically include different navlinks based on the users roles
                userRoles.includes("ADMIN") ? <Navbar.Link href="/admin">Admin</Navbar.Link>
                    : null
            }

        </>
    );
}



export function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    return (
        <Navbar
            fluid
            rounded
        >
            <Navbar.Brand href="/">
                <img
                    className="mr-3 h-6 sm:h-9"
                    src="/favicon.ico"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Programming proj
                </span>
            </Navbar.Brand>

            <div className="flex md:order-2">
                {
                    !authUser ? <div className="flex flex-row gap-2"><Button outline onClick={() => history.navigate('/signup')}>Sign up</Button> <Button onClick={() => history.navigate('/login')}>Login</Button> </div> : <Button onClick={logout} >Logout</Button>
                }

                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                {
                    // dynamically change the navbar content based on the logged in user status
                    !authUser ? DefaultNavBar() : LoggedInNavBar(authUser.roles)
                }
            </Navbar.Collapse>
        </Navbar>
    );
}