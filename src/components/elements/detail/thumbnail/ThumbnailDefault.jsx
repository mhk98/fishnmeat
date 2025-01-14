import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getStrapiImageURL } from '~/services/strapiServices/image/getStrapiImageService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ThumbnailDefault = ({ product, vertical = true }) => {
   

    // const images = useMemo(() => {
    //     const galleryImages = Array.isArray(product?.gallery_images)
    //         ? product.gallery_images
    //         : product?.gallery_images
    //         ? [product.gallery_images]
    //         : [];
    
    //     if (galleryImages.length > 1) {
    //         return galleryImages.map((image) => ({
    //             url: getStrapiImageURL(image, 'large', true),
    //         }));
    //     } else if (galleryImages.length === 1) {
    //         return [
    //             {
    //                 url: getStrapiImageURL(galleryImages[0], 'large', true),
    //             },
    //         ]; // Wrap the single image in an array
    //     } else {
    //         return []; // Fallback for no images
    //     }
    // }, [product]);
    
    
    console.log('product', product)

    const [activeIndex, setActiveIndex] = useState(0);
    const primarySwiperRef = useRef(null);
    const secondarySwiperRef = useRef(null);

    const onPrimarySlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    useEffect(() => {
        if (primarySwiperRef.current && primarySwiperRef.current.swiper) {
            primarySwiperRef.current.swiper.slideTo(activeIndex);
        }
        if (secondarySwiperRef.current && secondarySwiperRef.current.swiper) {
            secondarySwiperRef.current.swiper.slideTo(activeIndex);
        }
    }, [activeIndex]);

    function handlePrimaryPrev() {
        if (primarySwiperRef.current && primarySwiperRef.current.swiper) {
            primarySwiperRef.current.swiper.slidePrev();
        }
    }

    function handlePrimaryNext() {
        if (primarySwiperRef.current && primarySwiperRef.current.swiper) {
            primarySwiperRef.current.swiper.slideNext();
        }
    }

    return (
        <div
    className="ps-product__thumbnail"
    data-vertical={vertical ? 'true' : 'false'}>
    <figure>
        <div className="ps-wrapper carousel--productImages">
            {Array.isArray(product?.gallery_images) && product.gallery_images.length > 1 && (
                <div className="swiper--custom-avigation">
                    <button onClick={handlePrimaryPrev}>
                        <i className="icon-chevron-left" />
                    </button>
                    <button onClick={handlePrimaryNext}>
                        <i className="icon-chevron-right" />
                    </button>
                </div>
            )}
            <Swiper
                ref={primarySwiperRef}
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) =>
                    setActiveIndex(swiper.activeIndex)
                }>
                {(Array.isArray(product?.gallery_images)
                    ? product.gallery_images
                    : [product?.gallery_images] // Single image as array
                ).map((item, index) => (
                    <SwiperSlide className="item" key={index}>
                        <a href={'/'} className="carousel-image-link">
                            <LightGallery
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}>
                                <img
                                    src={`http://localhost:5000/${item}`}
                                    alt={item}
                                />
                            </LightGallery>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </figure>
    <div className="product__thumbnailImages">
        <Swiper
            className="swiper-carousel--variants"
            spaceBetween={12}
            slidesPerView={4}
            onSlideChange={onPrimarySlideChange}
            slideToClickedSlide={true}
            ref={secondarySwiperRef}
            breakpoints={{
                320: {
                    slidesPerView: 5,
                },
                1280: {
                    slidesPerView: 4,
                    direction: vertical ? 'vertical' : 'horizontal',
                },
            }}>
            {(Array.isArray(product?.gallery_images)
                ? product.gallery_images
                : [product?.gallery_images] // Single image as array
            ).map((item, index) => (
                <SwiperSlide className="item" key={index}>
                    <img
                        src={`http://localhost:5000/${item}`}
                        alt={item}
                        className={`swiper-slide-image ${
                            index === activeIndex ? 'active' : ''
                        }`}
                        onClick={() => setActiveIndex(index)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</div>

    );
};

export default ThumbnailDefault;
