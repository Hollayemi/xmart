import React from 'react';
import { FaCartArrowDown, FaCartPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader } from 'rsuite';
import fakeImg2 from '../../../../assets/images/png/_supreme.png';
import Loading from '../../../../components/elements/Loading';
import { REQUEST_STATUS } from '../../../../state/slices/constants';

export const MyCartPreView = ({ image, name, qty, price }) => {
    return (
        <div className="w-full my-6 text-slate-900">
            <div className="flex items-center px-2">
                <div className="w-12 h-12 min-w-16 min-h-12 flex justify-center items-center cursor-pointer mx-2 rounded-md border">
                    <img
                        src={image}
                        className="w-10 h-10 max-h-fit"
                        alt="my images"
                    />
                </div>
                <div className="flex w-8/12 justify-between items-center">
                    <div>
                        <h5 className="font-semibold">{name}</h5>
                        <div>
                            <div className="flex items-center tracking-wide text-xs">
                                <h5 className="w-6 min-w-fit items-center bg-slate-200 rounded-sm px-1 shadow-md">
                                    Price:
                                </h5>
                                <span className="pl-1 pr-2">
                                    &#x20A6;{price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const selectionHandler = (spec, setSpec, chosenSpec) => {
    let check = chosenSpec.filter((each) => each !== spec);
    const newSetOfColors = !chosenSpec.includes(spec)
        ? check.push(spec)
        : check;
    setSpec(check);
};

export const SizeBtn = ({ size, disable, preferedSizes, setSize }) => {
    return (
        <div className="p-1">
            {disable ? (
                <button
                    disabled
                    className="w-12 h-10 rounded bg-slate-200 text-slate-500 border"
                >
                    {size}
                </button>
            ) : (
                <button
                    onClick={() =>
                        selectionHandler(size, setSize, preferedSizes)
                    }
                    className="w-12 h-10 relative rounded bg-slate-500 text-slate-100 borde"
                >
                    {size}
                    {preferedSizes.includes(size) && (
                        <h5 className="w-2 h-2 absolute top-0 m-1 right-0 rounded-full bg-slate-100 shadow">
                            <></>
                        </h5>
                    )}
                </button>
            )}
        </div>
    );
};

export const ColorBtn = ({ color, chosenColors, setColor }) => {
    return (
        <div className="p-1 cursor-pointer">
            <div
                onClick={() => selectionHandler(color, setColor, chosenColors)}
                className={`w-8 h-8 rounded relative bg-${color}-600 text-slate-100 border`}
            >
                {chosenColors.includes(color) && (
                    <h5 className="w-2 h-2 absolute top-0 m-1 right-0 rounded-full bg-slate-200 shadow">
                        <></>
                    </h5>
                )}
            </div>
        </div>
    );
};

export const PreviewImg = ({ setImage, image }) => {
    return (
        <div className="w-12 h-12 flex justify-center items-center hover:border-green-600 cursor-pointer border-slate-200 mx-2 rounded-md bg-slate-200 border">
            <img
                src={image}
                className="w-10 h-10 max-h-fit"
                alt="my images"
                onClick={() => setImage(image)}
            />
        </div>
    );
};

export const colors = ['blue', 'green', 'rose', 'red', 'slate'];
export const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XS'];

//
//
export const CountCart = ({ useSelector }) => {
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    const CartItems = status ? (
        status === REQUEST_STATUS.FULFILLED ? (
            cartData[2].length
        ) : status !== 'idle' ? (
            <Loading />
        ) : null
    ) : null;
    return CartItems;
};
export const LoadCart = ({ setHideCart, useSelector }) => {
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    const CartItems = status === REQUEST_STATUS.FULFILLED ? cartData[0] : ['0'];

    return (
        <>
            {setHideCart && (
                <i
                    onClick={() => setHideCart('hidden')}
                    className="absolute top-1 right-1 cursor-pointer"
                >
                    <FaTimes />
                </i>
            )}
            <h5 className="text-slate-900 text-[13px] font-medium flex mx-3 my-2 items-center">
                Your cart{' '}
                <span className="w-5 h-5 rounded-full ml-2 font-bold flex items-center justify-center bg-slate-200">
                    {CartItems.length}
                </span>
            </h5>
            <div className="h-44 pb-10 myScroll overflow-auto">
                {CartItems.length > 0 &&
                    CartItems.map(
                        (res, index) =>
                            res !== '0' && (
                                <MyCartPreView
                                    key={index}
                                    image={fakeImg2}
                                    price={res.result.prodPrice}
                                    name={res.result.prodName}
                                />
                            )
                    )}
            </div>
            <div className="flex absolute bg-white py-3 shadow bottom-0 w-full items-center justify-between px-4">
                <Link to="/cart">
                    <button
                        className={`w-24 h-7 border-slate-400 ${
                            !setHideCart && 'text-slate-600'
                        } border rounded text-sm font-semi`}
                    >
                        View Cart
                    </button>
                </Link>
                <Link to="/checkout">
                    <button className="w-24 h-7 bg-slate-700 text-white  rounded text-sm font-semi">
                        Checkout
                    </button>
                </Link>
            </div>
        </>
    );
};

export const CartButton = ({ prodIds, addToCart, productInfo, status }) => {
    return (
        <div
            onClick={addToCart}
            className="px-2 border cursor-pointer flex justify-center border-slate-200 ml-3 rounded-md shadow-md w-52 h-12 flex items-center"
        >
            {status !== 'PENDING' ? (
                <>
                    <h5 className="text-lg text-slate-500">
                        {!prodIds.includes(productInfo._id)
                            ? 'Add to cart'
                            : 'Remove from cart'}
                    </h5>
                    {!prodIds.includes(productInfo._id) ? (
                        <FaCartPlus className="w-xl text-xl ml-2" />
                    ) : (
                        <FaCartArrowDown className="w-xl text-xl ml-2" />
                    )}
                </>
            ) : (
                <div className="h-12 w-full flex items-center justify-center">
                    <Loader
                        speed="fast"
                        content={
                            !prodIds.includes(productInfo._id)
                                ? 'Adding...'
                                : 'Removing'
                        }
                    />
                </div>
            )}
        </div>
    );
};
