import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Table } from 'rsuite';
import DashboardWrapper from '../../../../components/AdminComponents';
import ActionBtn from '../../../../components/elements/Button/actions';
import IconDropdown from '../../../../components/elements/IconDropDown';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import { AllOrdersItems } from '../../../../state/slices/admin/order';

const AllOrder = () => {
    const [AllOrders, setOrders] = useState(null);
    const [activeTab, setActiveTab] = useState('Pending');
    const [eventFunc, setEventFunc] = useState('');
    const dispatch = useDispatch();

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

    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const filteredRequest = AllOrders?.filter(
        (order) => order.status === activeTab && order
    );
    useEffect(() => {
        AllOrdersItems(dispatch, adminData, setOrders);
    }, []);

    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 h-[500px] min-h-screen w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="Dashboard"
                        title={`Welcome Back, xMart Admin`}
                        info="We showcase products and locate store"
                    />
                </div>
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Order Request ( {filteredRequest?.length} of{' '}
                            {AllOrders?.length} )
                        </h5>
                        <div className="flex items-center ml-8 sm:ml-16 mt-2">
                            <StatusTab
                                name="Pending"
                                showing={activeTab === 'Pending'}
                            />
                            <StatusTab
                                name="Ongoing"
                                showing={activeTab === 'Ongoing'}
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
                            <Table
                                height={400}
                                data={filteredRequest}
                                onRowClick={(info) => {}}
                            >
                                <Table.Column width={50} fixed>
                                    <Table.HeaderCell>s/n</Table.HeaderCell>
                                    <Table.Cell dataKey="id" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.Cell dataKey="orderSlug" />
                                </Table.Column>

                                <Table.Column width={50}>
                                    <Table.HeaderCell>
                                        No of products
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="size" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>Message</Table.HeaderCell>
                                    <Table.Cell dataKey="message.message" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.Cell dataKey="status" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>
                                        Total Amount
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="totalAmount" />
                                </Table.Column>
                                <Table.Column width={200} resizable>
                                    <Table.HeaderCell>Picker</Table.HeaderCell>
                                    <Table.Cell dataKey="picker.name" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        discount
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="discount" />
                                </Table.Column>
                                <Table.Column width={200} resizable>
                                    <Table.HeaderCell>
                                        Delivery Fee
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="deliveryFee" />
                                </Table.Column>
                                <Table.Column width={200} resizable>
                                    <Table.HeaderCell>Voucher</Table.HeaderCell>
                                    <Table.Cell dataKey="voucher" />
                                </Table.Column>
                                <Table.Column width={200} resizable>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.Cell dataKey="createdAt" />
                                </Table.Column>
                                <Table.Column
                                    width={50}
                                    fixed="right"
                                    resizable
                                >
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            return (
                                                <DropDownAction
                                                    setEventFunc={setEventFunc}
                                                />
                                            );
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        ) : (
                            <div>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </DashboardWrapper>
    );
};

export default AllOrder;

const DropDownAction = ({ setEventFunc }) => (
    <span className="flex items-center ">
        <i className="absolute top-5 right-7 w-6 h-3 bg-white rounded-full flex items-center justify-center text-xs text-slate-300 cursor-pointer">
            <IconDropdown
                placement="left"
                Icon={<FaEllipsisH />}
                Content={[
                    {
                        value: 'name' + '-delete-' + 'id' + '-product',
                        name: 'View',
                    },
                    {
                        value: 'name' + '-view-' + 'id' + '-product',
                        name: (
                            <ActionBtn
                                className="rounded-md shadow"
                                label="Delete"
                                type="error"
                            />
                        ),
                    },
                ]}
                onSelect={setEventFunc}
                className="w-40"
            />
        </i>
    </span>
);
