import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Table } from 'rsuite';
import DashboardWrapper from '../../../../components/AdminComponents';
import { getActivities } from '../../../../state/slices/shop/overview';

const Activities = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({ message: [] });
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    useEffect(() => {
        getActivities(dispatch, param.id, adminData, setData);
    }, []);

    return (
        <DashboardWrapper>
            <div className="flex justify-center pt-5">
                <div className="w-full md:w-11/12 shadow-lg">
                    <Table
                        height={700}
                        data={data.message}
                        onRowClick={(info) => {}}
                    >
                        <Table.Column width={50} fixed>
                            <Table.HeaderCell>s/n</Table.HeaderCell>
                            <Table.Cell dataKey="id" />
                        </Table.Column>
                        <Table.Column width={100} fixed>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.Cell dataKey="name" />
                        </Table.Column>

                        <Table.Column width={100}>
                            <Table.HeaderCell>Event</Table.HeaderCell>
                            <Table.Cell dataKey="event" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.Cell dataKey="action" />
                        </Table.Column>

                        <Table.Column width={100}>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.Cell dataKey="status" />
                        </Table.Column>
                        <Table.Column width={300}>
                            <Table.HeaderCell>Info</Table.HeaderCell>
                            <Table.Cell dataKey="info" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.Cell dataKey="createdAt" />
                        </Table.Column>
                    </Table>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default Activities;
