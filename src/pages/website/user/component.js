import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PlaceholderGraph from 'rsuite/esm/Placeholder/PlaceholderGraph';
import PlaceholderGrid from 'rsuite/esm/Placeholder/PlaceholderGrid';
import Loading from '../../../components/elements/Loading';
import { Verification } from '../../../components/SellerComponents/Dashboard/RecentInfo';
import { fetchShopInfo, toDashboard } from '../../../state/slices/shop/addShop';
import { getMyTools } from '../../../state/slices/shop/overview';
import { Graph2 } from '../../seller/Dashboard/Analytics/components';

export const NotRegPreview = ({ userData }) => {
    const [data, setData] = useState(null);
    return (
        <section className="relative h-[400px] w-full md:w-[400px] m-1 mt-6 sm:m-3 overflow-hidden rounded-md shadow">
            <div className="w-full px-4 py-2"> Other Benefits</div>
            <div className="w-full flex flex-col items-center justify-center">
                {userData ? (
                    <>
                        <div className="border relative rounded-full w-24 h-24 py-2">
                            <img
                                src={userData && userData.avatar.display}
                                alt="avartar"
                                className="w-full h-full rounded-full border"
                            />
                        </div>
                        <h3 className="flex flex-col items-center font-black text-lg">
                            {userData.fullname}
                            <span className="text-sm">User</span>
                        </h3>
                        <div className="w-full">
                            {/* <ShopAnalytics
                                userData={userData}
                                shopID={data._id}
                            /> */}
                        </div>
                    </>
                ) : (
                    <div className="flex h-full justify-center items-center">
                        <Loading speed="fast" />
                        <PlaceholderGraph />
                        <PlaceholderGrid />
                    </div>
                )}
            </div>
            <div className="bottom-0 cursor-pointer h-10 text-md bg-slate-700 text-slate-200 absolute w-full flex justify-center items-center">
                <div className="w-1/2 text-center h-full leading-10 bg-slate-200 text-slate-600">
                    <Link to="/seller">You can Open a store</Link>
                </div>
                <div className="w-1/2 text-center h-full leading-10 bg-slate-200 text-slate-600">
                    <Link to="/agent">Be an Agent</Link>
                </div>
            </div>
        </section>
    );
};

export const StorePreview = ({ userData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchShopInfo(dispatch, userData._id, userData.accessToken, setData);
    }, [userData, dispatch]);
    return (
        <section className="relative h-[400px] w-full md:w-[400px] m-1 mt-6 sm:m-3 overflow-hidden rounded-md shadow">
            <div className="w-full px-4 py-2"> Store Preview</div>
            <div className="w-full flex flex-col items-center justify-center">
                {data ? (
                    <>
                        <div className="border relative rounded-full w-24 h-24 py-2">
                            <img
                                src={data && data.avatar.display}
                                alt="avartar"
                                className="w-full h-full rounded-full border"
                            />
                        </div>
                        <h3 className="font-black text-lg">
                            {data.shopName}
                            <span className="text-sm">
                                {data && <Verification check={data.verify} />}
                            </span>
                        </h3>
                        <div className="w-full">
                            <ShopAnalytics
                                userData={userData}
                                shopID={data._id}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex h-full justify-center items-center">
                        <Loading speed="fast" />
                        <PlaceholderGraph />
                        <PlaceholderGrid />
                    </div>
                )}
            </div>

            <div
                onClick={() => toDashboard(userData, dispatch, navigate)}
                className="bottom-0 cursor-pointer h-10 text-md bg-slate-700 text-slate-200 absolute w-full flex justify-center items-center"
            >
                Visit Dashboard
            </div>
        </section>
    );
};

export const ShopAnalytics = ({ userData, shopId }) => {
    const dispatch = useDispatch();
    const [tools, setTools] = useState(null);
    useEffect(() => {
        getMyTools(
            dispatch,
            shopId,
            userData.accessToken,
            userData._id,
            setTools
        );
    }, [shopId, userData, dispatch]);
    return tools ? (
        <section className="flex justify-center mt-6 items-center w-full h-20 w-full">
            <div className="w-1/3 m-1 flex flex-col h-20 items-center justify-center">
                <h5>
                    Categories{' '}
                    {tools.Total_categories -
                        tools.categories +
                        ' / ' +
                        tools.Total_categories}
                </h5>
                <Graph2
                    legend={false}
                    myData={[
                        tools.Total_categories - tools.categories,
                        tools.Total_categories,
                    ]}
                    labels={['categories', 'total']}
                />
            </div>
            <div className="w-1/3 m-1 flex flex-col h-20 items-center justify-center">
                <h5>
                    Brands{' '}
                    {tools.Total_brands -
                        tools.brands +
                        ' / ' +
                        tools.Total_brands}
                </h5>
                <Graph2
                    legend={false}
                    myData={[
                        tools.Total_brands - tools.brands,
                        tools.Total_brands,
                    ]}
                    labels={['brands', 'total brands']}
                />
            </div>
            <div className="w-1/3 m-1 h-20 flex flex-col items-center justify-center">
                <h5>
                    Products{' '}
                    {tools.Total_products -
                        tools.products +
                        '/' +
                        tools.Total_products}
                </h5>
                <Graph2
                    legend={false}
                    myData={[
                        tools.Total_products - tools.products,
                        tools.Total_products,
                    ]}
                    labels={['brands', 'total brands']}
                />
            </div>
        </section>
    ) : (
        <Loading speed="fast" />
    );
};

export const Languages = [
    {
        value: 'English',
        label: 'English',
    },
    {
        value: 'Yoruba',
        label: 'Yoruba',
    },
    {
        value: 'Hausa',
        label: 'Hausa',
    },
    {
        value: 'Igbo',
        label: 'Igbo',
    },
];

export const accountLinks1 = [
    'Addresses',
    'Add a Pickup Person',
    'Communication Preferences',
    'Notifications',
    'Change Account Information',
    'Logout',
];
export const accountLinks2 = ['Change Your Password', 'Email Addresses'];

export const AccountAdjustment = ({ title, links }) => {
    return (
        <section className="h-[260px] w-[96%] sm:w-80 md:max-w-[300px] mt-4 p-3 mx-2 md:mx-4 rounded-md shadow">
            <h5 className="font-[600] p-2">{title}</h5>
            <div className="text-blue-400">
                {links.map((res, i) => (
                    <Link
                        to={
                            '/site/user/account/' +
                            res.replaceAll(' ', '-').toLowerCase()
                        }
                        key={i}
                    >
                        <div className="flex hover:text-blue-600 items-center justify-between px-2 py-1">
                            <h5>{res}</h5>
                            <i>
                                <FaAngleRight />
                            </i>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
