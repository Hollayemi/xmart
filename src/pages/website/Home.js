import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { websiteImages } from '../../components/websiteCompoents/Images';
import Categories from '../../components/websiteCompoents/Categories';
import SearchWrapper from '../../components/websiteCompoents/ReuseableFlex';
import HorizontalDisplay from '../../components/websiteCompoents/HorizontalDisplay';
import { ShopsBlock } from '../../components/websiteCompoents/HorizontalShops';
import { catIcons } from '../../components/SellerComponents/Info/categoriesIcon';
import { HomeDisplay } from '../../components/SellerComponents/Info/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { fetcher } from '../../state/slices/home/search/aggrSearch';
import { Loader } from 'rsuite';
import { sliderLinkHandler } from '../../state/slices/home';
import LeftMenu from './containers/expandCate';

export const MySlickSlide = ({ image, h }) => {
    return (
        <div className="w-full">
            <img src={image} alt="img_hwew" className={`w-full h-${h}`} />
        </div>
    );
};
export var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
};
export var settings2 = {
    infinite: true,
    variableWidth: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1100,
    pauseOnHover: true,
};

const Home = () => {
    const [expandCate, setCategory] = useState(null);
    const [availableCate, setAvailableCate] = useState([]);
    const [homeProduct, setHomeProduct] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const dispatch = useDispatch();

    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    let prodState = status === 'FULFILLED' ? cartData[2] : ['0'];

    useEffect(() => {
        const query = {
            state: 'Lagos State',
        };
        fetcher(dispatch, query, 'prodCategory', setHomeProduct);
        sliderLinkHandler(dispatch, setAvailableCate);
    }, []);

    const HomePreview = homeProduct ? (
        homeProduct.map((res, index) => {
            let infoCursor = res._id.name.split(' ')[0].split(',')[0];
            return (
                infoCursor && (
                    <HorizontalDisplay
                        myCarts={prodState}
                        tag={res._id?.name}
                        key={index}
                        products={res.detail}
                        about={HomeDisplay[infoCursor][0]}
                        image={HomeDisplay[infoCursor][1]}
                        slider={HomeDisplay[infoCursor][2]}
                        userId={(userData?._id) || 'noId'}
                    />
                )
            );
        })
    ) : (
        <div className="relative h-60">
            <Loader
                backdrop
                speed="fast"
                content="In few seconds..."
                vertical
            />
        </div>
    );

    return (
        <SearchWrapper
            setCategory={setCategory}
            expandCate={expandCate}
            allCate={availableCate}
        >
            <div className="flex justify-center">
                <div className="flex w-full lg:w-11/12 md:mx-4 bg-white min-h-fit max-h-[460px] py-2">
                    <div className="hidden md:block w-80 min-w-[240px] mx-2 rounded-md">
                        <div className="shadow-md shadow-slate-200 h-full overflow-y-scroll myScroll">
                            <Categories
                                setCategory={setCategory}
                                expandCate={expandCate}
                                allCate={availableCate}
                            />
                        </div>
                    </div>
                    <div className="pl-1 w-full md:w-[calc(100%-280px)] relative">
                        <Slider {...settings}>
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider1}
                            />
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider2}
                            />
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider3}
                            />
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider4}
                            />
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider5}
                            />
                            <MySlickSlide
                                h="auto"
                                image={websiteImages.slider6}
                            />
                        </Slider>
                        <Slider {...settings2}>
                            {catIcons.map((res, index) => {
                                return (
                                    <div
                                        className="w-40 p-1 px-4 text-black 
                                        hover:text-blue-600 text-center flex flex-col 
                                        justify-center items-center bg-gray-100"
                                        key={index}
                                    >
                                        <img
                                            src={res[0]}
                                            alt="icon"
                                            className="w-14 md:w-18"
                                        />
                                        <p>{res[1]}</p>
                                    </div>
                                );
                            })}
                        </Slider>
                        {expandCate && (
                            <LeftMenu
                                category={expandCate}
                                setCategory={setCategory}
                                image={websiteImages.Image1}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-9">
                <div className="w-full px-1 md:w-11/12">
                    <div className="bg-white py-4 md:p-4 shadow-lg border-t-4 border-slate-800">
                        <h2 className="h-16 pl-5 md:pl-20 border-b font-bold text-lg">
                            Verified Shops
                        </h2>
                        <ShopsBlock />
                    </div>
                    {HomePreview}
                </div>
            </div>
        </SearchWrapper>
    );
};

export default Home;
