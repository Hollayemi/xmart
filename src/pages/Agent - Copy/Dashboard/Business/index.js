import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'rsuite';
import InputGroup from '../../../../components/elements/Input/InputGroup';
import { fetchAllStore } from '../../../../state/slices/admin/fetch';

const Busineses = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    useEffect(() => {
        fetchAllStore(dispatch, setData, adminData, param.showing || '');
    }, []);

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
                    <Table.Column width={120} fixed>
                        <Table.HeaderCell>Store Name</Table.HeaderCell>
                        <Table.Cell dataKey="store" />
                    </Table.Column>
                    <Table.Column width={200}>
                        <Table.HeaderCell>Shop Name</Table.HeaderCell>
                        <Table.Cell dataKey="shopName" />
                    </Table.Column>
                    <Table.Column width={200}>
                        <Table.HeaderCell>Shop Email</Table.HeaderCell>
                        <Table.Cell dataKey="shopEmail" />
                    </Table.Column>
                    <Table.Column width={200}>
                        <Table.HeaderCell>Shop Line</Table.HeaderCell>
                        <Table.Cell dataKey="shopLine" />
                    </Table.Column>
                    <Table.Column width={300}>
                        <Table.HeaderCell>Actions</Table.HeaderCell>

                        <Table.Cell>
                            {(rowData) => {
                                function handleProducts() {
                                    navigate(rowData.store.toLowerCase());
                                }
                                function activities() {
                                    navigate('activities/' + rowData._id);
                                }
                                return (
                                    <span className="flex items-center ">
                                        <button
                                            className="cursor-pointer mx-1 text-white bg-blue-400 hover:bg-blue-500 -mt-2 px-2 py-1 rounded-sm"
                                            onClick={handleProducts}
                                        >
                                            Check Products
                                        </button>
                                        <button
                                            className="cursor-pointer mx-1 text-blue-400 hover:border-blue-400 border bg-blue-50 -mt-2 px-2 py-1 rounded-sm"
                                            onClick={activities}
                                        >
                                            Check Activities
                                        </button>
                                    </span>
                                );
                            }}
                        </Table.Cell>
                    </Table.Column>
                </Table>
            </div>
        </section>
    );
};

export default Busineses;
