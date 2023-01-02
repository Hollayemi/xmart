import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '../../../components/websiteCompoents/HorizontalDisplay';
import { recentlyViewed } from '../../../state/slices/home/view/view';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';
import { fakeImages } from '../../../components/websiteCompoents/Images';

const RecentView = ({ userData }) => {
    var settings = {
        infinite: false,
        centerMode: true,
        variableWidth: true,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
    };
    const dispatch = useDispatch();
    const { myViews, ...viewInfo } = useSelector(
        (state) => state.reducer.viewReducer
    );
    console.log(myViews);
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    let prodState = status === 'FULFILLED' ? cartData[2] : ['0'];
    useEffect(() => {
        userData?._id && recentlyViewed(userData, dispatch);
    }, []);
    console.log(myViews);
    let products =
        myViews?.length > 0 ? (
            myViews.map((each, index) => {
                let starSum = 0;
                each.product.rate.map((res) => {
                    starSum = starSum + parseInt(res);
                });
                return (
                    <Product
                        key={index}
                        id={each.product._id}
                        userId={userData._id}
                        img={fakeImages['fakeImg' + (index + 1)]}
                        sellingPrice={each.product.prodPrice}
                        originalPrice={each.product.prodPrice}
                        store={each.product.store}
                        name={each.product.prodName}
                        styles="w-48"
                        myCarts={prodState}
                        totReview={each.product.rate.length}
                        star={parseInt(starSum / each.product.rate.length)}
                        distance={
                            each.product.distance
                                ? each.product.distance.toFixed(2) + ' km'
                                : ''
                        }
                    />
                );
            })
        ) : (
            <div>No Order Preview Available</div>
        );

    return (
        <>
            <div className="flex items-center justify-center">
                <div className=" py-3 border-y-2 border-white bg-slate-100 w-11/12 ">
                    {viewInfo.status === 'FULFILLED' ? (
                        <Slider {...settings} className="w-full">
                            {products}
                        </Slider>
                    ) : (
                        <div className="w-full text-center">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecentView;
