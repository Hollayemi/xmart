import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import fakeImg1 from '../../../assets/images/png/_supreme4.png';
import SearchWrapper from '../../../components/websiteCompoents/ReuseableFlex';
import { FetchCartHandler } from '../../../state/slices/home/cart/fetchCart';
import { MyCheckoutItem } from '../checkout/components';

const Cart = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        userData
            ? FetchCartHandler(userData._id, dispatch, () => {})
            : navigate('/signin');
    }, [userData, dispatch, navigate]);
    const { cartData, status } = useSelector(
        (state) => state.reducer.cartedProduct
    );
    const prodState = status === 'FULFILLED' ? cartData[0] : [];
    return (
        <SearchWrapper>
            <section>
                <div className="pt-12 flex justify-center my-5">
                    <h5 className="text-2xl font-[800]">Shopping Cart</h5>
                </div>
                <div className="mt-4 p-4 mb-4 md:flex">
                    <div className="w-full md:w-4/6 bg-slate-100 rounded-sm shadow-md">
                        <h5 className="w-full border-b border-slate-300 h-10 px-4 font-[800] text-lg leading-10">
                            Cart
                        </h5>
                        {prodState.map(
                            (res, i) =>
                                res.result && (
                                    <MyCheckoutItem
                                        image={fakeImg1}
                                        key={`${i}sdsd5746`}
                                        name={res.result.prodName}
                                        F_qty={res.quantity}
                                        amount={res.result.prodPrice}
                                        status={res.result.status}
                                        company={res.store}
                                        id={res._id}
                                        userId={res.userId}
                                    />
                                )
                        )}
                    </div>
                    <div className="w-full md:w-2/6 mt-6 md:mt-0 md:pl-5">
                        <div className="w-full rounded-t-md bg-slate-50 shadow-md">
                            <h4 className="w-full flex justify-btween items-center px-4 text-md font-bold h-10 leading-10 border-b">
                                Cart Summary
                                <span className="px-2 ml-5 h-6 leading-6 rounded shadow bg-slate-100">
                                    ({prodState && prodState.length}) items
                                </span>
                            </h4>
                            <div>
                                <h5 className="flex my-2 items-center justify-between px-5 h-10 border-b border-dotted">
                                    Subtotal{' '}
                                    <span className="font-bold">
                                        &#x20A6;5000
                                    </span>
                                </h5>
                                <h5 className="flex my-2 items-center justify-between px-5 h-10 border-b-2 border-slate-800 border-dotted">
                                    Shipping amount{' '}
                                    <span className="font-bold">
                                        &#x20A6;500
                                    </span>
                                </h5>
                                <div className="p-2 mt-9">
                                    <Link to="/checkout">
                                        <button className="bg-green-700 text-white w-full h-10 rounded-md shadow ">
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SearchWrapper>
    );
};

export default Cart;

// const CartItem = (props) => {
//     const { image, name, F_qty, amount, company, id, userId } = props;
//     const [qty, setQty] = useState(F_qty);
//     const dispatch = useDispatch();
//     const changeQuantity = (operator) => {
//         let query = {
//             cartID: id,
//             operator: operator,
//             prevQty: qty,
//             userId: userId,
//         };
//         changeQty(query, dispatch);
//         operator === '+' ? setQty(qty + 1) : setQty(qty > 1 ? qty - 1 : qty);
//     };
//     return (
//         <div className="w-full px-3 py-6 text-slate-900 flex flex-col items-center border-b">
//             <div className="flex justify-between flex-col md:flex-row md:items-center w-full relative">
//                 <div className="flex items-center w-full lg:w-3/6 px-2">
//                     <div className="border border-slate-900 h-4 w-4 cursor-pointer rounded-full absolute top-0 right-2">
//                         <FaCheckCircle className="text-slate-900" />
//                     </div>
//                     <div className="w-28 min-w-32 min-h-32 h-24 md:w-44 md:h-40 lg:h-36 flex justify-center items-center">
//                         <img
//                             src={image}
//                             className="w-full h-full max-h-fit"
//                             alt="my images"
//                         />
//                     </div>
//                     <div className="ml-5">
//                         <h5 className="font-[600] text-xl">{name}</h5>
//                         <div>
//                             <div className="flex mb-4 md:mb-0 mt-2 px-3 max-w-fit tracking-wide text-xs justify-center items-center bg-slate-200 rounded-sm px-1 shadow-md font-[500]">
//                                 <h5>sold by:</h5>
//                                 <span className="pl-1 ">{company}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <h5 className="font-[500] flex items-center mt-5 md:mt-0 tracking-wildest text-lg">
//                     <span className="md:hidden mr-4 ml-3 font-[500]">
//                         Item price:
//                     </span>
//                     &#x20A6;
//                     {qty * amount}
//                 </h5>
//             </div>
//             <div className="w-full flex md:items-center">
//                 <div className="w-full flex justify-between pl-3 mt-3 md:mt-0 items-center">
//                     <h5 className="flex items-center absolute bottom-4 ">
//                         <FaTrash />
//                         <span className="ml-2 cursor-pointer">Remove</span>
//                     </h5>
//                     <div className=" flex items-center bg-slate-100 tracking-widest w-24 font-bold text-gay-100 text-lg max-w-fit px-2 rounded-md shadow-md border border-ray-400">
//                         <h5 className="w-8 min-w-6">{qty}</h5>
//                         <div className="flex flex-col items-center ml-2">
//                             <h5
//                                 onClick={() => changeQuantity('-')}
//                                 className="cursor-pointer"
//                             >
//                                 -
//                             </h5>
//                             <h5
//                                 className="cursor-pointer"
//                                 onClick={() => changeQuantity('+')}
//                             >
//                                 +
//                             </h5>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
