import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    FaAddressBook,
    FaAngleDown,
    FaLightbulb,
    FaPhoneAlt,
    FaUser,
} from 'react-icons/fa';
// import { Loading } from 'rsuite';
import ModalPanel from '../../../components/elements/ModalPanel';
import AddressBook from './address';
import { useDispatch, useSelector } from 'react-redux';
import SearchWrapper from '../../../components/websiteCompoents/ReuseableFlex';
import { getPickupPerson } from '../../../state/slices/users/pickup';
import { FetchCartHandler } from '../../../state/slices/home/cart/fetchCart';
import { GroupCart } from './components';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';

const Checkout = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [address, setAddress] = useState(null);
    const [getPickers, setPickers] = useState(null);
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    const dispatch = useDispatch();
    let prodState = status === 'FULFILLED' ? cartData[1] : [];
    useEffect(() => {
        if (userData) {
            let auth = userData._id + ' ' + userData.accessToken;
            getPickupPerson(userData._id, auth, dispatch, setPickers);
            FetchCartHandler(userData._id, dispatch, () => {});
        } else {
            navigate('/signin');
        }
    }, [userData, dispatch, navigate]);
    let myPickers = [];
    myPickers = getPickers
        ? getPickers.map((each) => ({
              value: each._id,
              label: `${each.surname} ${each.last_name} (${each.relationship})`,
          }))
        : [];
    myPickers.push({ value: userData._id, label: 'You' });
    let auth = userData ? userData._id + ' ' + userData.accessToken : '';
    return (
        <SearchWrapper>
            <section>
                <div className="mt-8 md:mt-12 pb-10 mx-2 sm:mx-5 md:flex">
                    {openAdd && (
                        <ModalPanel
                            closeButton={true}
                            title="Address Details"
                            children={
                                <AddressBook
                                    setAddress={setAddress}
                                    userId={userData._id}
                                    setOpenAdd={setOpenAdd}
                                    openAdd={openAdd}
                                    withNew={true}
                                />
                            }
                            hasBackdrop={true}
                            keyboard={true}
                            open={openAdd}
                            buttonName="Varify Code"
                            handleClose={() => setOpenAdd(!openAdd)}
                        />
                    )}
                    <div className="w-full md:w-4/6">
                        <div className=" flex bg-slate-50 px-2 flex-col items-center shadow-md rounded-t-md w-full">
                            <h5 className="w-full border-b h-10 px-4 leading-10">
                                Delivery / Pickup Options
                            </h5>
                            <div className="flex flex-col lg:flex-row items-center my-5">
                                <div className="w-full lg:w-6/12 pb-2 border rounded-t-md m-3 ">
                                    <div className="flex px-2 justify-between items-center h-10 py-2 border-b">
                                        <h5>Deliver to me</h5>
                                        <button
                                            onClick={() => setOpenAdd(true)}
                                            className="bg-slate-700 text-white text-xs rounded h-8 w-28 shadow"
                                        >
                                            Pick Address
                                        </button>
                                    </div>
                                    <div className="h-40">
                                        <div className="px-2">
                                            <h5 className="flex my-2 items-center">
                                                <FaUser />{' '}
                                                <span className="ml-4">
                                                    {address
                                                        ? address.surname +
                                                          ' ' +
                                                          address.first_name +
                                                          ' ' +
                                                          address.last_name
                                                        : '(No subject)'}
                                                </span>
                                            </h5>
                                            <h5 className="flex my-2 ">
                                                <FaAddressBook className="mt-2" />{' '}
                                                <span className="ml-4">
                                                    {address
                                                        ? address.address
                                                        : '(No subject)'}
                                                </span>
                                            </h5>
                                            <h5 className="flex my-2 items-center">
                                                <FaPhoneAlt />{' '}
                                                <span className="ml-4">
                                                    {address
                                                        ? address.phone_number
                                                        : '(No subject)'}
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 pb-2 border rounded-t-md m-3 ">
                                    <div className="flex px-2 justify-between items-center h-10 py-2 border-b">
                                        <h5>Pick from a store</h5>
                                        <button className="bg-slate-700 flex items-center justify-center text-white text-xs rounded h-8 w-36 shadow">
                                            Get Store Location{' '}
                                            <FaAngleDown className="ml-2" />
                                        </button>
                                    </div>
                                    <div className="w-full h-40 min">
                                        <div className="h-full flex items-center justify-center">
                                            <p className="w-full shadow-md my-2 w-4/5 bg-slate-50 p-2 flex rounded text-left  text-xs">
                                                <FaLightbulb className="mr-3" />{' '}
                                                Let us find you the closest
                                                store you can get you order from{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 flex mt-3 flex-col items-center rounded-t-md w-full">
                            <h5 className="w-full border-b h-10 px-4 leading-10 shadow-md">
                                Review Order
                            </h5>
                            <div className="w-full flex items-center bg-slate-700 text-white h-8 px-4 font-[300]">
                                <h5 className="w-3/6 ">Delivery</h5>
                                <h5 className="w-1/6 hidden lg:block">
                                    Quantity
                                </h5>
                                <h5 className="w-1/6 hidden lg:block">Price</h5>
                                <h5 className="w-1/6 hidden lg:block">
                                    Action
                                </h5>
                            </div>
                            <div className="w-full rounded-t-md">
                                {prodState.map((res, i) => {
                                    return (
                                        <GroupCart
                                            key={i}
                                            eachStore={res}
                                            myPickers={myPickers}
                                            userId={userData._id}
                                            auth={auth}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {status === 'FULFILLED' ? (
                        <div className="w-full md:fixed md:top-32 z-0 right-3 md:w-2/6 mt-6 md:mt-0 md:pl-5">
                            <div className="w-full rounded-t-md bg-slate-50 shadow-md">
                                <h4 className="w-full flex justify-btween items-center px-4 text-md font-bold h-10 leading-10 border-b">
                                    Order Summary
                                    {status === 'FULFILLED' && (
                                        <span className="px-2 ml-5 h-6 leading-6 rounded shadow bg-slate-100">
                                            {cartData[2].length} items from{' '}
                                            {cartData[1].length} store(s)
                                        </span>
                                    )}
                                </h4>
                                <div>
                                    <h5 className="flex my-2 items-center justify-between px-5 h-10 border-b border-dotted">
                                        Subtotal{' '}
                                        <span className="font-bold">
                                            &#x20A6;
                                            {cartData[1]
                                                .map((a) => a.storeCheckout)
                                                .reduce((a, b) => a + b, 0)}
                                        </span>
                                    </h5>
                                    <h5 className="flex my-2 items-center justify-between px-5 h-10 border-b-2 border-slate-800 border-dotted">
                                        Shipping amount{' '}
                                        <span className="font-bold">
                                            &#x20A6; {200 * cartData[2].length}
                                        </span>
                                    </h5>
                                    <h5 className="flex my-2 items-center justify-between px-5 h-10">
                                        Total{' '}
                                        <span className="font-bold">
                                            &#x20A6;5600
                                        </span>
                                    </h5>
                                </div>
                            </div>

                            <div className="w-full mt-5 rounded-t-md bg-slate-50 shadow-md">
                                <h4 className="w-full flex justify-btween items-center px-4 text-md font-bold h-10 leading-10 border-b">
                                    Delivery options
                                </h4>
                                <div>
                                    <></>
                                    <div className="p-2 mt-9">
                                        <button className="bg-green-700 text-white w-full h-10 rounded-md shadow ">
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-60 flex items-center justify-center">
                            <Loader speed="fast" />
                        </div>
                    )}
                </div>
            </section>
        </SearchWrapper>
    );
};

export default Checkout;
