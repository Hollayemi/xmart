import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'rsuite';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import { getReference } from '../../../../state/slices/shop/settings/payment';

const ReferenceKey = ({ id }) => {
    const [data, setData] = useState([]);
    const disPatch = useDispatch();

    useEffect(() => {
        getReference(disPatch, { shopID: id }, setData);
    }, []);
    console.log(data);

    return (
        <section className="px-2 md:px-5 lg:w-[calc(100%-280px)] h-[90vh] w-full min-w-[80px] overflow-auto">
            <TopTitle
                header="Transactions"
                title="Reference Keys"
                info="Transactions are kept for reference purposes"
            />
            <div className="flex bg-slate-50 rounded-md justify-center mt-6 w-full min-w-[280px]">
                <div className="w-full">
                    <Table height={600} data={data}>
                        <Table.Column width={50} fixed>
                            <Table.HeaderCell>s/n</Table.HeaderCell>
                            <Table.Cell dataKey={1} />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.Cell dataKey="product" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.Cell dataKey="message" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.Cell dataKey="status" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Reference key</Table.HeaderCell>
                            <Table.Cell dataKey="reference" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Transaction</Table.HeaderCell>
                            <Table.Cell dataKey="transaction" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.Cell dataKey="date" />
                        </Table.Column>
                    </Table>
                </div>
            </div>
        </section>
    );
};

export default ReferenceKey;
