import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import UserWrapper from '../wrapper';
import {
    cancelOrder,
    continueOrder,
    FetchOrderHandler,
} from '../../../../state/slices/home/order';
import { Loader, Panel, PanelGroup, Placeholder } from 'rsuite';
import ActionBtn from '../../../../components/elements/Button/actions';
import { FaLink } from 'react-icons/fa';

const MyOrders = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const navigate = useNavigate();
    let auth = userData._id + ' ' + userData.accessToken;
    useEffect(() => {
        FetchOrderHandler(userData._id, auth, dispatch, setOrders);
    }, [userData, dispatch, navigate]);

    const continueThisOrder = (id) => {
        continueOrder(id, auth, dispatch);
    };
    const cancelThisOrder = (id) => {
        cancelOrder(id, auth, dispatch);
    };
    const [status, setStatus] = useState('Pending');
    const StatusBtn = ({ title, onClick }) => (
        <h5
            className={`px-4 py-2 rounded-t-md cursor-pointer ${
                title === status && 'border border-b-0'
            }`}
            onClick={onClick}
        >
            {title}
        </h5>
    );
    let groupedOrder = orders?.filter(
        (each) => each.group[0].order.status === status && each
    );
    console.log(groupedOrder);
    return (
        <UserWrapper>
            <section>
                <h5 className="p-3 font-black">My Orders</h5>
                <div className="flex items-center mb-3">
                    <StatusBtn
                        title="Pending"
                        onClick={() => setStatus('Pending')}
                    />
                    <StatusBtn
                        title="Ongoing"
                        onClick={() => setStatus('Ongoing')}
                    />
                    <StatusBtn
                        title="Waiting"
                        onClick={() => setStatus('Waiting')}
                    />
                    <StatusBtn
                        title="Cancelled"
                        onClick={() => setStatus('Cancelled')}
                    />
                    <StatusBtn
                        title="Delivered"
                        onClick={() => setStatus('Delivered')}
                    />
                </div>
                <div className="mb-7 px-2 w-full md:w-[500px] lg:w-[600px]">
                    {groupedOrder ? (
                        groupedOrder.map((each, index) => (
                            <div
                                key={index}
                                className="border rounded-md p-3 mb-5"
                            >
                                <div className="flex text-md items-center justify-between">
                                    <h5>{each.group[0].order.orderSlug}</h5>
                                    <h5>{each.group[0].order.status}</h5>
                                </div>

                                {each.group[0].order.status === 'Waiting' && (
                                    <div className="my-2">
                                        <div className="mb-1">
                                            <h5 className="font-[500] text-black mb-1">
                                                {
                                                    each.group[0].order.message
                                                        .title
                                                }
                                            </h5>
                                            <h5>
                                                {
                                                    each.group[0].order.message
                                                        .message
                                                }
                                            </h5>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <ActionBtn
                                                func={() =>
                                                    continueThisOrder(
                                                        each.group[0].order._id
                                                    )
                                                }
                                                label="Continue order"
                                                type="success"
                                            />
                                            <ActionBtn
                                                func={() =>
                                                    cancelThisOrder(
                                                        each.group[0].order._id
                                                    )
                                                }
                                                label="Abort order"
                                                type="error"
                                            />
                                        </div>
                                    </div>
                                )}

                                <PanelGroup accordion>
                                    {each.group.map((res, i) => {
                                        return (
                                            <Panel
                                                header={
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <h5 className="mr-4">
                                                                {
                                                                    res.product
                                                                        .prodName
                                                                }
                                                            </h5>
                                                            <Link
                                                                to={`/b/${
                                                                    res.store
                                                                }/${res.product.prodName.replaceAll(
                                                                    ' ',
                                                                    '-'
                                                                )}`}
                                                                className="flex items-center text-xs"
                                                            >
                                                                open <FaLink />
                                                            </Link>
                                                        </div>
                                                        <h5 className="text-sm w-16 min-w-16 flex justify-end">
                                                            {
                                                                res.product
                                                                    .prodPrice
                                                            }
                                                        </h5>
                                                    </div>
                                                }
                                                eventKey={1 + i}
                                                expanded={
                                                    i === 0 ? true : false
                                                }
                                                key={i}
                                                id="panel1"
                                            >
                                                <SingleAbt
                                                    title="Color"
                                                    info={res.storeProducts.color.map(
                                                        (each) => each + ', '
                                                    )}
                                                />
                                                <SingleAbt
                                                    title="Size"
                                                    info={res.storeProducts.size.map(
                                                        (each) => each + ', '
                                                    )}
                                                />
                                                <SingleAbt
                                                    title="Qty"
                                                    info={
                                                        res.storeProducts
                                                            .quantity
                                                    }
                                                />
                                            </Panel>
                                        );
                                    })}
                                </PanelGroup>
                            </div>
                        ))
                    ) : (
                        <div className="w-full md:w-[500px] flex items-center justify-center h-[200px]">
                            <Loader
                                size="md"
                                content="Loading Orders"
                                speed="fast"
                            />
                            <Placeholder.Paragraph />
                        </div>
                    )}
                </div>
            </section>
        </UserWrapper>
    );
};

export default MyOrders;

const SingleAbt = ({ title, info }) => (
    <div className="flex items-start">
        <h5 className="font-[600] w-12 min-w-[60px]">{title} :</h5>
        <h5 className="ml-1">{info}</h5>
    </div>
);
