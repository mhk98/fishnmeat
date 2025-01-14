import React, { useMemo } from 'react';
import Link from 'next/link';
import { Form, Input, Checkbox } from 'antd'; // Ensure Checkbox is imported
import { useRouter } from 'next/navigation';
import { useCreateOrderMutation } from '~/react-redux/features/order/order';
import { useGetAllCartQuery } from '~/react-redux/features/cart/cart';

export default function FormCheckoutInformation() {
    const router = useRouter();
    const { data } = useGetAllCartQuery();
    const products = data?.data || [];

    // Calculate cart products and amount
    const cartProducts = useMemo(() => {
        return products.map((product) => {
            const price = product.price || 0;
            const quantity = product?.quantity || 0;
            const subTotal = price * quantity;

            return {
                id: product.id,
                title: product.title || 'Untitled Product',
                thumbnailImage: product.default_image || null,
                price,
                quantity,
                subTotal,
            };
        });
    }, [products]);

    const amount = useMemo(() => {
        return cartProducts.reduce((total, product) => total + product.subTotal, 0);
    }, [cartProducts]);

    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();

    // Form submission handler
    const handleSubmit = async (values) => {
        try {
            // Combine form values with cartProducts and amount
            const data = {
                ...values, // Include form fields
                cartProducts, // Include cart details
                total: amount, // Include total amount
            };

            console.log('Submitted Data:', data);

            // Call createOrder API
  const res = await createOrder(data).unwrap();
  console.log('res', res)

            if (res.success === true) {
                alert('Order created successfully!');
                router.push('/account/shipping'); // Navigate to the next page
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create the order. Please try again.');
        }
    };

    return (
        <Form
            className="ps-form__billing-info"
            onFinish={handleSubmit} // Ant Design form submit handler
        >
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="emailOrPhone"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an email or mobile phone number!',
                        },
                    ]}
                >
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Email or phone number"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item name="keepUpdate" valuePropName="checked">
                    <Checkbox id="keep-update">
                        Keep me up to date on news and exclusive offers?
                    </Checkbox>
                </Form.Item>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your first name!',
                                },
                            ]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="First Name"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your last name!',
                                },
                            ]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an address!',
                        },
                    ]}
                >
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item name="apartment">
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a city!',
                                },
                            ]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="postalCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a postal code!',
                                },
                            ]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Postal Code"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item name="saveInfo" valuePropName="checked">
                    <Checkbox id="save-information">
                        Save this information for next time
                    </Checkbox>
                </Form.Item>
            </div>
            <div className="ps-form__submit">
                <Link href={'/account/shopping-cart'}>
                    <i className="icon-arrow-left mr-2" /> Return to shopping
                    cart
                </Link>
                <div className="ps-block__footer">
                    <button
                        type="submit"
                        className="ps-btn"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Processing...' : 'Continue to payment'}
                    </button>
                </div>
            </div>
        </Form>
    );
}
