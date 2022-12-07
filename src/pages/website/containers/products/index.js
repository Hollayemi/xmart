import React, { useEffect, useState } from 'react';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProductHandler } from '../../../../state/slices/home';
import { ProductDisplay } from './productDisplay';
import SetFeedback, { LoadReviews } from './review';
import { FetchCartHandler } from '../../../../state/slices/home/cart/fetchCart';
import SearchWrapper from '../../../../components/websiteCompoents/ReuseableFlex';

const ProductsContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [feedbackState, setFeedbackState] = useState([]);
    const [allMyCate, setAllMyCate] = useState(null);

    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const [productInfo, setInfo] = useState({});

    useEffect(() => {
        getOneProductHandler(dispatch, fetchPayload, setInfo, true, userData);
        userData?._id && FetchCartHandler(userData._id, dispatch, setAllMyCate);
    }, []);
    const fetchPayload = {
        store: params.shop.toLowerCase(),
        prodName: params.product.split('-').join(' '),
    };
    let payload = {
        body: {
            productId: (productInfo && productInfo._id) || 'noId',
            userId: (userData && userData._id) || 'noId',
            store: params.shop.toLowerCase(),
        },
    };

    let availableSize = ['0'];
    availableSize =
        (productInfo && productInfo.prodVari && productInfo.prodVari[0].size) ||
        '0';

    return (
        <SearchWrapper>
            <section className="min-h-[100vh] bg-slate-90 pb-16 md:pb-0 w-full ">
                {productInfo && productInfo._id ? (
                    <ProductDisplay
                        payload={payload}
                        productInfo={productInfo}
                        availableSize={availableSize}
                    />
                ) : (
                    <Loader speed="fast" content="wait..." />
                )}

                <div className="flex flex-col md:flex-row px-1 py-6 md:px-6 border-t border-gray-100 mt-10">
                    {userData && <SetFeedback
                        username={userData.username}
                        userId={userData._id}
                        productId={productInfo._id}
                        setFeedbackState={setFeedbackState}
                    />}
                    {productInfo._id && (
                        <LoadReviews productId={productInfo._id} />
                    )}
                </div>
            </section>
        </SearchWrapper>
    );
};

export default ProductsContainer;
