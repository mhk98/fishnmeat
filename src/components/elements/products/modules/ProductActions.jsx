'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
import toast from 'react-hot-toast';


const ProductActions = ({ product }) => {
    const ecomerce = useSelector(({ ecomerce }) => ecomerce);
    const [isQuickView, setIsQuickView] = useState(false);
    // const { data2, isLoading2, isError2, error2 } = useCreateCartMutation(userId);
    const { data, isLoading, isError, error } = useGetAllCartQuery();
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      if (isError) {
        // Handle error, you can log it or display an error message.
        console.error2("Error fetching cart data:", error);
      } else if (!isLoading) {
        // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
        if (data && data.data) {
          setCart(data.data);
        }
      }
    }, [data, isLoading, isError, error]);
  
    const [createCart] = useCreateCartMutation();
  
    const handleAddItemToCart = (product) => {

        console.log('product', product)

      if (cart.some((item) => item.product_id === product.id)) {
        alert("This product is already in the cart.");
      } else {
        // Create a new cart with the added product
        const updatedCart = [...cart, product];
  
        setCart(updatedCart);
        const data = {
          title: product.title,
          price: product.price,
          default_image: product.default_image,
          weight:1,
          quantity:1
         
        };
        console.log("cart data here", product);
        createCart(data);
        // Save the updated cart data to local storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        // Show a success toast message to indicate that the product has been added
        toast.success("This product has been added to your cart");
      }
    };

    // function handleAddItemToWishlist(e) {
    //     e.preventDefault();
    //     addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
    //     const modal = Modal.success({
    //         centered: true,
    //         title: 'Success!',
    //         content: `This item has been added to your wishlist`,
    //     });
    //     modal.update;
    // }

    // function handleAddItemToCompare(e) {
    //     e.preventDefault();
    //     addItem({ id: product.id }, ecomerce.compareItems, 'compare');
    //     const modal = Modal.success({
    //         centered: true,
    //         title: 'Success!',
    //         content: `This product has been added to your compare listing!`,
    //     });
    //     modal.update;
    // }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };

    return (
        <ul className="ps-product__actions">
     

            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={() => handleAddItemToCart(product)}>
                    <i className="icon-bag2" />
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye" />
                </a>
            </li>
            {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    onClick={handleAddItemToWishlist}>
                    <i className="icon-heart" />
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars" />
                </a>
            </li> */}
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2" />}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default ProductActions;
