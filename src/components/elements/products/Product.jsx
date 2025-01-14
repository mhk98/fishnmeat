import React from 'react';
import Link from 'next/link';
import ProductActions from '~/components/elements/products/modules/ProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const { thumbnailImage, badge } = useProduct(
        product.attributes
    );

    const {title, price, default_image} = product;
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    <img src={`http://localhost:5000/${default_image}`} alt="" />
                    {/* {thumbnailImage} */}
                </Link>
                {/* {badge(product)} */}
                <ProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href={'/shop'} className="ps-product__vendor">
                    Young Shop
                </Link>
                <div className="ps-product__content">
                    {title}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {price}
                </div>
                <div className="ps-product__content hover">
                    <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {title} <br/>
                    {price}
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Product;
