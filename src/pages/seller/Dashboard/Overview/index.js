/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaMemory, FaFolderOpen, FaFolderPlus, FaImages } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Placeholder, Table } from 'rsuite';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import {
    getMyTools,
    OrderRequestsHandler,
} from '../../../../state/slices/shop/overview';
import { SmallCard } from './components';

const Overview = ({ neededInfo }) => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const {shopData, otpData} = neededInfo;
    const dispatch = useDispatch();
    const [OrderRequest, setOrders] = useState(null);
    const [tools, setTools] = useState('');
    const [activeTab, setActiveTab] = useState('Pending');
    const StatusTab = ({ name, showing}) => (
        <h5 onClick={() => setActiveTab(name)}
            className={`text-sm py-2 cursor-pointer font-[400] text-slat-800 px-4 rounded-t-md ${showing && 'bg-white text-slate-800'}`}
        >
            {name}
        </h5>
    )
    console.log(shopData.data.store);
    useEffect(() => {
        getMyTools(dispatch, shopData.id, userData, setTools);
        OrderRequestsHandler(dispatch, shopData.data.store, otpData, setOrders)
    }, []);
    console.log(OrderRequest);
    return (
        <section className="min-h-[100vh] p-3">
            <div className="m-2 md:m-5 mt-16">
                <TopTitle
                    header="store"
                    title={`Welcome Back, ${neededInfo.shopData.data.store.toUpperCase()}`}
                    info="Enjoy full control of your store"
                />
            </div>
            {tools ? (
                <div className="flex items-center flex-wrap mx-2 justify-evenly">
                    <SmallCard
                        icon={<FaMemory />}
                        total={`${tools.memory}mb`}
                        info="Memory left"
                    />
                    <SmallCard
                        icon={<FaFolderOpen />}
                        total={tools.categories}
                        info="Categories left"
                    />
                    <SmallCard
                        icon={<FaFolderPlus />}
                        total={tools.brands}
                        info="Brands left"
                    />
                    <SmallCard
                        icon={<FaImages />}
                        total={tools.products}
                        info="Products left"
                    />
                </div>
            ) : (
                <div className="flex items-center flex-wrap mx-2 justify-evenly">
                    <Placeholder.Paragraph className="text-slate-50 mt-6" graph="circle" />
                    <Placeholder.Paragraph className="text-slate-50 mt-6" graph="circle" />
                    <Placeholder.Paragraph className="text-slate-50 mt-6" graph="circle" />
                    <Placeholder.Paragraph className="text-slate-50 mt-6" graph="circle" />
                </div>
            )}
            {/* <h5 className="font-bold mt-10 ml-4 text-md">Activities</h5>
            <div className="md:flex items-center">
                <div className="w-[310px] md:w-1/3 h-40 mx-1 my-3 min-h-[280px]">
                    <Activities
                        activities={activities}
                        header="Recent Activities"
                        title="Most Recent List Of Customers"
                    />
                </div>
                <div className="w-[310px] md:w-1/3 h-40 mx-1 my-3 min-h-[280px]">
                    <Activities
                        activities={activities}
                        header="Recent Orders"
                        title="Most Recent List Of Ordered goods"
                    />
                </div>
                <div className="w-[310px] md:w-1/3 h-40 mx-1 my-3 min-h-[280px]">
                    <Activities
                        activities={activities}
                        header="Recent Orders"
                        title="Most Recent List Of Ordered goods"
                    />
                </div>
            </div> */}
            <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                <div className="flex items-center justify-between mr-3 w-full">
                    <h5 className="text-md py-2 font-bold text-slat-800 px-2 pt-3">Order Request</h5>
                    <div className="flex items-center ml-16 mt-2">
                        <StatusTab name="Pending" showing={activeTab === 'Pending'} />
                        <StatusTab name="Delivered" showing={activeTab === 'Delivered'} />
                        <StatusTab name="Cancelled" showing={activeTab === 'Cancelled'} />
                    </div>
                </div>
                <div className="w-full md:full shadow-lg">
                    <Table height={400} data={[]} onRowClick={(info) => {}}>
                        <Table.Column width={50} fixed>
                            <Table.HeaderCell>s/n</Table.HeaderCell>
                            <Table.Cell dataKey="id" />
                        </Table.Column>
                        <Table.Column width={200} fixed>
                            <Table.HeaderCell>Picker Name</Table.HeaderCell>
                            <Table.Cell dataKey="name" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Order ID</Table.HeaderCell>
                            <Table.Cell dataKey="event" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.Cell dataKey="action" />
                        </Table.Column>

                        <Table.Column width={100}>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.Cell dataKey="status" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Action</Table.HeaderCell>
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
    );
};

export default Overview;
