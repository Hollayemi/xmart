import React, { useEffect, useState } from 'react';
import {
    FaCartPlus,
    FaDumpster,
    FaFolderOpen,
    FaFolderPlus,
    FaRegUser,
    FaUserAlt,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Placeholder, Table } from 'rsuite';
import DashboardWrapper from '../../../../components/AdminComponents';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import {
    getAwaitingProducts,
    xmartOverview,
} from '../../../../state/slices/admin/dashboard';
import { OneProduct } from '../../../seller/Dashboard/editProduct';
import { SmallCard } from './components';

const Overview = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [awaiting, setAwaiting] = useState(null);
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    useEffect(() => {
        xmartOverview(dispatch, setData, adminData, '');
        getAwaitingProducts(dispatch, setAwaiting, adminData, 5);
    }, []);

    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 h-[500px] min-h-screen w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="Dashboard"
                        title="Welcome Back, xMart Admin"
                        info="We showcase products and locate store"
                    />
                </div>
                {data ? (
                    <div className="md:px-6 flex flex-wrap items-center">
                        <SmallCard
                            icon={<FaUserAlt />}
                            total={`${data.users}`}
                            info="Users Registered"
                        />
                        <SmallCard
                            icon={<FaDumpster />}
                            total={data.shops}
                            info="Store Opened"
                            link="stores"
                        />
                        <SmallCard
                            icon={<FaRegUser />}
                            total={data.agents}
                            info="Agent Registered"
                            link="agents"
                        />
                        <SmallCard
                            icon={<FaCartPlus />}
                            total={data.carts}
                            info="Cart Products"
                        />
                        <SmallCard
                            icon={<FaFolderOpen />}
                            total={data.collections}
                            info="Total Collections"
                        />
                        <SmallCard
                            icon={<FaFolderPlus />}
                            total={data.brands}
                            info="Total Brands"
                        />
                    </div>
                ) : (
                    <Placeholder />
                )}
                {awaiting && awaiting.length > 0 && (
                    <div className="flex justify-center mt-2">
                        <div className="relative w-full bg-white sm:w-[500px] md:w-[700px] flex items-center">
                            {awaiting && (
                                <OneProduct
                                    subCate={awaiting}
                                    setShowing={() => {}}
                                    setShowingInfo={() => {}}
                                    setView={() => {}}
                                    hideFuncs
                                />
                            )}

                            <div className="absolute right-0 bg-gradient-to-r flex items-center justify-center from-transparent via-slate-500 to-slate-900 h-48 w-32">
                                <Link to="/admin/dashboard/stores/awaiting">
                                    <button className="Lucida font-bold bg-white px-2 py-1 rounded text-slate-700">
                                        View all
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Order Request
                        </h5>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        <Table height={400} data={[]} onRowClick={(info) => {}}>
                            <Table.Column width={50} fixed>
                                <Table.HeaderCell>s/n</Table.HeaderCell>
                                <Table.Cell dataKey="id" />
                            </Table.Column>
                            <Table.Column width={100} fixed>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.Cell dataKey="name" />
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Event</Table.HeaderCell>
                                <Table.Cell dataKey="event" />
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.Cell dataKey="action" />
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.Cell dataKey="status" />
                            </Table.Column>
                            <Table.Column width={300}>
                                <Table.HeaderCell>Info</Table.HeaderCell>
                                <Table.Cell dataKey="info" />
                            </Table.Column>
                            <Table.Column width={200} fixed="right">
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.Cell dataKey="createdAt" />
                            </Table.Column>
                        </Table>
                    </div>
                </div>
            </section>
        </DashboardWrapper>
    );
};

export default Overview;
