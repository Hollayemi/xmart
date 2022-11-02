import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Progress, Table, Toggle } from 'rsuite';
import { FaAd, FaCoins, FaGift, FaWallet } from 'react-icons/fa';
import { hideAmount } from './func';
import { withdraw } from '../../../../state/slices/agents/dispatches';

const Overview = () => {
    const [amount1, setamt1] = useState(1000);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const { message } = useSelector((state) => state.reducer.agentReducer.data);
    const info = data ? data : message;
    const dispatch = useDispatch();

    return (
        <section className="pt-5 md:pt-8 overflow-x-auto">
            <div className="flex flex-col md:flex-row min-w-[310px] items-center justify-evenly px-2 md:px-6">
                <div className="w-full mx-3 md:w-2/5 min-w-280px h-44 rounded shadow-lg bg-slate-700">
                    <div className="w-full h-16 bg-slate-800 border-b border-slate-400 flex items-center px-2 justify-between">
                        <h3 className="text-slate-300 font-bold">
                            Registering Account
                        </h3>
                        <Toggle
                            size="md"
                            checkedChildren="Reveal Balance"
                            defaultChecked={false}
                            unCheckedChildren="Hide Balance"
                            onChange={(e) => hideAmount(e, '100000', setamt1)}
                        />
                    </div>
                    <div className="flex items-center justify-between px-6 h-28 ">
                        <h5 className="flex items-center text-gray-50 text-lg font-black">
                            <i className="w-8 h-8 rounded-full mx-1 text-blue-400 flex bg-slate-600 items-center justify-center">
                                <FaWallet />
                            </i>
                            <p>&#8358; {info.amount}</p>
                        </h5>
                        <div className="relative" style={{ width: 80 }}>
                            <div className="w-full bg-tansparent h-[80px] text-white text-[50px] absolute rounded-full flex items-center justify-center">
                                <FaGift />
                            </div>
                            <Progress.Circle
                                percent={30}
                                strokeColor="slate"
                                showInfo={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full mx-3 mt-4 md:mt-0 md:w-2/5  min-w-280px h-44 rounded shadow-lg bg-slate-700">
                    <div className="w-full h-16 bg-slate-800 border-b border-slate-400 flex items-center px-2 justify-between">
                        <h3 className="text-slate-300 font-bold">
                            Pick-up Agent{' '}
                            <Badge color="violet" content="Coming Soon" />
                        </h3>
                        <Toggle
                            size="md"
                            disabled
                            checkedChildren="Reveal Balance"
                            defaultChecked={false}
                            unCheckedChildren="Hide Balance"
                            onChange={(e) => hideAmount(e, '40000', () => {})}
                        />
                    </div>
                    <div className="flex items-center justify-between px-6 h-28 ">
                        <h5 className="flex items-center text-gray-50 text-lg font-black">
                            <i className="w-8 h-8 rounded-full mx-1 text-blue-400 flex bg-slate-600 items-center justify-center">
                                <FaWallet />
                            </i>
                            <p>&#8358; {info.amount}</p>
                        </h5>
                        <div className="relative" style={{ width: 80 }}>
                            <div className="w-full bg-tansparent h-[80px] text-white text-[50px] absolute rounded-full flex items-center justify-center">
                                <FaGift />
                            </div>
                            <Progress.Circle
                                percent={50}
                                strokeColor="slate"
                                showInfo={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-100 min-w-[270px] mt-5 p-1 md:p-6 shadow-lg rounded-lg">
                <div className="flex items-center py-10 justify-center">
                    <button
                        disabled={info.withdraw}
                        onClick={() =>
                            withdraw(dispatch, info._id, setData, navigate)
                        }
                        className={`py-2 mx-1 md:mx-3 w-40 md:w-48 px-4 border-2 rounded-md focus:outline-none ${
                            info.withdraw
                                ? 'bg-slate-400 border-slate-400'
                                : 'bg-slate-700 border-slate-700'
                        } text-white`}
                    >
                        {info.withdraw ? 'Processing...' : 'Withdraw'}
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem('agentName', info.username);
                            navigate('/signup');
                        }}
                        className="py-2 mx-1 px-2 md:px-4 md:mx-3 w-56 md:w-48 border-2 rounded-md focus:outline-none border-slate-700 text-slate-700 bg-transparent hover:bg-slate-200"
                    >
                        Register New Business
                    </button>
                </div>
                <div className="flex items-center py-2 justify-center">
                    <div className="flex flex-col mx-4 items-center">
                        <Badge content={5000} color="blue">
                            <button className="w-10 py-2 px-4 border-2 rounded-md focus:outline-none border-slate-700 bg-slate-700 text-white">
                                <FaCoins />
                            </button>
                        </Badge>
                        <h5>coins</h5>
                    </div>
                    <div className="flex flex-col mx-4 items-center">
                        <Badge content="!" color="orange">
                            <button className="w-10 py-2 px-4 border-2 rounded-md focus:outline-none border-slate-700 text-slate-700 bg-transparent">
                                <FaAd />
                            </button>
                        </Badge>
                        <h5>Coupon</h5>
                    </div>
                </div>
            </div>
            <div className="w-full mt-5">
                <h5 className="w-full leading-10 text-center bg-white font-[500]">
                    Transaction Record
                </h5>
                <Table height={420} data={[]}>
                    <Table.Column width={50} align="center" resizable>
                        <Table.HeaderCell>s/n</Table.HeaderCell>
                        <Table.Cell dataKey="item" />
                    </Table.Column>

                    <Table.Column width={200} resizable>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell dataKey="category" />
                    </Table.Column>

                    <Table.Column width={150} resizable>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.Cell dataKey="Time" />
                    </Table.Column>

                    <Table.Column width={150} resizable>
                        <Table.HeaderCell>status</Table.HeaderCell>
                        <Table.Cell dataKey="Buyer" />
                    </Table.Column>

                    <Table.Column width={200} resizable>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.Cell dataKey="Picker" />
                    </Table.Column>

                    <Table.Column width={200} resizable>
                        <Table.HeaderCell>Seller location</Table.HeaderCell>
                        <Table.Cell dataKey="sellerLocation" />
                    </Table.Column>
                </Table>
            </div>
        </section>
    );
};

export default Overview;
