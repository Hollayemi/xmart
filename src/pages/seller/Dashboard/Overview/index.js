import React, { useEffect, useState } from 'react';
import {
    FaMemory,
    FaFolderOpen,
    FaFolderPlus,
    FaImages,
    FaTimes,
    FaEye,
    FaCheck,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Placeholder, Table } from 'rsuite';
import DrawerPanel from '../../../../components/elements/DrawerPanel';
import ListOrdersItems from '../../../../components/elements/DrawerPanel/drawerContent/listOrdersItems';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import {
    getMyTools,
    OrderRequestsHandler,
} from '../../../../state/slices/shop/overview';
import { SmallCard } from './components';

const Overview = ({ neededInfo }) => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const { shopData, otpData } = neededInfo;
    const dispatch = useDispatch();
    const [OrderRequest, setOrders] = useState(null);
    const [tools, setTools] = useState('');
    const [activeTab, setActiveTab] = useState('Pending');
    const [viewRequest, setViewRequest] = useState(false);
    const StatusTab = ({ name, showing }) => (
        <h5
            onClick={() => setActiveTab(name)}
            className={`text-xs sm:text-sm py-2 cursor-pointer font-[400] text-slat-800 px-2 sm:px-4 rounded-t-md ${
                showing && 'bg-white text-slate-800'
            }`}
        >
            {name}
        </h5>
    );
    const { innerWidth } = window;
    const filteredRequest = OrderRequest
        ? OrderRequest.filter((order) => order.status === activeTab && order)
        : null;
    useEffect(() => {
        getMyTools(dispatch, shopData.id, userData, setTools);
        OrderRequestsHandler(dispatch, shopData.data.store, otpData, setOrders);
    }, []);
    const ActionBtn = ({ icon, color, func }) => (
        <button
            className={`cursor-pointer flex items-center text-lg p-1 justify-center text-${color}-500 mx-1 w-6 h-6 rounded-full hover:bg-${color}-500 hover:text-white`}
            onClick={func}
        >
            {icon}
        </button>
    );
    return (
        <section className="min-h-[100vh] p-1 md:p-3 w-full min-w-[280px]">
            <div className="m-1 md:m-5 mt-4 md:mt-6 w-full">
                <TopTitle
                    header="store"
                    title={`Welcome Back, ${neededInfo.shopData.data.store.toUpperCase()}`}
                    info="Enjoy full control of your store"
                />
            </div>
            {tools ? (
                <div className="flex items-center flex-wrap mx-2 justify-evenly w-full">
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
                    <Placeholder.Paragraph
                        className="text-slate-50 mt-6"
                        graph="circle"
                    />
                    <Placeholder.Paragraph
                        className="text-slate-50 mt-6"
                        graph="circle"
                    />
                    <Placeholder.Paragraph
                        className="text-slate-50 mt-6"
                        graph="circle"
                    />
                    <Placeholder.Paragraph
                        className="text-slate-50 mt-6"
                        graph="circle"
                    />
                </div>
            )}
            <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                <div className="flex items-center justify-between sm:mr-3 w-full">
                    <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                        Order Request
                    </h5>
                    <div className="flex items-center ml-8 sm:ml-16 mt-2">
                        <StatusTab
                            name="Pending"
                            showing={activeTab === 'Pending'}
                        />
                        <StatusTab
                            name="Delivered"
                            showing={activeTab === 'Delivered'}
                        />
                        <StatusTab
                            name="Cancelled"
                            showing={activeTab === 'Cancelled'}
                        />
                    </div>
                </div>
                <div className="w-full md:full shadow-lg">
                    {filteredRequest ? (
                        <Table height={400} data={filteredRequest}>
                            <Table.Column
                                width={50}
                                fixed={innerWidth < 700 ? null : 'left'}
                            >
                                <Table.HeaderCell>s/n</Table.HeaderCell>
                                <Table.Cell dataKey="_id" />
                            </Table.Column>
                            <Table.Column width={250} resizable>
                                <Table.HeaderCell>
                                    Picker's Name
                                </Table.HeaderCell>
                                <Table.Cell dataKey="picker.name" />
                            </Table.Column>

                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Order ID</Table.HeaderCell>
                                <Table.Cell dataKey="orderSlug" />
                            </Table.Column>
                            <Table.Column width={100} resizable>
                                <Table.HeaderCell>
                                    No of Products
                                </Table.HeaderCell>
                                <Table.Cell dataKey="size" />
                            </Table.Column>
                            <Table.Column width={300} resizable>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.Cell dataKey="createdAt" />
                            </Table.Column>
                            {activeTab !== 'Cancelled' && (
                                <Table.Column
                                    width={innerWidth < 700 ? 100 : 150}
                                    resizable
                                    fixed="right"
                                >
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            function handleView() {
                                                setViewRequest(rowData._id);
                                            }
                                            function activities() {
                                                navigate(
                                                    'activities/' + rowData._id
                                                );
                                            }
                                            return (
                                                <span className="flex items-center ">
                                                    <ActionBtn
                                                        icon={<FaEye />}
                                                        color="slate"
                                                        func={handleView}
                                                    />
                                                    <ActionBtn
                                                        icon={<FaCheck />}
                                                        color="green"
                                                        func={activities}
                                                    />
                                                    <ActionBtn
                                                        icon={<FaTimes />}
                                                        color="red"
                                                        func={activities}
                                                    />
                                                </span>
                                            );
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                            )}
                        </Table>
                    ) : (
                        <Placeholder.Grid className="text-slate-50 mt-6" />
                    )}
                </div>
            </div>
            <DrawerPanel
                placement="left"
                light={true}
                title="View Order Reques"
                size={'xs'}
                children={
                    <ListOrdersItems
                        orderId={viewRequest}
                        otpData={otpData}
                        updateOrders={setOrders}
                    />
                }
                backdrop={true}
                open={viewRequest ? true : false}
                handleClose={() => setViewRequest(false)}
            />
        </section>
    );
};

export default Overview;
