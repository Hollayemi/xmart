import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listOrdersItems } from '../../../../state/slices/shop/overview';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../../assets/images/png/_supreme.png';
import img2 from '../../../../assets/images/png/_supreme3.png';
import Loading from '../../Loading';
import { Panel, PanelGroup, Placeholder } from 'rsuite';
import ActionBtn from '../../Button/actions';
import { toProcessing, toWaiting } from '../../../../state/slices/shop/order';

const ListOrdersItems = ({ orderId, otpData, updateOrders }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState({});
    const [data, setData] = useState(null);
    useEffect(() => {
        listOrdersItems(dispatch, orderId, otpData, setData);
    }, []);
    const Reactions = Object.values(message);
    const updateInfo = (type, prodName, index) => {
        type === 'accept' &&
            setMessage({
                ...message,
                [`prod${index}`]: [prodName, 'accepted'],
            });
        type === 'reject' &&
            setMessage({
                ...message,
                [`prod${index}`]: [prodName, 'rejected'],
            });
    };
    const { username, email, store } = data ? data[0] : {};
    const userInfo = { username, email };

    var settings = {
        infinite: true,
        variableWidth: true,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        pauseOnHover: true,
    };
    const Listing = ({ title, value }) => (
        <div className={`w-full flex items-start`}>
            <span className="w-20 font-bold pt-1">{title}</span>
            <h5 className="w-5/6">{value}</h5>
        </div>
    );
    return (
        <section className="px-2">
            {data && data.length > 0 ? (
                data.map((res, index) => {
                    const { product, quantity, storeProducts, color, size } =
                        res;
                    return (
                        <div className="mt-8 shadow-md p-3" key={index}>
                            <h5 className="mb-4 text-md font-bold text-black">
                                {product.prodName}
                            </h5>
                            <div className="mx-2 relative">
                                <Slider {...settings}>
                                    <img
                                        src={img1}
                                        className="w-44 h-48"
                                        alt="Image1"
                                    />
                                    <img
                                        src={img2}
                                        className="w-44 h-48"
                                        alt="Image2"
                                    />
                                    <img
                                        src={img2}
                                        className="w-44 h-48"
                                        alt="Image3"
                                    />
                                    <img
                                        src={img2}
                                        className="w-44 h-48"
                                        alt="Image4"
                                    />
                                </Slider>
                            </div>
                            <div>
                                <div className="w-full my-3 items-center px-0 font-[300]">
                                    <Listing
                                        value={product.prodName}
                                        title="Product"
                                    />
                                    <Listing
                                        value={storeProducts[index].quantity}
                                        title="Qty"
                                    />
                                    <Listing
                                        value={product.prodPrice}
                                        title="Price"
                                    />
                                </div>
                                <PanelGroup accordion bordered>
                                    <Panel
                                        header="Preferred color"
                                        eventKey={1}
                                        id="panel1"
                                    >
                                        {storeProducts[index].color.map(
                                            (each, i) => (
                                                <h5 key={i}>{each}</h5>
                                            )
                                        )}
                                    </Panel>
                                    <Panel
                                        header="Preferred size"
                                        eventKey={2}
                                        id="panel2"
                                    >
                                        {storeProducts[index].size.map(
                                            (each, i) => (
                                                <h5 key={i}>{each}</h5>
                                            )
                                        )}
                                    </Panel>
                                    <Panel
                                        header="Preferred size"
                                        eventKey={3}
                                        id="panel3"
                                    >
                                        <Placeholder.Paragraph />
                                    </Panel>
                                </PanelGroup>
                            </div>
                            <div className="flex items-center justify-center my-3">
                                <ActionBtn
                                    className={
                                        message?.[`prod${index}`]?.[1] ===
                                            'accepted' && 'bg-green-300'
                                    }
                                    label="Accept Order"
                                    func={() =>
                                        updateInfo(
                                            'accept',
                                            product.prodName,
                                            index
                                        )
                                    }
                                    type="success"
                                />
                                <ActionBtn
                                    className={
                                        message?.[`prod${index}`]?.[1] ===
                                            'rejected' && 'bg-red-300'
                                    }
                                    label="Reject Order"
                                    func={() =>
                                        updateInfo(
                                            'reject',
                                            product.prodName,
                                            index
                                        )
                                    }
                                    type="error"
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loading size="md" />
                </div>
            )}
            <br />
            <br />
            <div className="px-3 py-4 sticky bottom-0 bg-white flex justify-center">
                {data?.length === Reactions.length ? (
                    !Reactions.flat(Infinity).includes('rejected') ? (
                        <ActionBtn
                            label="Finish"
                            func={() => {
                                toProcessing(
                                    dispatch,
                                    orderId,
                                    store,
                                    otpData,
                                    updateOrders
                                );
                            }}
                            type="success"
                        />
                    ) : (
                        <ActionBtn
                            label="Finish"
                            func={() => {
                                toWaiting(
                                    dispatch,
                                    orderId,
                                    Reactions,
                                    otpData,
                                    userInfo,
                                    store,
                                    updateOrders
                                );
                            }}
                            type="success"
                        />
                    )
                ) : (
                    <h5>
                        React to all order products to continue ({' '}
                        {Reactions.length + ' of ' + data?.length} )
                    </h5>
                )}
            </div>
        </section>
    );
};

export default ListOrdersItems;
