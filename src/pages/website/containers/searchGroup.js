import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchWrapper from '../../../components/websiteCompoents/ReuseableFlex';
import { websiteImages } from '../../../components/websiteCompoents/Images';
import { Loader } from 'rsuite';
import { Product } from '../../../components/websiteCompoents/HorizontalDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import SigninPop from '../../auth/signin/Pop up';
import { sliderLinkHandler } from '../../../state/slices/home';
import { fetcher } from '../../../state/slices/home/search/aggrSearch';
import { ProductList } from './searchCategories';

const BrandSearch = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const [openAdd, setOpenAdd] = useState(false);
    const [availableCate, setAvailableCate] = useState([]);
    const [Group, setGroup] = useState([]);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const { cartData } = useSelector((state) => state.reducer.cartedProduct);

    let prodState = ['0'];
    if (cartData && cartData.type === 'success') {
        cartData.message.map((x) => {
            return prodState.push(x.productId);
        });
    }
    useEffect(() => {
        let query = {
            prodCategory: param.category.replaceAll('-', ' '),
            prodSub_Category: param.brand.replaceAll('-', ' '),
            state: 'Lagos State',
        };
        fetcher(dispatch, query, 'prodGroup', setGroup);
        sliderLinkHandler(dispatch, setAvailableCate);
    }, []);
    let Products = (
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
        <SearchWrapper>
            <div className="flex justify-center md:mt-6">
                {/* <div className="flex w-full lg:w-11/12 md:mx-4 bg-white max-h-[460px]">
                    <div className="hidden lg:block w-80 min-w-[240px] mx-2 rounded-md">
                        <div className="shadow-md shadow-slate-200 h-[420px] mt-4 overflow-y-auto myScroll">
                            <Categories
                                setCategory={setCategory}
                                expandCate={expandCate}
                                allCate={availableCate}
                            />
                        </div>
                    </div>
                    <div className="p-1 w-full md:w-[calc(100%-280px)] relative">
                        <Slider {...settings}>
                            <MySlickSlide image={websiteImages.slider1} />
                            <MySlickSlide image={websiteImages.slider2} />
                            <MySlickSlide image={websiteImages.slider3} />
                            <MySlickSlide image={websiteImages.slider4} />
                        </Slider>
                        <LeftMenu
                            category={expandCate}
                            setCategory={setCategory}
                            image={websiteImages.Image1}
                        />
                    </div>
                </div> */}
            </div>
            <section className="px-2 md:px-6">
                {Group.length === 0 && Products}
                {Group.map((res, index) => {
                    return (
                        <section key={index} className="shadow my-3">
                            <div className="flex justify-between w-full items-center px-4 md:px-6 h-16 font-[600] bg-white border-b-2 border-slate-800 text-slate-700">
                                {res._id.name}
                                <Link
                                    to={`/s/${param.category}/${res._id.name}`}
                                >
                                    <button className="h-8 px-3 py-1 text-[15px] border mr-2">
                                        EXPAND
                                    </button>
                                </Link>
                            </div>
                            <div className="h-[550px] bg-slate-50">
                                <div className="w-full flex justify-center">
                                    <div className="w-full mt-3 sm:w-10/12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                        <ProductList
                                            res={res}
                                            userData={userData}
                                            prodState={prodState}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
                <SigninPop
                    setOpenAdd={setOpenAdd}
                    going={window.location.pathname}
                    openAdd={openAdd}
                />
            </section>
        </SearchWrapper>
    );
};

export default BrandSearch;

// const ProductList = ({ res }) => {
//     return res.detail.map((each, index2) => {
//         return (
//             <div
//                 key={index2}
//                 className="w-full flex justify-center w-full mt-1"
//             >
//                 <Product
//                     img={websiteImages.Image1}
//                     sellingPrice={each.prodPrice}
//                     nick={each.store}
//                     myCarts={prodState}
//                     originalPrice={each.prodPrice}
//                     name={each.prodName}
//                     id={each._id}
//                     userId={(userData && userData._id) || 'noId'}
//                     styles={'w-full flex justify-center'}
//                 />
//             </div>
//         );
//     });
// };
