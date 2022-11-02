import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserWrapper from '../wrapper';
// import Image1 from '../../../../assets/images/png/_supreme6.png';
import Image2 from '../../../../assets/images/png/_supreme5.png';
// import Image3 from '../../../../assets/images/png/_supreme4.png';
import PlaceholderGrid from 'rsuite/esm/Placeholder/PlaceholderGrid';
import { FetchOrderHandler } from '../../../../state/slices/home/order';
// import { ChangeTime } from '../../../seller/Dashboard/Overview/components';

const MyOrders = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const [expand, setExpand] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData) {
            let auth = userData._id + ' ' + userData.accessToken;
            FetchOrderHandler(userData._id, auth, dispatch, setOrders);
        } else {
            navigate('/signin');
        }
    }, [userData, dispatch, navigate]);

    return (
        <UserWrapper type="settings">
            <section className="w-full px-2">
                <h5 className="p-3 font-black">My Orders</h5>
                {orders &&
                    orders.map((order, i) => (
                        <StoreOrderContainer
                            key={i}
                            num={i}
                            picker={order.pickerInfo}
                            date=""
                            products={order.group}
                            store={order._id.store}
                            setExpand={setExpand}
                            expand={expand}
                        />
                    ))}
            </section>
        </UserWrapper>
    );
};

export default MyOrders;
const StoreOrderContainer = ({
    picker,
    products,
    status,
    store,
    setExpand,
    expand,
    num,
}) => (
    <section className="w-full shadow relative mb-5 px-2 py-3">
        <div className="flex flex-wrap items-centermb-7">
            <SingleAbt
                br={true}
                title="Picker"
                info={`${picker.surname} ${picker.last_name} (${picker.relationship})`}
            />
            <SingleAbt br={true} title="Status" info={status} />
            <SingleAbt br={true} title="Store" info={store} />
            <h5
                onClick={() => setExpand(expand !== num ? num : -1)}
                className="text-blue-500 absolute right-2 top-16 md:top-12 cursor-pointer"
            >
                {expand === num ? 'Hide' : 'Show'} Details
            </h5>
        </div>
        <div
            className={`w-full mt-10 flex flex-wrap ${
                expand !== num && 'h-0 overflow-hidden transitions-all'
            } `}
        >
            {products.map((product, i) => (
                <OrderItem
                    key={i}
                    qty={product.cartProduct.quantity}
                    prodName={product.cartProduct.product.prodName}
                    orderId={product.orderId + '-' + i}
                />
            ))}
        </div>
    </section>
);
const OrderItem = ({ image, prodName, qty, orderId }) => (
    <div className="md:mr-8">
        <h5 className="my-3 w-full pl-2 text-[14px] leading-5">{prodName}</h5>
        <div className="mb-7 Lucida px-1 flex items-start">
            <div>
                <img
                    src={Image2}
                    alt={<PlaceholderGrid />}
                    className="w-32 h-32 p-2 mx-2 bg-slate-200"
                />
            </div>
            <div>
                <SingleAbt title="Order" info={orderId} />
                <SingleAbt title="Qty" info={qty} />
            </div>
        </div>
    </div>
);

const SingleAbt = ({ title, info, br }) => (
    <div className={`flex items-center pr-3 mr-2 ${br && 'border-r'} `}>
        <h5 className="font-[600] w-12 min-w-[60px]">{title} :</h5>
        <h5 className="ml-1">{info}</h5>
    </div>
);
