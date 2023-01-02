import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Table } from 'rsuite';
import DashboardWrapper from '../../../../../components/AdminComponents';
import ActionBtn from '../../../../../components/elements/Button/actions';
import IconDropdown from '../../../../../components/elements/IconDropDown';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';
import { getAccounts } from '../../../../../state/slices/admin/users';

const Stores = () => {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState(false);
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
    useEffect(() => {
        getAccounts(dispatch, adminData, setData);
    }, []);
    console.log(data);
    const filteredUser = data?.filter(
        (each) => each.isSeller === activeTab && each
    );
    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 h-[500px] min-h-screen w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="users"
                        title={`Our Verified Users`}
                        info="Brief review on our users"
                    />
                </div>
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Users
                        </h5>
                        <div className="flex items-center ml-8 sm:ml-16 mt-2">
                            <StatusTab name="With Store" showing={activeTab} />
                            <StatusTab name="No Store" showing={!activeTab} />
                        </div>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        {filteredUser ? (
                            <Table
                                height={400}
                                data={filteredUser}
                                onRowClick={(info) => {}}
                            >
                                <Table.Column width={50} fixed>
                                    <Table.HeaderCell>s/n</Table.HeaderCell>
                                    <Table.Cell dataKey="id" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>
                                        Fullname
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="fullname" />
                                </Table.Column>

                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Username
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="username" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.Cell dataKey="email" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Phone Number
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="phoneNumber" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Why Here
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="why_here" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Language
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="comm.language" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Contact Medium
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="comm.prefMedium" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Facebook
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="comm.facebook" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Whatsapp
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="comm.whatsapp" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>
                                        Has shop
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="isSellear" />
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
                            <div className="flex items-center justify-center h-16 mb-2">
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

const DropDownAction = ({ setEventFunc }) => (
    <span className="flex items-center ">
        <i className="absolute top-5 right-7 w-6 h-3 bg-white rounded-full flex items-center justify-center text-xs text-slate-300 cursor-pointer">
            <IconDropdown
                placement="left"
                Icon={<FaEllipsisH />}
                Content={[
                    {
                        value: 'name' + '-delete-' + 'id' + '-product',
                        name: (
                            <ActionBtn
                                className="rounded-md shadow"
                                label="Check Activities"
                                type="error"
                            />
                        ),
                    },
                    {
                        value: 'name' + '-view-' + 'id' + '-product',
                        name: (
                            <ActionBtn
                                className="rounded-md shadow"
                                label="Check Products"
                                type="error"
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
