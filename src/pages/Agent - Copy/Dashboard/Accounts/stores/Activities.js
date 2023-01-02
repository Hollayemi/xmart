import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'rsuite';
import DashboardWrapper from '../../../../../components/AdminComponents';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';
import { getActivities } from '../../../../../state/slices/shop/overview';

const Activities = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ message: [] });
    const useQuery = new URLSearchParams(window.location.search);
    const shopId = useQuery.get('id');
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    useEffect(() => {
        getActivities(dispatch, shopId, adminData, setData);
    }, []);
    console.log(data);
    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="Activities"
                        title={`Welcome Back, xMart Admin`}
                        info="Brief review of xMart store"
                    />
                </div>
                <div className="flex flex-col justify-center mt-10 w-full bg-slate-50">
                    <div className="flex items-center justify-between sm:mr-3 w-full">
                        <h5 className="text-xs sm:text-md py-2 font-bold text-slat-800 sm:px-2 pt-3">
                            Activities
                        </h5>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        <Table
                            height={700}
                            data={data.message}
                            onRowClick={(info) => {}}
                        >
                            <Table.Column width={50} fixed>
                                <Table.HeaderCell>s/n</Table.HeaderCell>
                                <Table.Cell dataKey="id" />
                            </Table.Column>
                            <Table.Column width={100}>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.Cell dataKey="name" />
                            </Table.Column>

                            <Table.Column width={100} resizable>
                                <Table.HeaderCell>Event</Table.HeaderCell>
                                <Table.Cell dataKey="event" />
                            </Table.Column>

                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.Cell dataKey="action" />
                            </Table.Column>

                            <Table.Column width={100} resizable>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.Cell dataKey="status" />
                            </Table.Column>
                            <Table.Column width={300} resizable>
                                <Table.HeaderCell>Info</Table.HeaderCell>
                                <Table.Cell dataKey="info" />
                            </Table.Column>
                            <Table.Column width={200} resizable>
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

export default Activities;
