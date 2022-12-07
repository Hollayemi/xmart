import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserWrapper from '../wrapper';
import Image1 from '../../../../assets/images/png/_supreme6.png';
import Image2 from '../../../../assets/images/png/_supreme5.png';
import Image3 from '../../../../assets/images/png/_supreme4.png';
import PlaceholderGrid from 'rsuite/esm/Placeholder/PlaceholderGrid';
import { FetchOrderHandler } from '../../../../state/slices/home/order';
import { ChangeTime } from '../../../seller/Dashboard/Overview/components';

const MyOrders = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData) {
            let auth = userData._id + ' ' + userData.accessToken;
            FetchOrderHandler(userData._id, auth, dispatch, setOrders);
        } else {
            navigate('/signin');
        }
    }, [userData, dispatch, navigate]);

    console.log(orders);

    return (
        <UserWrapper>
            <section>
                <h5 className="p-3 font-black">My Orders</h5>
                <div className="md:flex flex-wrap">
                    <OrderItem
                        image={Image1}
                        prodName="Ardunio Esp32 wireless charging solar for phone"
                    />
                    <OrderItem
                        image={Image2}
                        prodName="Ardunio Esp32 wireless charging solar for phone"
                    />
                    <OrderItem
                        image={Image3}
                        prodName="Ardunio Esp32 wireless charging solar for phone"
                    />
                </div>
            </section>
        </UserWrapper>
    );
};

export default MyOrders;
const StoreOrderContainer = ({ picker, orderId, status, date, store }) => (
    <section>
        <div>
            <SingleAbt title="Order" info={orderId} />
            <SingleAbt
                title="Picker"
                info={`${picker.surname} ${picker.last_name}(${picker.relationship})`}
            />
            <SingleAbt title="Status" info={status} />
            <SingleAbt title="Date" info={ChangeTime({ prevDate: date })} />
            <SingleAbt title="Store" info={store} />
        </div>
        <div className="flex items-center">
            <OrderItem />
        </div>
    </section>
);
const OrderItem = ({ image, prodName }) => (
    <div className="border-b md:mr-8">
        <h5 className="my-3 w-full pl-2 text-[14px] leading-5">{prodName}</h5>
        <div className="mb-7 Lucida px-1 flex items-start">
            <div>
                <img
                    src={image}
                    alt={<PlaceholderGrid />}
                    className="w-32 h-32 p-2 mx-2 bg-slate-200"
                />
            </div>
        </div>
    </div>
);

const SingleAbt = ({ title, info }) => (
    <div className="flex items-center">
        <h5 className="font-[600] w-12 min-w-[60px]">{title} :</h5>
        <h5 className="ml-1">{info}</h5>
    </div>
);
