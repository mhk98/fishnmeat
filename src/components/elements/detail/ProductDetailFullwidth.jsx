import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

const ProductDetailFullwidth = ({ product, pid }) => {
    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation pid={pid} product={product} />
                    <ModuleProductDetailDescription pid={pid} product={product} />
                    <ModuleDetailShoppingActions pid={pid} product={product} />
                    <ModuleProductDetailSpecification pid={pid} product={product} />
                    <ModuleProductDetailSharing />
                    <ModuleDetailActionsMobile pid={pid} product={product} />
                </div>
            </div>
            <DefaultDescription product={product} />
        </div>
    );
};

export default ProductDetailFullwidth;
