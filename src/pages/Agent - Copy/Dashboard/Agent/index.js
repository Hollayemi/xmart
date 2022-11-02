import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'rsuite';
import InputGroup from '../../../../components/elements/Input/InputGroup';
import ModalPanel from '../../../../components/elements/ModalPanel';
import {
    fetchAllAgent,
    updateAgent,
} from '../../../../state/slices/admin/agents/adminActions';

const Agent = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    useEffect(() => {
        fetchAllAgent(dispatch, setData, adminData, '');
    }, []);

    const [paid, setPaid] = useState(false);

    return (
        <section className="flex flex-col items-center min-h-[80vh] p-4">
            <div className="flex items-center">
                <div className="w-[220px] md:w-[350px]">
                    <InputGroup
                        size="sm"
                        label=" "
                        placeholder="search by shop name"
                    />
                </div>
                <button className=" w-20 md:w-32 my-1.5 h-9 rounded-md bg-blue-600 text-white mx-1 md:mx-3">
                    Search
                </button>
            </div>
            <div className="w-full md:w-11/12 shadow-lg">
                <Table
                    height={400}
                    data={data}
                    // onRowClick={(info) => {
                    //     navigate(info.store);
                    // }}
                >
                    <Table.Column width={150} fixed>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.Cell dataKey="username" />
                    </Table.Column>
                    <Table.Column width={200}>
                        <Table.HeaderCell>Accout Name</Table.HeaderCell>
                        <Table.Cell dataKey="account_name" />
                    </Table.Column>
                    <Table.Column width={180}>
                        <Table.HeaderCell>Account Number</Table.HeaderCell>
                        <Table.Cell dataKey="account_number" />
                    </Table.Column>
                    <Table.Column width={130}>
                        <Table.HeaderCell>Bank</Table.HeaderCell>
                        <Table.Cell dataKey="bank_name" />
                    </Table.Column>
                    <Table.Column width={130}>
                        <Table.HeaderCell>withdraw</Table.HeaderCell>
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
                    <Table.Column width={130}>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.Cell dataKey="amount" />
                    </Table.Column>
                    <Table.Column width={300}>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.Cell>
                            {(rowData) => {
                                return (
                                    <span className="flex items-center ">
                                        <button
                                            className="cursor-pointer mx-1 text-white bg-blue-400 hover:bg-blue-500 -mt-2 px-2 py-1 rounded-sm"
                                            onClick={() => setPaid(rowData)}
                                            disabled={!rowData.withdraw}
                                        >
                                            Activate Payment
                                        </button>
                                        <button
                                            className="cursor-pointer mx-1 text-blue-400 hover:border-blue-400 border bg-blue-50 -mt-2 px-2 py-1 rounded-sm"
                                            onClick={() => {}}
                                        >
                                            Decline Request
                                        </button>
                                    </span>
                                );
                            }}
                        </Table.Cell>
                    </Table.Column>
                </Table>
            </div>
            <ModalPanel
                closeButton={true}
                title="Confirm agent to pay"
                children={<ConfirmAgentPayment setData={setData} data={paid} />}
                hasBackdrop={true}
                keyboard={true}
                open={paid && true}
                buttonName="Varify Code"
                handleClose={() => setPaid(false)}
            />
        </section>
    );
};

export default Agent;

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
