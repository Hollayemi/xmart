import React, { useEffect, useState } from 'react';
import {
    FaBell,
    FaCheckCircle,
    FaShoppingBag,
    FaSignOutAlt,
    FaTimes,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Prod1 from '../../../assets/images/png/_supreme5.png';
import DrawerPanel from '../../elements/DrawerPanel';
import Notification from '../../elements/DrawerPanel/drawerContent/notification';
import {
    myNotifications,
    storeCarts,
} from '../../../state/slices/shop/overview';

const RecentInfo = ({ otpData, numOfProduct }) => {
    const { shopData } = useSelector((state) => state.reducer.setShopReducer);
    const getShopData = shopData.data || null;
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [cart, setCarts] = useState(null);
    const [open, setOpen] = useState(false);
    const showNotification = () => {
        setOpen(true);
    };
    useEffect(() => {
        myNotifications(
            dispatch,
            getShopData && getShopData.store.toLowerCase(),
            otpData,
            setData
        );
        storeCarts(
            dispatch,
            getShopData && getShopData.store.toLowerCase(),
            otpData,
            setCarts
        );
    }, []);

    return (
        <>
            <div className="overflow-y-scroll myScroll">
                <div className="w-full flex justify-between px-5 mt-5">
                    <button
                        onClick={showNotification}
                        className="flex items-center justify-center w-10 h-10 rounded-full relative border-2 border-slate-600 text-md text-slate-600 cursor-pointer "
                    >
                        <FaBell />
                        {data && (
                            <p className="text-white w-4 h-4 text-[9px] font-semibold absolute -top-0 -right-2  rounded-full bg-red-600 text-sm flex items-center justify-center">
                                {data.message.length}
                            </p>
                        )}
                    </button>

                    <button
                        title="Logout"
                        className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-600 text-md text-slate-600 cursor-pointer "
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <img
                        src={getShopData && getShopData.avatar.display}
                        alt="avartar"
                        className="w-36 h-36 rounded-full"
                    />
                    <h3 className="font-black text-lg">Stephen Olayemi</h3>
                </div>
                <div className="w-full flex justify-center my-5">
                    <div className="flex p-3 border items-center">
                        <div className="flex items-center pr-3">
                            <i className="text-xl font-medium ">
                                <FaShoppingBag />
                            </i>
                            <div className="flex flex-col ml-4">
                                <p className="text-sm font-bold">
                                    {numOfProduct}
                                </p>
                                <h5 className="text-xs font-bold text-gray-400">
                                    Products
                                </h5>
                            </div>
                        </div>
                        <Verification
                            check={getShopData && getShopData.status}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-between items-center my-2 px-4">
                    <h3 className="font-black text-md">
                        Carts content ({cart && cart.length})
                    </h3>
                    <h3 className="font-black text-blue-500 text-md cursor-pointer">
                        See All
                    </h3>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-full overflow-auto h-[300px] myScroll">
                        {cart &&
                            cart.map((res, i) => (
                                <OrdersComponent
                                    key={i}
                                    amount={res.result.prodPrice}
                                    image={Prod1}
                                    qty={res.myCarts.quantity}
                                    product={res.result.prodName}
                                    time="2 days ago"
                                />
                            ))}
                    </div>
                </div>
            </div>
            <DrawerPanel
                placement="right"
                light
                title="Notification"
                size="xs"
                children={
                    <Notification
                        data={data}
                        otpData={otpData}
                        store={getShopData && getShopData.store.toLowerCase()}
                    />
                }
                backdrop
                open={open && true}
                handleClose={() => setOpen(false)}
            />
        </>
    );
};

export default RecentInfo;

const OrdersComponent = ({ image, product, time, amount, qty }) => (
    <div className="flex justify-center">
        <div className="flex  justify-between py-4 border-b border-slate-100 items-center w-11/12 border px-3">
            <div className="flex items-center">
                <div>
                    <img src={image} alt="This is about me" width={30} />
                </div>
                <div className="flex ml-3 flex-col items-between">
                    <h5 className="font-[600] text-xs text-blue-500">
                        {product.length < 14
                            ? product
                            : `${product.substring(0, 14)}...`}
                    </h5>
                    <h5 className="text-[10px] text-slate-500">{time}</h5>
                </div>
            </div>
            <div className="flex items-center">
                <h5 className="font-[700]">
                    &#x20A6;
                    {amount}
                </h5>
                <h5 className="ml-3">
                    Qty:
                    {qty}
                </h5>
            </div>
        </div>
    </div>
);

export const Verification = ({ check }) => (
    <div className="flex items-center pl-3 border-l">
        <i
            className={`text-2xl font-medium ${
                check === 'Verified' ? 'text-green-500' : 'text-red-400'
            } `}
        >
            {check !== 'Verified' ? <FaTimes /> : <FaCheckCircle />}
        </i>
        <div className="flex flex-col ml-4">
            <h5 className="text-xs font-bold text-gray-400">{check}</h5>
        </div>
    </div>
);
