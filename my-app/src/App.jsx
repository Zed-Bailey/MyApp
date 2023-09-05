import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { history } from 'helpers';
import { Nav, PrivateRoute } from 'components';
import { Home } from 'pages/home/Home';
import { Login } from 'pages/login/Login';
import { Admin } from 'pages/admin/Admin';
import { Landing } from 'pages/landing/Landing';
import { Unauthorized } from 'pages/unauthorized/UnAuthorized';
import { Signup } from 'pages/signup/Signup';
import { Box, MantineProvider } from '@mantine/core';
import {
    IconShoppingCart,
    IconLicense,
    IconMessage2,
    IconBellRinging,
    IconMessages,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconUsers,
    IconDatabaseImport,
    IconReceipt2,
    IconLogout,
    IconGift,
    IconPlus,
    IconSearch,
} from '@tabler/icons-react';
import { AppShell, Navbar, Header, Text, SegmentedControl } from '@mantine/core';

import { createStyles, Container, Group, Burger, rem, getStylesRef } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Customers from 'pages/admin/Customers';
import Products from 'pages/admin/Products';

export function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div>
            <MantineProvider withGlobalStyles withNormalizeCSS >
                <Application />
            </MantineProvider>

        </div>
    );
}


const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    tabLink: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    footer: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingTop: theme.spacing.md,
    },
}));


function Application() {
    const [opened, { toggle }] = useDisclosure(false);
    const links = [
        { link: "/", label: "Landing" },
        { link: "/login", label: "Login" },
        { link: "/signup", label: "Sign Up" },
    ]
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const [section, setSection] = useState('admin');
    const [activeTabLink, setTabLinkActive] = useState('Billing');


    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                history.navigate(link.link)
            }}
        >
            {link.label}
        </a>
    ));

    const tabs = {
        account: [
            { link: '', label: 'Products', icon: IconGift },
            { link: '', label: 'Notifications', icon: IconBellRinging },
            { link: '', label: 'Add Product', icon: IconPlus },
            { link: '', label: 'Search Products', icon: IconSearch },
        ],
        admin: [
            { link: '/admin/customers', label: 'Customers', icon: IconUsers },
            { link: '/admin/products', label: 'Products', icon: IconGift },
        ],
    };

    const tabLinks = tabs[section].map((item) => (
        <a
            className={cx(classes.tabLink, { [classes.linkActive]: item.label === activeTabLink })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setTabLinkActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
                    <Navbar.Section>
                        <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
                            bgluesticker@mantine.dev
                        </Text>

                        <SegmentedControl
                            value={section}
                            onChange={(value) => setSection(value)}
                            transitionTimingFunction="ease"
                            fullWidth
                            data={[
                                { label: 'My Account', value: 'account' },
                                { label: 'Admin', value: 'admin' },
                            ]}
                        />
                    </Navbar.Section>

                    <Navbar.Section grow mt="xl">
                        {tabLinks}
                    </Navbar.Section>

                    <Navbar.Section className={classes.footer}>
                        <a href="#" className={classes.tabLink} onClick={(event) => event.preventDefault()}>
                            <IconLogout className={classes.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </a>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={60} mb={120}>
                    <Container className={classes.header}>
                        <Text className='font-bold'>Programming Project</Text>
                        <Group spacing={5} className={classes.links}>
                            {items}
                        </Group>

                        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    </Container>
                </Header>
            }
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <AppRoutes />
        </AppShell>
    );
}


function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    // will only allow users with the admin role to access the route, this is also confirmed server side
                    <PrivateRoute roles="ADMIN">
                        <Admin />
                    </PrivateRoute>
                }
            />
            <Route
                path='/admin/customers'
                element={
                    <PrivateRoute roles="ADMIN">
                        <Customers />
                    </PrivateRoute>
                }
            />
            <Route

                path='/admin/products'
                element={
                    <PrivateRoute roles="ADMIN">
                        <Products />
                    </PrivateRoute>
                }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>);
}