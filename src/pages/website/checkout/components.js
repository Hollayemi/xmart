import { useState } from 'react';
import { FaAngleDoubleRight, FaHeart, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { SelectPicker } from 'rsuite';
import fakeImg1 from '../../../assets/images/png/_supreme4.png';
import {
    changeQty,
    removeCartHandler,
} from '../../../state/slices/home/cart/function';
import { addNewOrder } from '../../../state/slices/home/order';

export const GroupCart = ({ eachStore, myPickers, userId, auth }) => {
    const [picker, setPicker] = useState(null);
    const dispatch = useDispatch();
    let storeCart = eachStore.group.map((eachCart) => eachCart._id);

    const body = {
        storeCart: storeCart,
        userId: userId,
        picker: picker,
        store: eachStore._id.store,
        size: eachStore.group.length,
    };
    return (
        <section className="mb-6 shadow mt-2">
            <div className="flex justify-between items-center px-3 py-4">
                <h5 className="font-black text-[15px]">
                    {eachStore._id.store}
                </h5>
                <div className="flex items-center">
                    <h5 className="mr-3 font-black">Select Picker:</h5>
                    <div>
                        <SelectPicker
                            label=" "
                            data={myPickers}
                            className="w-full bg-slate-100"
                            size="sm"
                            placeholder="Select Picker"
                            onChange={(e) => setPicker(e)}
                            onClean={() => {}}
                        />
                    </div>
                </div>
            </div>
            {eachStore &&
                eachStore.group.map((item, i) => (
                    <MyCheckoutItem
                        key={i}
                        image={fakeImg1}
                        name={item.result.prodName}
                        F_qty={item.quantity}
                        amount={item.result.prodPrice}
                        company={item.store}
                        id={item._id}
                        userId={item.userId}
                    />
                ))}
            <div className="flex items-center justify-between py-2 px-4 w-full bg-slate-700">
                <h5 className=" font-black text-white text-xl">
                    <FaAngleDoubleRight />
                </h5>
                <div className="flex items-center">
                    <h5 className="mr-5 text-white font-black">
                        Checkout From {eachStore._id.store}{' '}
                    </h5>
                    <button
                        onClick={() => addNewOrder(body, auth, dispatch)}
                        className="w-40 h-8 font-black rounded-md bg-white text-slate-700 hover:bg-white"
                    >
                        Pay Now ({eachStore.storeCheckout})
                    </button>
                </div>
            </div>
        </section>
    );
};

export const MyCheckoutItem = (props) => {
    const { image, name, F_qty, amount, company, id, userId } = props;
    const [qty, setQty] = useState(F_qty);
    const dispatch = useDispatch();
    const changeQuantity = (operator) => {
        let query = {
            cartID: id,
            operator: operator,
            prevQty: qty,
            userId: userId,
        };
        changeQty(query, dispatch);
        operator === '+' ? setQty(qty + 1) : setQty(qty > 1 ? qty - 1 : qty);
    };
    const removeCart = () => {
        const payload = {
            userId: userId,
            cartID: id,
        };
        removeCartHandler(payload, dispatch);
    };
    return (
        <div className="w-full py-6 text-slate-900 flex flex-col lg:flex-row items-center border-b">
            <div className="flex items-center w-full lg:w-3/6 px-2">
                <div className="w-20 h-16 md:w-36 md:h-36 lg:h-28 flex justify-center items-center">
                    <img
                        src={image}
                        className="w-full h-full max-h-fit"
                        alt="my images"
                    />
                </div>
                <div className="ml-3">
                    <h5 className="font-[500] text-lg">{name}</h5>
                    <div>
                        <div className="flex mb-4 md:mb-0 mt-2 px-3 w-40 min-w-fit tracking-wide text-xs items-center bg-slate-200 rounded-sm px-1 shadow-md">
                            <h5>From:</h5>
                            <span className="pl-1 ">{company}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-3/6 flex flex-col md:flex-row md:items-center">
                <div className="w-2/3 flex pl-3 mt-3 md:mt-0 items-center">
                    <div className="w-1/2">
                        <div className=" flex items-center bg-slate-100 tracking-widest w-24 font-bold text-gay-100 text-lg max-w-fit px-2 rounded-md shadow-md border border-ray-400">
                            <h5 className="w-8 min-w-6">{qty}</h5>
                            <div className="flex flex-col items-center ml-2">
                                <h5
                                    onClick={() => changeQuantity('-')}
                                    className="cursor-pointer"
                                >
                                    -
                                </h5>
                                <h5
                                    className="cursor-pointer"
                                    onClick={() => changeQuantity('+')}
                                >
                                    +
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h5 className="font-bold tracking-wildest text-lg">
                            &#x20A6;{qty * amount}
                        </h5>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex items-center justify-center mt-3 md:mt-0 md:flex-col md:items-start">
                    <h5 className="flex items-center ">
                        <FaTrash />
                        <span
                            className="ml-2 cursor-pointer"
                            onClick={removeCart}
                        >
                            Remove
                        </span>
                    </h5>
                    <h5 className="flex items-center ">
                        <FaHeart className="ml-4 md:ml-0" />
                        <span className="ml-2 cursor-pointer">
                            Move to List
                        </span>
                    </h5>
                </div>
            </div>
        </div>
    );
};