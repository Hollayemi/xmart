import React, { useState } from 'react';
import { FaMapPin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import fakeImg1 from '../../../../assets/images/png/_supreme4.png';
import fakeImg2 from '../../../../assets/images/png/_supreme.png';
import fakeImg3 from '../../../../assets/images/png/_supreme3.png';
import { cartHandler } from '../../../../state/slices/home/cart';
import fakeImg6 from '../../../../assets/images/png/_supreme5.png';
import { CartButton, LoadCart, PreviewImg } from './components';
import ModalPanel from '../../../../components/elements/ModalPanel';
import { SignInForm } from '../../../auth/signin/Signin';
import { REQUEST_STATUS } from '../../../../state/slices/constants';
import { Colors, Sizes } from './productContainers/productSpec';

export const ProductDisplay = ({ productInfo, availableSize, payload }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(10);
    const [image, setImage] = useState(fakeImg6);
    const [hideCart, setHideCart] = useState('hidden');
    const [openAdd, setOpenAdd] = useState(false);

    const [prefSizes, setPrefSize] = useState(['As displayed']);
    const [prefColors, setPrefColor] = useState(['As displayed']);
    const addPayLoad = {
        body: {
            ...payload.body,
            quantity: qty,
            size: prefSizes,
            color: prefColors,
        },
    };
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    const prodState = status === REQUEST_STATUS.FULFILLED ? cartData : ['0'];

    const addToCart = () => {
        if (payload.body.userId !== 'noId') {
            cartHandler(addPayLoad, dispatch, setHideCart);
        } else {
            setOpenAdd(!openAdd);
        }
    };

    return (
        <>
            <div className="flex md:flex-row flex-col md:w-full px-2 sm:px-6 md:px-2 z-40 relative lg:w-11/12">
                <div className=" w-full md:w-3/5 h-[50vh] md:h-[70vh] mt-5 md:mt-0">
                    <div className=" w-full h-full border-slate-300 overflow-hidden shadow rounded-2xl bg-slate-200 border flex items-center justify-center">
                        <img
                            src={image}
                            className="w-72 h-68 max-h-fit"
                            alt="my images"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center py-3">
                        <PreviewImg setImage={setImage} image={fakeImg1} />
                        <PreviewImg setImage={setImage} image={fakeImg2} />
                        <PreviewImg setImage={setImage} image={fakeImg3} />
                    </div>
                </div>
                <div className="w-full md:w-2/5 lg:m-3 md:pl-4 lg:pl-10 px-3 h-full mt-20 md:mt-0">
                    <h5 className="text-2xl md:text-2xl font-[1000] text-slate-700">
                        {productInfo && productInfo.prodName}
                    </h5>
                    <div className="flex items-center text-slate-500 my-2 text-[16px]">
                        <h5 className="font-thin text-slate-500">From:</h5>
                        <h5 className="font-black ml-4">
                            {productInfo && productInfo.shopName}
                        </h5>
                    </div>
                    <div className="my-6 flex items-center">
                        <h5 className="bg-slate-600 tracking-widest w-18 font-bold text-gray-100 text-md max-w-fit p-1 px-2 rounded-md shadow-md border border-gray-400 ">
                            &#x20A6;
                            {productInfo && productInfo.prodPrice}
                        </h5>
                        <div className="flex flex-col ml-4">
                            <h5 className="text-sm font-bold text-blue-300">
                                Save 12%
                            </h5>
                            <h5 className="text-sm text-slate-400">
                                Inclusive of all Taxes
                            </h5>
                        </div>
                    </div>
                    <p className="text-md my-6 text-slate-600 w-full md:w-4/5">
                        {productInfo.prodInfo}
                    </p>
                    <h5 className="flex items-start shadow py-2 justify-flex-start mb-3">
                        <FaMapPin className="mt-1 pl-2 text-[15px]" />
                        <p className="ml-5">
                            Block 32, Oniho shoping Complex, Jakande Estate
                            Jakande Estate, Isolo, Lagos state.
                        </p>
                    </h5>
                    <Colors
                        prefColors={prefColors}
                        setPrefColor={setPrefColor}
                    />
                    <Sizes
                        availableSize={availableSize}
                        prefSizes={prefSizes}
                        setPrefSize={setPrefSize}
                    />
                    <div className="flex items-center mt-10">
                        <div className=" flex items-center bg-slate-600 tracking-widest w-18 font-bold text-gray-100 text-lg max-w-fit px-2 rounded-md shadow-md border border-gray-400">
                            <h5 className="w-8 min-w-6">{qty}</h5>
                            <div className="flex flex-col items-center ml-3">
                                <h5
                                    onClick={() =>
                                        setQty(qty > 1 ? qty - 1 : qty)
                                    }
                                    className="cursor-pointer"
                                >
                                    -
                                </h5>
                                <h5
                                    className="cursor-pointer"
                                    onClick={() => setQty(qty + 1)}
                                >
                                    +
                                </h5>
                            </div>
                        </div>

                        <div className="relative">
                            <CartButton
                                prodIds={prodState[2] || []}
                                addToCart={addToCart}
                                productInfo={productInfo}
                                status={status}
                            />
                            <div
                                className={`w-60 md:w-76 absolute ${hideCart} -top-56 -left-4 border-blue-100 border rounded-t-md shadow-md bg-white`}
                            >
                                <LoadCart
                                    setHideCart={setHideCart}
                                    useSelector={useSelector}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPanel
                closeButton
                title=" "
                children={<SignInForm going="/" />}
                hasBackdrop
                keyboard
                open={openAdd}
                buttonName="Varify Code"
                handleClose={() => setOpenAdd(!openAdd)}
            />
        </>
    );
};
