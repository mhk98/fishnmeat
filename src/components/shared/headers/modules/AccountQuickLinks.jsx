import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { userChangeIsLoggedIn } from '~/redux/features/userSlide';
import { isLoggedIn, removeUserInfo } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';

const accountLinks = [
    {
        text: 'Account Information',
        url: '/account/user-information',
    },
    {
        text: 'Notifications',
        url: '/account/notifications',
    },
    {
        text: 'Invoices',
        url: '/account/invoices',
    },
    {
        text: 'Address',
        url: '/account/addresses',
    },
    {
        text: 'Recent Viewed Product',
        url: '/account/recent-viewed-product',
    },
    // {
    //     text: 'Wishlist',
    //     url: '/account/wishlist',
    // },
];



const AccountQuickLinks = () => {
    const Router = useRouter()
    const handleLogout = () => {
        removeUserInfo('accessToken')
        Router.push('/account/login');

    };

    // const isLoggedIn = useSelector(({ user }) => user?.isLoggedIn);

    const userLoggedIn = isLoggedIn();

    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <Link href={item.url}>{item.text}</Link>
        </li>
    ));

    if (userLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user" />
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href='' onClick={ handleLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user" />
                </div>
                <div className="ps-block__right">
                    <Link href="/account/login">Login</Link>
                    {/* <Link href="/account/register">Register</Link> */}
                </div>
            </div>
        );
    }
};

export default AccountQuickLinks;
