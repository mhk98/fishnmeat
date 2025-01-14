import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import { useGetAllCartQuery } from '~/react-redux/features/cart/cart';
import { isLoggedIn } from '../services/auth.service';

export default function CartContent() {

    const userLoggedIn = isLoggedIn();

    const { data } = useGetAllCartQuery();
    const products = data?.data || [];

    // Safely parse the cart items from localStorage
    const cartItems = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch {
            return [];
        }
    }, []);

    const cartProducts = useMemo(() => {
        if (cartItems.length === 0) return [];
        return products.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id) || {};
            return {
                id: product.id,
                title: product.title || 'Untitled Product',
                thumbnailImage: product.default_image || null,
                price: product.price || 0,
                quantity: product.quantity || 0,
            };
        });
    }, [products, cartItems]);

    const content = useMemo(() => {
        if (products.length === 0) {
            return (
                <div className="ps-section__content">
                    <div className="alert alert-info">
                        <p className="mb-0">Your cart is currently empty.</p>
                    </div>

                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems products={cartProducts} />
                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-space-between">
                        <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <figure>
                                        <figcaption>Coupon Discount</figcaption>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter coupon here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="ps-btn ps-btn--outline">
                                                Apply
                                            </button>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ModuleCartSummary source={cartProducts} />
                            {
                                (userLoggedIn === true) ?
                                    <Link
                                href={'/account/checkout'}
                                className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </Link> 
                                 : 

                                 <Link
                                href={`/account/login?redirect=/account/checkout`}
                                className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </Link>

                                 
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }, [products, cartProducts]);

    return <section>{content}</section>;
}
