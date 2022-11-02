import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Loader, Rate } from 'rsuite';
import { FaBus, FaShoppingCart } from 'react-icons/fa';
import { fakeImages } from './Images';
import { cartHandler } from '../../state/slices/home/cart';
import SigninPop from '../../pages/auth/signin/Pop up';

var settings = {
    infinite: true,
    centerMode: true,
    variableWidth: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
};

const HorizontalDisplay = (props) => {
    const { userId, image, about, tag, slider, reverse, myCarts, products } =
        props;
    let Products = (
        <div className=" w-full h-44 flex justify-center items-center">
            <Loader
                backdrop
                speed="fast"
                content="In few seconds..."
                vertical
            />
        </div>
    );
    if (products.length > 0) {
        Products = products.map((each, index) => {
            let starSum = 0;
            each.rate.map((res) => {
                starSum = starSum + parseInt(res);
            });

            return (
                <Product
                    key={index}
                    id={each._id}
                    userId={userId}
                    img={fakeImages['fakeImg' + (index + 1)]}
                    sellingPrice={each.prodPrice}
                    originalPrice={each.prodPrice}
                    store={each.store}
                    name={each.prodName}
                    styles="w-48"
                    myCarts={myCarts}
                    totReview={each.rate.length}
                    star={parseInt(starSum / each.rate.length)}
                    distance={each.distance.toFixed(2) + ' km'}
                />
            );
        });
    }
    return (
        <div className="bg-white py-4 md:p-4 mt-6 shadow-lg shadow-slate-200 border-t-4 border-slate-800">
            <h2 className="h-16 pl-5 md:pl-20 border-b font-bold text-lg text-black flex items-center justify-between">
                {tag}
                <Link to={`/s/${tag.replaceAll(' ', '-')}`}>
                    <button className="h-8 px-3 py-1 text-[15px] border mr-2">
                        EXPLORE
                    </button>
                </Link>
            </h2>
            {slider}
            <div
                className={`flex h-[550px] md:h-[300px] flex-col md:flex-row ${
                    reverse && 'md:flex-row-reverse'
                }`}
            >
                <div className="w-full md:w-80 md:min-w-[320px] h-80 md:h-full relative">
                    <img
                        src={image}
                        alt="imageHere"
                        className="w-full h-full "
                    />
                    <div className="absolute bg-gradient-to-t from-slate-900 to-transparent top-0 left-0 h-full w-full">
                        <div className="flex flex-col items-center absolute w-2/3 pr-2 right-0 md:w-full bottom-6 md:bottom-2 px-2">
                            <h5 className="text-white text-lg font-bold">
                                {about}
                            </h5>
                            <Link to={`/s/${tag.replaceAll(' ', '-')}`}>
                                <h5 className="flex items-center justify-center w-28 h-8 mt-3 rounded bg-white text-blue-500 shadow-xl">
                                    Expore
                                </h5>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-evenly mt-1 pl-2 w-full md:w-[calc(100%-320px)]">
                    <div className="w-full relative">
                        <Slider {...{ ...settings, autoplaySpeed: 4000 }}>
                            {Products}
                        </Slider>
                    </div>
                    {/* <div className="w-full relative">
                        <Slider {...settings}>{Products}</Slider>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
export default HorizontalDisplay;

export const Product = (prop) => {
    const [openAdd, setOpenAdd] = useState(false);
    const {
        id,
        userId,
        originalPrice,
        img,
        name,
        styles,
        myCarts,
        store,
        star,
        totReview,
        distance,
    } = prop;
    const dispatch = useDispatch();
    let payload = {
        body: {
            productId: id,
            userId: userId,
            quantity: 1,
            store: store,
            color: ['As displayed'],
            size: ['As displayed'],
        },
    };
    return (
        <div
            className={`flex flex-col justify-center items-center ${styles} h-60 pb-2 border rounded mx-2 my-1 hover:shadow-lg `}
        >
            <div className="w-40 h-40 min-h-[105px] flex justify-center">
                <img
                    src={img}
                    alt="img_here"
                    className="w-28 h-28 pt-2 rounded-xl"
                />
            </div>
            <div className="w-full px-2">
                <div className="flex items-center justify-between">
                    <h5 className="text-[12px] flex items-center p-0 text-red-400">
                        Xpress <FaBus className="ml-3" />
                    </h5>
                    <h5 className="text-[10px] font-bold">{distance}</h5>
                </div>
                <Link to={`/b/${store}/${name.split(' ').join('-')}`}>
                    <h5 className="text-md text-slate-800 font-[500] leading-5">
                        {name}
                    </h5>
                </Link>
                <div className="flex items-center justify-between p-1">
                    <Rate
                        readOnly
                        defaultValue={parseInt(star)}
                        className="w-20"
                        size="xs"
                    />
                    <h5 className="text-[10px]">{totReview} Reviews</h5>
                </div>
                <div className="flex items-center justify-between px-3">
                    <h5 className="font-black text-sm">
                        &#x20A6; {originalPrice}
                    </h5>
                    <FaShoppingCart
                        className={`${
                            myCarts.includes(id)
                                ? 'text-yellow-500'
                                : 'text-slate-800'
                        } cursor-pointer`}
                        onClick={() => {
                            if (userId !== 'noId') {
                                cartHandler(payload, dispatch, () => {});
                            } else {
                                setOpenAdd(!openAdd);
                            }
                        }}
                    />
                </div>
            </div>
            <SigninPop
                setOpenAdd={setOpenAdd}
                going={window.location.pathname}
                openAdd={openAdd}
            />
        </div>
    );
};
