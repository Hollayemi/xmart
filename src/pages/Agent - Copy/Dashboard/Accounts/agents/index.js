import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Table } from 'rsuite';
import DashboardWrapper from '../../../../../components/AdminComponents';
import ActionBtn from '../../../../../components/elements/Button/actions';
import AdminIconDropdown from '../../../../../components/elements/IconDropDown/adminIconDrop';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';
import { fetchAllAgent } from '../../../../../state/slices/admin/agents/adminActions';

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
        fetchAllAgent(dispatch, setData, adminData, '');
    }, []);

    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 h-[500px] min-h-screen w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="agents"
                        title={`Agents`}
                        info="Brief review on our agents"
                    />
                </div>
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Agents
                        </h5>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        {data ? (
                            <Table
                                height={400}
                                data={data}
                                onRowClick={(info) => {}}
                            >
                                <Table.Column width={50} fixed>
                                    <Table.HeaderCell>s/n</Table.HeaderCell>
                                    <Table.Cell dataKey="_id" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>
                                        Username
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="username" />
                                </Table.Column>

                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>email</Table.HeaderCell>
                                    <Table.Cell dataKey="email" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>
                                        Withdraw
                                    </Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            return rowData.withdraw ? (
                                                <div className="text-green-500 font-bold flex items-center">
                                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                                                    Ready
                                                </div>
                                            ) : (
                                                <div className="text-red-500 font-bold flex items-center">
                                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                                                    Not yet
                                                </div>
                                            );
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.Cell dataKey="amount" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>Bank</Table.HeaderCell>
                                    <Table.Cell dataKey="bank_name" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Account Number
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="account_number" />
                                </Table.Column>
                                <Table.Column width={150} resizable>
                                    <Table.HeaderCell>
                                        Account Name
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="account_name" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>Gift</Table.HeaderCell>
                                    <Table.Cell dataKey="gift" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>Coin</Table.HeaderCell>
                                    <Table.Cell dataKey="coin" />
                                </Table.Column>
                                <Table.Column width={100} resizable>
                                    <Table.HeaderCell>TTP</Table.HeaderCell>
                                    <Table.Cell dataKey="ttp" />
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
                                                    id={rowData._id}
                                                    isActive={rowData.isActive}
                                                    name={rowData.username}
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

const DropDownAction = ({ setEventFunc, id, name, isActive }) => (
    <span className="flex items-center ">
        <i className="absolute top-5 right-7 w-6 h-3 bg-white rounded-full flex items-center justify-center text-xs text-slate-300 cursor-pointer">
            <AdminIconDropdown
                placement="left"
                Icon={<FaEllipsisH />}
                Content={[
                    {
                        value: `/admin/dashboard/confirmation?id=${id}&name=${name}&account=agent`,
                        name: <ActionBtn label="React to payment" />,
                    },
                    {
                        value: `/admin/dashboard/activation?id=${id}&name=${name}&account=agent`,
                        name: (
                            <ActionBtn
                                className="rounded-md shadow"
                                label="Deactivate Account"
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

const ConfirmAgentPayment = ({ data, setData }) => {
    console.log(data);
    const dispatch = useDispatch();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const setContinue = (e) => {
        let set = { ttp: e, withdraw: false, amount: 0 };
        updateAgent(dispatch, setData, adminData, set, data._id);
        setData(false);
    };
    return (
        <section>
            <div>
                You are about to set {data.username}'s Amount to 0, Beliving{' '}
                {data.username}'s payment has been made.{' '}
            </div>
            <div className="flex justify-end mt-5">
                <button
                    onClick={() => setContinue(0)}
                    className="bg-green-600 hover:bg-green-700 p-1 px-2 rounded text-white"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};
