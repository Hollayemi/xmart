import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Table } from 'rsuite';
import { fetchAllStore } from '../../../../../state/slices/admin/fetch';
import DashboardWrapper from '../../../../../components/AdminComponents';
import ActionBtn from '../../../../../components/elements/Button/actions';
import AdminIconDropdown from '../../../../../components/elements/IconDropDown/adminIconDrop';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';

const Stores = () => {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('Verified');
    const [eventFunc, setEventFunc] = useState('');
    const dispatch = useDispatch();
    console.log(eventFunc);
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
    useEffect(() => {
        fetchAllStore(dispatch, setData, adminData, '');
    }, []);
    const filteredStore = data?.filter(
        (each) => each.status === activeTab && each
    );
    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 h-[500px] min-h-screen w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="store"
                        title={`Welcome Back, xMart Admin`}
                        info="Brief review of xMart store"
                    />
                </div>
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Store
                        </h5>
                        <div className="flex items-center ml-8 sm:ml-16 mt-2">
                            <StatusTab
                                name="Verified"
                                showing={activeTab === 'Verified'}
                            />
                            <StatusTab
                                name="Not Verified"
                                showing={activeTab === 'Not Verified'}
                            />
                            <StatusTab
                                name="Deleted"
                                showing={activeTab === 'Deleted'}
                            />
                        </div>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        {filteredStore ? (
                            <Table
                                height={400}
                                data={filteredStore}
                                onRowClick={(info) => {}}
                            >
                                <Table.Column width={50} fixed>
                                    <Table.HeaderCell>s/n</Table.HeaderCell>
                                    <Table.Cell dataKey="id" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>Store</Table.HeaderCell>
                                    <Table.Cell dataKey="store" />
                                </Table.Column>

                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Shop Name
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="shopName" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Shop Email
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="shopEmail" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Shop Line
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="shopLine" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.Cell dataKey="status" />
                                </Table.Column>
                                <Table.Column width={200} resizable>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.Cell dataKey="createdAt" />
                                </Table.Column>
                                <Table.Column
                                    width={130}
                                    fixed="right"
                                    resizable
                                >
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            return (
                                                <DropDownAction
                                                    setEventFunc={setEventFunc}
                                                    id={rowData._id}
                                                    store={rowData.store.toLowerCase()}
                                                    isActive = {rowData.isActive}
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

export default Stores;

const DropDownAction = ({ setEventFunc, id, store, isActive }) => (
    <span className="flex items-center ">
        <i className="absolute top-5 right-7 w-6 h-3 bg-white rounded-full flex items-center justify-center text-xs text-slate-300 cursor-pointer">
            <AdminIconDropdown
                placement="left"
                Icon={<FaEllipsisH />}
                Content={[
                    {
                        value: `activities?id=${id}`,
                        name: <ActionBtn label="Check Activities" />,
                    },
                    {
                        value: `product-list?store=${store}`,
                        name: <ActionBtn label="Check Products" />,
                    },
                    {
                        value: `store-info?store=${store}`,
                        name: <ActionBtn label="Store Details" />,
                    },
                    {
                        value: `/admin/dashboard/activation?id=${id}&name=${store}&account=store`,
                        name: (
                            <ActionBtn
                                label={`${isActive ? 'Deactivate' : 'Activate'} Store`}
                                className="rounded-md"
                                type={`${isActive ? 'error' : 'success'}`}
                            />
                        ),
                    },
                ]}
                onSelect={setEventFunc}
                className="w-20"
            />
        </i>
    </span>
);
